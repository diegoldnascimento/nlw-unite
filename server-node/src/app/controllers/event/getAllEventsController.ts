import { GetAllEventsUseCase } from "../../useCases/event/getAllEventsUseCase";

type HttpGetAllEventsRequest = void;

type HttpGetAllEventsResponse = {
  id: string;
  title: string;
  details?: string;
  slug: string;
  maximumAttendees?: number;
}[];

export interface Controller<I, O> {
  handle: (request: I, response: O) => Promise<O>;
}

export class GetAllEventsController
  implements Controller<HttpGetAllEventsRequest, HttpGetAllEventsResponse>
{
  constructor(private readonly getAllEventsUseCase: GetAllEventsUseCase) {}

  async handle() {
    const events = await this.getAllEventsUseCase.execute();

    return events;
  }
}
