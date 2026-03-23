using Akka.Actor;
using Akka.Hosting;
using sample3.Actors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAkka("PingPongSystem", config =>
{
    config.WithActors((system, registry) =>
    {
        // PingActor/EventCollector는 요청마다 동적 생성
    });
});

var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/api/health", () => Results.Ok(new { status = "healthy" }));

app.MapGet("/api/pingpong/{rounds:int}", async (int rounds, ActorSystem system) =>
{
    if (rounds < 1 || rounds > 100)
        return Results.BadRequest(new { error = "Rounds must be between 1 and 100" });

    var collector = system.ActorOf(Props.Create<EventCollectorActor>(), $"collector-{Guid.NewGuid():N}");
    var pingActor = system.ActorOf(Props.Create(() => new PingActor(collector)), $"ping-{Guid.NewGuid():N}");
    var result = await pingActor.Ask<PingPongResult>(new StartPingPong(rounds), TimeSpan.FromSeconds(10));
    return Results.Ok(result);
});

app.MapFallback(async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync(
        Path.Combine(app.Environment.WebRootPath, "index.html"));
});

app.Run();
