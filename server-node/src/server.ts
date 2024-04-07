import fastify from "fastify";
import { HealthCheckController } from "./app/controllers/healthcheck/healthCheckController";
import { GetAllEventsController } from "./app/controllers/event/getAllEventsController";
import { EventRepositoryMemory } from "./infra/repositories/event/eventRepositoryMemory";
import { GetAllEventsUseCase } from "./app/useCases/event/getAllEventsUseCase";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { EventRepositoryDb } from "./infra/repositories/event/eventRepositoryDb";

const app = fastify({ logger: true });

const prismaClient = new PrismaClient({
  log: ["query"],
});

app.get("/", async () => {
  return await new HealthCheckController().handle();
});

app.get("/v1/events", async () => {
  const useCase = new GetAllEventsUseCase(new EventRepositoryDb(prismaClient));
  return await new GetAllEventsController(useCase).handle();
});

app.post("/v1/events", async (request, reply) => {
  // const useCase = new GetAllEventsUseCase(new EventRepositoryMemory());
  // return await new GetAllEventsController(useCase).handle();
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const data = createEventSchema.parse(request.body);

  const event = await prismaClient.event
    .create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug: new Date().toISOString(),
      },
    });

  if (event) {
    return reply
      .code(201)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        eventId: event.id,
        maximumAttendees: event.maximumAttendees,
        title: event.details,
        slug: event.slug,
      });
  }

  return reply.code(500).send({
    err: "Internal Server Error",
    statusCode: 500,
  });
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
