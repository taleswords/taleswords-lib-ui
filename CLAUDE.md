# Admin Dashboard Instructions (Vue 3 + Vite)

This folder contains the **dashboard UI only**.

---

## Stack
- Vue 3
- Vite
- TypeScript
- Composition API
- `<script setup>`

---

## Rules

Claude MUST:
- Use Composition API
- Use `<script setup lang="ts">`
- Use Vite environment variables
- Keep components small and readable

Claude MUST NOT:
- Add backend logic
- Modify server code
- Hardcode API URLs
- Use Options API

---

## Environment Variables
- Access via `import.meta.env`
- Never assume production URLs
- Support development / staging / production

---

## UI Principles
- Clear UX
- No unnecessary dependencies
- Prefer native browser features

---

## Auth
- Assume JWT-based auth
- Do NOT store secrets in localStorage unless explicitly told

---

## Build Output
- Dashboard is built, not server-rendered
- Output is deployed via FTP
- No runtime Node.js on the server

---

## Final Rule
If backend changes are required, STOP and ask.
