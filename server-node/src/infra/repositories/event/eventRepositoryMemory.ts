import { EventRepository } from "../../../domain/repositories/eventRepository";
import { Event } from "../../../domain/entities/event/event";

export class EventRepositoryMemory implements EventRepository {
  private events: Event[] = [];
  constructor() {
    this.events.push(
      new Event(
        "1",
        "Event Title",
        "event-slug",
        "Event Details",
        100,
      ),
      new Event(
        "2",
        "Event Title",
        "event-slug",
      )
    )
  }

  getAll() {
    return this.events;
  }

}
