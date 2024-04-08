import fastify from "fastify";
import { HealthCheckController } from "./app/controllers/healthcheck/healthCheckController";
import { GetAllEventsController } from "./app/controllers/event/getAllEventsController";
import { GetAllEventsUseCase } from "./app/useCases/event/getAllEventsUseCase";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { EventRepositoryDb } from "./infra/repositories/event/eventRepositoryDb";
import { generateSlug } from "./infra/helpers/generateSlug";

const app = fastify({ logger: true });

const prismaClient = new PrismaClient({
  log: ["query"],
});

app.get("/", async (_, reply) => {
  const response = await new HealthCheckController().handle();

  return reply.code(200).send(response);
});

app.get("/v1/events", async (_, reply) => {
  const useCase = new GetAllEventsUseCase(new EventRepositoryDb(prismaClient));
  const response = await new GetAllEventsController(useCase).handle();

  return reply.code(200).send(response);
});

app.get("/v1/events/:uuid", async (request, reply) => {
  const { uuid } = request.params as {
    uuid: string;
  };

  const event = await prismaClient.event.findUnique({
    where: {
      id: uuid,
    },
  });

  if (!event) {
    return reply.code(404).send({
      message: "No event found",
      statusCode: 404,
      code: "NO_EVENT_FOUND",
    });
  }

  return reply.code(200).send({
    id: event.id,
    title: event.title,
    details: event.details,
    slug: event.slug,
    maximumAttendees: event.maximumAttendees,
  });
});

app.post("/v1/events", async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const data = createEventSchema.parse(request.body);

  const slug = generateSlug(data.title);

  const event = await prismaClient.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug,
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
