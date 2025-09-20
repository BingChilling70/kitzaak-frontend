# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Short-term (this week) – Quick wins

Robust auth & roles

Add roles: customer, worker, admin (Django Groups or a role field on user profile).

Gate endpoints by role (e.g., workers can see assigned tickets; admins see all).

Add “Remember me” + silent token refresh in the frontend.

Ticket lifecycle & ownership

Fields: assigned_to (FK to User), priority, due_date.

Actions: assign/unassign, change status with reason, add internal notes (worker-only).

Server-side validation (e.g., preferred_date cannot be in the past).

File uploads end-to-end

Confirm DRF accepts multiple images and they’re visible in TicketDetails (thumbnails).

Limit file size/type, return clear errors to the UI.

Filtering/sorting/pagination in UI

On /tickets: filters for status, category, date range; sort by created/updated.

Show total count, empty states, and loading/skeletons.

UX polish essentials

Toasts for success/error.

Confirmations (assign/close).

Disable buttons while submitting.

Form validation hints (client + server messages).

Near-term (next 2–3 weeks) – Worker portal & scheduling

Worker portal (separate nav)

New route namespace /worker/\* with its own nav.

Views: “My Assigned”, “Unassigned”, Ticket board (Kanban by status).

Bulk actions (assign to me, close multiple).

Calendar/scheduling

Ticket has a scheduled_start, scheduled_end, location.

iCal export for a worker; simple calendar view in frontend (month/week/day).

Optional: Google Calendar sync later.

Comments & activity log

Ticket comments (customer-facing vs internal).

Activity timeline (status changes, assignment, file uploads).

Medium-term (next 1–2 months) – Payments, invoices, emails

Quotes & invoices

Quote model (items, quantity, unit price, VAT, total).

Convert accepted quote → invoice (PDF generation with your branding).

“Mark as paid” (manual first; integrate Stripe later).

Notifications

Email on new ticket, assignment, status change.

Daily digest for workers (assigned today, due tomorrow).

Optional: push/email preferences per user.

Customer profile & address book

Store multiple addresses per customer; step 1 of the flow can pick from saved addresses.

Basic GDPR requests (export/delete my data).

Engineering & Ops – keep it healthy

Testing

Backend: DRF tests for tickets (create/list/assign/close), permissions.

Frontend: component tests for CreateTicketFlow & Tickets; API mocks.

Smoke test GitHub Actions on PR (lint, test).

Security

Harden CORS, use django-environ, rotate SECRET_KEY for prod, secure cookies in prod.

Upload scanning (mime type/size), rate limiting on auth.

Performance & reliability

Thumbnails via DRF or a storage service (S3 later).

N+1 query checks, add select_related/prefetch_related.

Structured logging (request ID), basic error monitoring (Sentry).

Deployment pipeline

Dockerfiles for backend/frontend, docker-compose for local.

GitHub Actions: build, run tests, build artifacts.

One-click deploy target (Railway/Fly/Render) for a staging env.

What I recommend doing next, concretely

Add roles + permissions (backend):

Create groups: customer, worker, admin.

TicketViewSet:

customers: only own tickets;

workers: tickets assigned to them + unassigned (read);

admins: all.

Endpoints to assign/unassign & change status with validation.

Upgrade the Tickets list UI:

Add filter bar (status/category/date), server-driven pagination controls.

Show chips for category/status, clearer empty state.

Add a column for ticket_number, clickable row.

Finish CreateTicketFlow → TicketDetails loop:

After submit, navigate to the newly created ticket details page.

Show all fields (address, category, instructions, photos).

Add “Add comment” box (customer), “Add internal note” (worker/admin).

If you want, I can give you drop-in code for:

A roles.py (permissions) + updated TicketViewSet filters/actions.

A filter bar component for Tickets that wires up to your existing API.

A basic TicketComments backend model + endpoints + UI.

Which of those do you want to tackle first?
