# Notes API

A small RESTful Notes API built with **Node.js (http module)**. Supports full CRUD, simple validation, pagination, search and file-based persistence (`notes.json`). Great for learning how to build a backend .


## Features

* CRUD endpoints for notes (create, read, update, delete)
* JSON body parsing and validation
* Pagination and case-insensitive search
* Basic sorting support
* Persists to a local `notes.json` file using `fs module`
* Dependency-light — runs with plain Node 


## Data model

```json
{
  "id": "uuid-v4",
  "title": "Buy groceries",
  "body": "Milk, eggs, bread",
  "tags": ["shopping", "errands"],
  "createdAt": "2025-09-15T10:00:00.000Z",
  "updatedAt": "2025-09-15T10:00:00.000Z"
}
```


## Endpoints (overview)

* `GET /notes` — list notes (query: `page`, `limit`)
* `GET /notes/:id` — get a single note
* `POST /notes` — create a note (201)
* `PUT /notes/:id` — update a note (200) — use `PATCH` for partial updates
* `DELETE /notes/:id` — delete a note (204)


## Pagination & search

* Defaults: `page=1`, `limit=10`.


## Quick start (Node)

1. Clone the repo
2. (Optional) Install dev tools like nodemon:

   ```bash
   npm install -D nodemon
   ```
3. Start the server:

   ```bash
   node index.js
   # or with nodemon
   npx nodemon index.js
   ```
4. Test with curl / Postman

### Example: create note

```bash
http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","body":"2 liters","tags":["shopping"]}'
```

### Example: list notes (page 1, 5 per page)

```bash
"http://localhost:3000/notes?page=1&limit=5"
```

### Example: get single note

```bash
"http://localhost:3000/notes/id=REPLACE_ID"
```

### Example: delete note

```bash
"http://localhost:3000/notes/id=REPLACE_ID"
```
