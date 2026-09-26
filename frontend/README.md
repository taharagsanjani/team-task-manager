# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

# Backend — Team Task Manager

A REST API for creating, reading, updating, and deleting projects.
Built with Node.js, Express, and TypeScript.

## Setup

Install Node.js and npm, then run these commands from the project root:

```sh
cd backend
npm install
```

## Run

Inside the backend folder:

```sh
npm run dev
```

Default server address: http://127.0.0.1:3000

The PORT environment variable can override the default port.

## API Routes

| Method | Path              | Purpose           |
| ------ | ----------------- | ----------------- |
| GET    | /api/projects     | List all projects |
| GET    | /api/projects/:id | Get one project   |
| POST   | /api/projects     | Create a project  |
| PUT    | /api/projects/:id | Update a project  |
| DELETE | /api/projects/:id | Delete a project  |

Replace `:id` with an actual project ID.

Additional routes:

- GET /api/health — Check that the server is running.
- GET /api/info — Get the application name and version.

## Request Example

For POST and PUT, set this header:

```text
Content-Type: application/json
```

Example JSON body:

```json
{
  "name": "Website design",
  "description": "Build the team website"
}
```

The server generates the project ID when creating a project.

## Validation

- The request body must be an object.
- The name must be a string and cannot be empty after trimming.
- The description is optional, but must be a string when provided.
- Leading and trailing whitespace is removed from both fields.
- An omitted description becomes an empty string.
- PUT updates the name and description while keeping the ID unchanged.
- Omitting the description in PUT clears the existing description.

## Responses

- 200 — Successful read, update, or deletion.
- 201 — Project created.
- 400 — Invalid project input.
- 404 — Project not found.

Successful reads, creation, and updates return project information
in the `data` field. Deletion returns a confirmation message.
Validation errors return a `message` explaining the problem.

## Current Limitations

- Projects are stored in memory, not in a database.
- Restarting the server clears the current project data.
- Authentication and access permissions are not implemented.
- Teams, tasks, and notifications are not implemented.

## Progress

### Completed

- Project CRUD endpoints.
- Project input validation.
- Separate project router.
- Health and application information endpoints.

### Remaining Work

- Database persistence.
- User authentication.
- Teams and role-based permissions.
- Tasks and assignment.
- Email and in-app notifications.

## Manual Verification Checklist

- [ ] Create two valid projects; each returns 201 and an ID.
- [ ] Submit a whitespace-only name; expect 400 and no new project.
- [ ] List projects and confirm both exist.
- [ ] Update one project and confirm its ID stays unchanged.
- [ ] Submit an invalid update and confirm saved data stays unchanged.
- [ ] Delete one project and confirm the other remains.
- [ ] Get or delete the removed project again; expect 404.
