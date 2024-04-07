import { EventRepository } from "../../../domain/repositories/eventRepository";

interface UseCase<I, O> {
  execute: (input: I) => Promise<O>;
}

type Input = void;
type Output = {
  id: string;
  title: string;
  details?: string;
  slug: string;
  maximumAttendees?: number;
}[];

export class GetAllEventsUseCase implements UseCase<Input, Output> {
  constructor(readonly eventRepository: EventRepository) {}

  async execute(input: Input): Promise<Output> {
    const events = this.eventRepository.getAll();

    const output = [];

    for (const event of events) {
      output.push({
        id: event.id,
        title: event.title,
        details: event.details,
        slug: event.slug,
        maximumAttendees: event.maximumAttendees,
      });
    }

    return {
      ...output,
    };
  }
}
