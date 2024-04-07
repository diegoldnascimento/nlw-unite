import assert from "node:assert";
import { describe, it } from "node:test";
import { HealthCheckController } from "./healthCheckController";

const makeSut = () => {
  const healthCheckController = new HealthCheckController();

  return {
    healthCheckController,
  };
};

describe("HealthCheckController", () => {
  it("should return a valid response with status 'OK'", async () => {
    const { healthCheckController } = makeSut();

    const response = await healthCheckController.handle();

    assert.strictEqual(response.status, "OK");
  });
});
