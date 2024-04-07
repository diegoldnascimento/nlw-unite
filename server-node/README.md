# pass.in

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

# Install the application

- NodeJS v20.12+
- Typescript
- Prisma

# Start the Node Server
```
yarn install
yarn start
```

# Run the DB command

```
npx prisma init --datasource-provider SQLite
```
