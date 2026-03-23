using Akka.Actor;
using Akka.Event;

namespace sample3.Actors;

public class PongActor : ReceiveActor
{
    private readonly ILoggingAdapter _logger = Context.GetLogger();

    public PongActor(IActorRef collector)
    {
        Receive<Ping>(msg =>
        {
            _logger.Info("Pong received Ping({0})", msg.Count);
            Sender.Tell(new Pong(msg.Count));
        });
    }
}
