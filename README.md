# Flowx (Antspace)

Lightweight trading strategy app: **Angular 17 frontend** (demo mode, no backend) and **backend API design only** in `backend/`.

## Project structure

```
root/
├── frontend/          # Angular 17 app (Oat CSS, TypeScript)
├── backend/           # API design only (no server code)
│   └── backend.md     # Future backend API spec
├── tasks/
│   └── todo.md
└── README.md
```

- **Backend folder** contains only `backend.md` (future Spring Boot + PostgreSQL API design). No backend code.
- **Frontend** runs fully in **demo mode** using `localStorage` and in-memory data.

---

## Frontend

- **Tech:** Angular 17, TypeScript
- **Design:** [Zerodha Oat](https://oat.ink/) CSS via CDN, Poppins (Google Fonts)
- **Themes:** Light / Dark (toggle in topbar, persisted in `localStorage`)
- **Auth:** Demo auth via `AuthService` + `localStorage`; `AuthGuard` protects `/app/*` routes

### Run locally

```bash
cd frontend
npm install
npm start
# or: ng serve
```

Open **http://localhost:4200**

### Build

```bash
cd frontend
npm run build
# or: ng build
```

Output: `frontend/dist/frontend/` (static files).

### Environment

- **Config:** `frontend/src/environments/environment.ts`
- **Properties:** `backendMode: "demo" | "real"`, `apiBaseUrl: string`
- **Default:** `backendMode: "demo"`. In **real** mode the app shows: *"Real backend not configured yet"*. No backend HTTP calls are implemented.

---

## Deployment (static hosting)

Deploy the **build output** (`frontend/dist/frontend/`) as static files.

### SPA routing

Ensure all routes (e.g. `/app/home`, `/auth/login`) serve **index.html** so the Angular router can handle them.

- **Netlify:** Add `frontend/dist/frontend` as publish directory; add redirect `/* /index.html 200`.
- **Vercel:** Set output to `frontend/dist/frontend`; add rewrite `/*` → `/index.html`.
- **AWS S3 + CloudFront:** Upload contents of `frontend/dist/frontend`; set error document and 404 to `index.html` for SPA behavior.
- **Nginx:**  
  `try_files $uri $uri/ /index.html;`

### Example (Netlify)

1. Build: `cd frontend && npm run build`
2. In Netlify: set **Publish directory** to `frontend/dist/frontend`
3. Add redirect: `/* /index.html 200`

### Example (Vercel)

1. Root or app directory: `frontend`
2. Build: `npm run build`
3. Output: `dist/frontend`
4. Rewrite: `/*` → `/index.html`

---

## Routes

| Path | Description |
|------|-------------|
| `/auth/login` | Login |
| `/auth/register` | Register |
| `/app/home` | Home (summary, tabs, empty state) |
| `/app/strategies` | Strategies list (tabs: Draft / Live / Closed / Deployed) |
| `/app/strategies/create` | Create strategy |
| `/app/strategies/:id/edit` | Edit strategy |
| `/app/analytics` | Analytics (placeholder + KPI cards, Modern/Classic toggle) |

---

## Deliverables

- [x] Working Angular frontend
- [x] Demo auth (register / login / logout, `localStorage`)
- [x] Light/Dark theme toggle (Oat, persisted in `localStorage`)
- [x] LocalStorage + in-memory repositories (Strategy, Analytics)
- [x] Separate `backend/` folder with `backend.md` API design only
- [x] Deployment instructions (static + SPA rewrite)

Backend is **not** implemented; see `backend/backend.md` for the intended API.
