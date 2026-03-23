namespace sample3.Actors;

public record Ping(int Count);
public record Pong(int Count);
public record StartPingPong(int Rounds);
public record PingPongResult(int TotalRounds, string Summary, List<ActorEvent> Events);

// 이벤트 수집용 메시지
public record ActorEvent(string From, string To, string Message, int Round, DateTime Timestamp);
public record GetEvents;
public record EventList(List<ActorEvent> Events);
