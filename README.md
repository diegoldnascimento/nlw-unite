# NLW Unite

It's the newest edition of the Next-level Week made by RocketSeat. The NLW E-sports is a side-project that contains a web, mobile and server application, that allow the user to find the best duo for its games.

The goal is to allow the user to find the duo that fits their criterias and connect with them, to play together.

# Software Architecture
- CLEAN Architecture
- SOLID Principles
- Domain Driven Design

# Folder Structure

- __docs__
- web 
- server-node

# Requirements

## pass.in

Pass.in is an application for **managing participants in on-site events**.

The tool allows the organizer to register an event and open a public registration page. Registered participants can generate a credential for check-in on the day of the event. The system will scan the participant's credential to allow entry to the event. ## Requirements ### Functional Requirements - [ ] The organizer must be able to register a new event;
- [ ] The organizer must be able to view data of an event;
- [ ] The organizer must be able to view the list of participants;
- [ ] The participant must be able to register for an event;
- [ ] The participant must be able to view their registration badge;
- [ ] The participant must be able to check in to the event;

### Business Rules

- [ ] The participant can only register for an event once;
- [ ] The participant can only register for events with available slots;
- [ ] The participant can only check in to an event once;

### Non-functional Requirements

- [ ] Event check-in will be performed via a QR Code;
