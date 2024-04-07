interface HttpHealthCheckResponse {
  status: string;
}

type HttpHealthCheckRequest = void;

export interface Controller<I, O> {
  handle: (request: I, response: O) => Promise<O>;
}

export class HealthCheckController
  implements Controller<HttpHealthCheckRequest, HttpHealthCheckResponse>
{
  async handle() {
    return {
      status: "OK",
    };
  }
}
