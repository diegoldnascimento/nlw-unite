import fastify from "fastify";
import { HealthCheckController } from "./app/controllers/healthcheck/healthCheckController";
import { GetAllEventsController } from "./app/controllers/event/getAllEventsController";
import { EventRepositoryMemory } from "./infra/repositories/event/eventRepositoryMemory";
import { GetAllEventsUseCase } from "./app/useCases/event/getAllEventsUseCase";

const app = fastify({ logger: true });

app.get("/", async () => {
  return await new HealthCheckController().handle();
});

app.get("/v1/events", async () => {
  const useCase = new GetAllEventsUseCase(new EventRepositoryMemory());
  return await new GetAllEventsController(useCase).handle();
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
