using Akka.Actor;
using Akka.Event;

namespace sample3.Actors;

public class EventCollectorActor : ReceiveActor
{
    private readonly ILoggingAdapter _logger = Context.GetLogger();
    private readonly List<ActorEvent> _events = new();

    public EventCollectorActor()
    {
        Receive<ActorEvent>(evt =>
        {
            _events.Add(evt);
            _logger.Info("[Event] {0} → {1}: {2} (Round {3})", evt.From, evt.To, evt.Message, evt.Round);
        });

        Receive<GetEvents>(_ =>
        {
            Sender.Tell(new EventList(new List<ActorEvent>(_events)));
        });
    }
}
