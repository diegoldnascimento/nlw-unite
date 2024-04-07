import { PrismaClient } from "@prisma/client/extension";
import { EventRepository } from "../../../domain/repositories/eventRepository";
import { Event } from "../../../domain/entities/event/event";

export class EventRepositoryDb implements EventRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll() {
    const events = await this.prismaClient.event.findMany();

    return events;
  }
}
