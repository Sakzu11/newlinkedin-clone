# Tasks: Profile Connections

## Task List

- [x] 1. Backend: ConnectionRequest model and migration
  - [x] 1.1 Add `ConnectionRequest` model to `backend/api/models.py` with fields: `requester` (FK User), `recipient` (FK User), `status` (choices: pending/accepted/declined), `created_at`; add `unique_together = ('requester', 'recipient')`
  - [x] 1.2 Generate and apply Django migration for the new model

- [x] 2. Backend: Serializers
  - [x] 2.1 Add `ConnectionRequestSerializer` to `backend/api/serializers.py` with nested `UserSerializer` for requester and recipient
  - [x] 2.2 Add `ConnectionStatusSerializer` (returns `status` string and `connection_id`)

- [x] 3. Backend: API Views
  - [x] 3.1 Add `ConnectionRequestListCreateView` (`GET /connections/`, `POST /connections/`) — list own requests, send new request with self-connect and duplicate validation
  - [x] 3.2 Add `ConnectionRequestDetailView` (`PATCH /connections/{id}/`, `DELETE /connections/{id}/`) — accept/decline (recipient only), withdraw/remove (requester or either party) with 403 guards
  - [x] 3.3 Add `connection_status` view (`GET /connections/status/{user_id}/`) — returns `Connection_Status` enum value and `connection_id`
  - [x] 3.4 Add `connection_count` view (`GET /connections/count/`) — returns count of accepted connections for authenticated user
  - [x] 3.5 Add `connections_list` view (`GET /connections/list/`) — returns list of users with accepted connections, including avatar URL

- [x] 4. Backend: URL Registration
  - [x] 4.1 Register all new connection endpoints in `backend/api/urls.py`

- [~] 5. Backend: Tests
  - [-] 5.1 Write unit tests in `backend/api/tests.py` covering: self-connect (400), duplicate request (400), non-recipient accept/decline (403), non-requester withdraw (403), non-participant remove (403), accept sets status to accepted, decline sets status to declined, withdraw deletes record (204), remove deletes record (204), count endpoint accuracy, list endpoint accuracy, status endpoint for all four states
  - [ ] 5.2 Write Hypothesis property tests for Properties 1–9 (backend properties) with minimum 100 iterations each, tagged with `# Feature: profile-connections, Property N: ...`

- [ ] 6. Frontend: API client additions
  - [ ] 6.1 Add connection API functions to `src/api.js`: `sendConnectionRequest(userId)`, `respondToConnection(id, action)`, `withdrawConnection(id)`, `removeConnection(id)`, `fetchConnectionStatus(userId)`, `fetchConnectionCount()`, `fetchConnectionsList()`

- [ ] 7. Frontend: MyNetwork page
  - [ ] 7.1 On mount in `src/MyNetwork.js`, fetch real connection statuses for all displayed users from `GET /connections/status/{user_id}/` and store in state (replace the local `connected` toggle)
  - [ ] 7.2 Render user cards with correct button state based on `Connection_Status`: `none` → Connect, `pending_sent` → Pending (disabled), `pending_received` → Accept + Decline, `connected` → Connected (disabled)
  - [ ] 7.3 Wire up Connect button to call `sendConnectionRequest` and update local status state to `pending_sent`
  - [ ] 7.4 Wire up Accept button to call `respondToConnection(id, 'accepted')` and update local status state to `connected`
  - [ ] 7.5 Wire up Decline button to call `respondToConnection(id, 'declined')` and update local status state to `none`
  - [ ] 7.6 Wire up Pending button (withdraw) to call `withdrawConnection(id)` and update local status state to `none`
  - [ ] 7.7 Wire up Connected button (remove) to call `removeConnection(id)` and update local status state to `none`

- [ ] 8. Frontend: Profile page connections section
  - [ ] 8.1 In `src/main.js`, add state for `connectionCount` (default `null` for loading), `connectionsList` (default `[]`), and `connectionsError`
  - [ ] 8.2 On mount, call `fetchConnectionCount()` and `fetchConnectionsList()`; on error set count to 0 and show fallback
  - [ ] 8.3 Display connection count in the hero card area (e.g. "42 connections") with a skeleton/placeholder while loading
  - [ ] 8.4 Add a "Connections" section below the hero card showing each connection's avatar and name; show "No connections yet." when list is empty

- [ ] 9. Frontend: Tests
  - [ ] 9.1 Write unit tests for MyNetwork button rendering logic (all four status states render correct buttons)
  - [ ] 9.2 Write unit tests for Profile Page: count displays correctly, loading state shows placeholder, error state shows "0 connections", empty list shows empty state message, list renders name and avatar per item
  - [ ] 9.3 Write property tests (using fast-check) for Properties 10–12 (UI status-to-button mapping, action-to-state-update, connections list rendering) with minimum 100 iterations each, tagged with `// Feature: profile-connections, Property N: ...`
