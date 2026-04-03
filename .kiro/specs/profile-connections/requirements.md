# Requirements Document

## Introduction

This feature adds a LinkedIn-style connections system to the existing LinkedIn clone. Users can send connection requests to other users, accept or decline incoming requests, view their connection count and list on their profile page, and see connection status indicators in the MyNetwork page. The backend is Django REST Framework with JWT auth; the frontend is React using axios via `src/api.js`.

## Glossary

- **Connection_Request**: A pending invitation sent from one User to another, with a status of `pending`, `accepted`, or `declined`.
- **Connection**: A mutual, accepted relationship between two Users.
- **Requester**: The User who initiates a Connection_Request.
- **Recipient**: The User who receives a Connection_Request.
- **Connection_API**: The Django REST backend endpoints that manage Connection_Request lifecycle.
- **Profile_Page**: The React component at `src/main.js` that displays the current user's profile.
- **MyNetwork_Page**: The React component at `src/MyNetwork.js` that lists other users.
- **Connection_Status**: One of `none`, `pending_sent`, `pending_received`, or `connected`, representing the relationship between the current user and another user.

---

## Requirements

### Requirement 1: Send a Connection Request

**User Story:** As a user, I want to send a connection request to another user, so that I can grow my professional network.

#### Acceptance Criteria

1. WHEN a logged-in User submits a connection request to a Recipient, THE Connection_API SHALL create a Connection_Request with status `pending` and return HTTP 201.
2. IF a User attempts to send a Connection_Request to themselves, THEN THE Connection_API SHALL return HTTP 400 with a descriptive error message.
3. IF a Connection_Request already exists between two Users in any status, THEN THE Connection_API SHALL return HTTP 400 with a descriptive error message instead of creating a duplicate.
4. WHEN a User views the MyNetwork_Page, THE MyNetwork_Page SHALL display a "Connect" button for each user whose Connection_Status is `none`.
5. WHEN a User clicks "Connect" on the MyNetwork_Page, THE MyNetwork_Page SHALL call the Connection_API and update the button to show "Pending" for that user.

---

### Requirement 2: Accept or Decline a Connection Request

**User Story:** As a user, I want to accept or decline incoming connection requests, so that I can control who is in my network.

#### Acceptance Criteria

1. WHEN a Recipient accepts a Connection_Request, THE Connection_API SHALL update the Connection_Request status to `accepted` and return HTTP 200.
2. WHEN a Recipient declines a Connection_Request, THE Connection_API SHALL update the Connection_Request status to `declined` and return HTTP 200.
3. IF a User who is not the Recipient attempts to accept or decline a Connection_Request, THEN THE Connection_API SHALL return HTTP 403.
4. WHEN a User views the MyNetwork_Page, THE MyNetwork_Page SHALL display "Accept" and "Decline" buttons for each user whose Connection_Status is `pending_received`.
5. WHEN a Recipient accepts a Connection_Request on the MyNetwork_Page, THE MyNetwork_Page SHALL update the button state to show "Connected" without a full page reload.
6. WHEN a Recipient declines a Connection_Request on the MyNetwork_Page, THE MyNetwork_Page SHALL remove the "Accept"/"Decline" buttons and show "Connect" for that user.

---

### Requirement 3: View Connection Count on Profile Page

**User Story:** As a user, I want to see my total connection count on my profile page, so that I can understand the size of my network.

#### Acceptance Criteria

1. THE Connection_API SHALL expose an endpoint that returns the count of accepted connections for the authenticated User.
2. WHEN the Profile_Page loads, THE Profile_Page SHALL fetch and display the authenticated User's connection count.
3. WHILE the connection count is loading, THE Profile_Page SHALL display a placeholder or skeleton state.
4. IF the connection count fetch fails, THEN THE Profile_Page SHALL display "0 connections" as a fallback.

---

### Requirement 4: View Connections List on Profile Page

**User Story:** As a user, I want to see a list of my connections on my profile page, so that I can review who is in my network.

#### Acceptance Criteria

1. THE Connection_API SHALL expose an endpoint that returns the list of Users with whom the authenticated User has an accepted connection.
2. WHEN the Profile_Page loads, THE Profile_Page SHALL fetch and display the list of accepted connections in a dedicated "Connections" section.
3. WHEN the connections list is empty, THE Profile_Page SHALL display a message indicating no connections yet.
4. THE Profile_Page SHALL display each connection's name and avatar in the connections list.

---

### Requirement 5: Connection Status in MyNetwork Page

**User Story:** As a user, I want to see the connection status for each person in MyNetwork, so that I know who I'm already connected with or have a pending request with.

#### Acceptance Criteria

1. THE Connection_API SHALL expose an endpoint that returns the Connection_Status between the authenticated User and a given other User.
2. WHEN the MyNetwork_Page loads, THE MyNetwork_Page SHALL fetch the Connection_Status for each displayed user from the Connection_API.
3. WHILE Connection_Status is `connected`, THE MyNetwork_Page SHALL display "Connected" (non-interactive) for that user.
4. WHILE Connection_Status is `pending_sent`, THE MyNetwork_Page SHALL display "Pending" (non-interactive) for that user.
5. WHILE Connection_Status is `pending_received`, THE MyNetwork_Page SHALL display "Accept" and "Decline" buttons for that user.
6. WHILE Connection_Status is `none`, THE MyNetwork_Page SHALL display a "Connect" button for that user.

---

### Requirement 6: Withdraw a Connection Request

**User Story:** As a user, I want to withdraw a pending connection request I sent, so that I can change my mind before the recipient responds.

#### Acceptance Criteria

1. WHEN a Requester withdraws a pending Connection_Request, THE Connection_API SHALL delete the Connection_Request and return HTTP 204.
2. IF a User who is not the Requester attempts to withdraw a Connection_Request, THEN THE Connection_API SHALL return HTTP 403.
3. WHEN a User withdraws a pending request on the MyNetwork_Page, THE MyNetwork_Page SHALL update the button back to "Connect" for that user.

---

### Requirement 7: Remove an Existing Connection

**User Story:** As a user, I want to remove an existing connection, so that I can manage my network.

#### Acceptance Criteria

1. WHEN a User removes an accepted Connection, THE Connection_API SHALL delete the Connection_Request record and return HTTP 204.
2. IF a User who is not part of the Connection attempts to remove it, THEN THE Connection_API SHALL return HTTP 403.
3. WHEN a User removes a connection on the MyNetwork_Page, THE MyNetwork_Page SHALL update the button back to "Connect" for that user.
4. WHEN a User removes a connection, THE Profile_Page connection count SHALL decrement by 1.
