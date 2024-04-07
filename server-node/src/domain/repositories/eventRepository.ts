import { Event } from "../entities/event/event";

export interface EventRepository {
  getAll: () => Event[];
}
