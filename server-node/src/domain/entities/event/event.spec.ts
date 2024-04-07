import { describe, it } from "node:test";
import { Event } from "./event";
import assert from "node:assert";

describe("Event", () => {
  it("should create an event with valid properties", () => {
    const event = new Event("1", "Event Title", "event-slug");
    assert.strictEqual(event.id, "1");
    assert.strictEqual(event.title, "Event Title");
    assert.strictEqual(event.slug, "event-slug");
    assert.strictEqual(event.details, undefined);
    assert.strictEqual(event.maximumAttendees, undefined);
  });

  it("should create an event with valid details and maximum attendes", () => {
    const event = new Event(
      "1",
      "Event Title",
      "event-slug",
      "Event Details",
      100,
    );
    assert.strictEqual(event.id, "1");
    assert.strictEqual(event.title, "Event Title");
    assert.strictEqual(event.slug, "event-slug");
    assert.strictEqual(event.details, "Event Details");
    assert.strictEqual(event.maximumAttendees, 100);
  });

  it("should throw an error if id is missing", () => {
    assert.throws(
      () => new Event("", "Event Title", "event-slug", "Event Details", 100),
      {
        message: "ID must be a non-empty string.",
      },
    );
  });

  it("should throw an error if title is missing", () => {
    assert.throws(
      () => new Event("1", "", "event-slug", "Event Details", 100),
      {
        message: "Title must be a non-empty string.",
      },
    );
  });

  it("should throw an error if slug is missing", () => {
    assert.throws(
      () => new Event("1", "Event Title", "", "Event Details", 100),
      {
        message: "Slug must be a non-empty string.",
      },
    );
  });

  it("should throw an error if maximum atendees is negative", () => {
    assert.throws(
      () => new Event("1", "Event Title", "event-slug", "Event Details", -1),
      {
        message: "Maximum attendees must be a non-negative integer.",
      }
    );
  });

  it("should throw an error if maximum atendees is not an integer", () => {
    assert.throws(
      () => new Event("1", "Event Title", "event-slug", "Event Details", 1.1),
      {
        message: "Maximum attendees must be a non-negative integer.",
      }
    );
  });
});
