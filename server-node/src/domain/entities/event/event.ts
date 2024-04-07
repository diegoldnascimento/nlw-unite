export class Event {
  id: string;
  title: string;
  details?: string;
  slug: string;
  maximumAttendees?: number;

  constructor(
    id: string,
    title: string,
    slug: string,
    details?: string,
    maximumAttendees?: number,
  ) {
    if (!id || typeof id !== "string") {
      throw new Error("ID must be a non-empty string.");
    }
    if (!title || typeof title !== "string") {
      throw new Error("Title must be a non-empty string.");
    }
    if (!slug || typeof slug !== "string") {
      throw new Error("Slug must be a non-empty string.");
    }

    this.id = id;
    this.title = title;
    this.slug = slug;
    this.details = details;

    if (maximumAttendees !== undefined) {
      if (!Number.isInteger(maximumAttendees) || maximumAttendees < 0) {
        throw new Error("Maximum attendees must be a non-negative integer.");
      }
      this.maximumAttendees = maximumAttendees;
    }
  }
}
