using Akka.Actor;
using Akka.Event;

namespace sample3.Actors;

public class PingActor : ReceiveActor
{
    private readonly ILoggingAdapter _logger = Context.GetLogger();
    private IActorRef? _requester;
    private IActorRef? _collector;
    private int _maxRounds;

    public PingActor(IActorRef collector)
    {
        _collector = collector;

        Receive<StartPingPong>(msg =>
        {
            _requester = Sender;
            _maxRounds = Math.Min(msg.Rounds, 100); // 상한 100라운드
            _logger.Info("PingPong started! Rounds: {0}", _maxRounds);

            _collector?.Tell(new ActorEvent("API", "PingActor", "StartPingPong", 0, DateTime.UtcNow));

            var pongActor = Context.ActorOf(Props.Create(() => new PongActor(_collector!)), "pong");
            pongActor.Tell(new Ping(1));
            _collector?.Tell(new ActorEvent("PingActor", "PongActor", "Ping(1)", 1, DateTime.UtcNow));
        });

        Receive<Pong>(msg =>
        {
            _logger.Info("Ping received Pong({0})", msg.Count);
            _collector?.Tell(new ActorEvent("PongActor", "PingActor", $"Pong({msg.Count})", msg.Count, DateTime.UtcNow));

            if (msg.Count >= _maxRounds)
            {
                _collector?.Tell(new ActorEvent("PingActor", "API", "PingPongResult", msg.Count, DateTime.UtcNow));

                // PipeTo 패턴: 비동기 Ask 결과를 Self에게 전달 (데드락 방지)
                _collector!.Ask<EventList>(new GetEvents(), TimeSpan.FromSeconds(3))
                    .PipeTo(Self, Self);
            }
            else
            {
                Sender.Tell(new Ping(msg.Count + 1));
                _collector?.Tell(new ActorEvent("PingActor", "PongActor", $"Ping({msg.Count + 1})", msg.Count + 1, DateTime.UtcNow));
            }
        });

        Receive<EventList>(eventList =>
        {
            var result = new PingPongResult(_maxRounds, $"Completed {_maxRounds} rounds", eventList.Events);
            _requester?.Tell(result);
            Context.Stop(Self);
        });
    }
}
