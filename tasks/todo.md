# Flowx Stage 1 – Task Plan

## Scope
- Lightweight project: frontend (Angular 17) + backend folder (API design only).
- Frontend works fully without backend (demo mode).
- Zerodha Oat CSS, no SCSS, Poppins font, light/dark theme.

## Checklist

- [x] Create tasks/todo.md and backend/backend.md
- [x] Scaffold Angular 17 frontend (Oat CDN, env, routes)
- [x] Auth: AuthService, AuthGuard, login/register pages
- [x] App layout: AppShell, Sidebar, Topbar, theme toggle
- [x] Repositories: StrategyRepository, AnalyticsRepository
- [x] Reusable components: StrategyCard, EmptyState, Modal, Tabs
- [x] Pages: Home, Strategies, Analytics, Create/Edit Strategy
- [x] README with deployment instructions

## Verification
- Run `ng serve`, navigate routes, test auth flow, theme toggle.
- Confirm no backend code in backend/ (only backend.md).

## Review
- User reported UI looked unchanged; root cause was insufficient visual parity on app pages and theme toggle visibility.
- Added a persistent global theme toggle and updated app shell/sidebar/strategies list to match reference structure.
- Refactored auth and dashboard UI to Tailwind-based Plan-FlowX style with dark mode class switching and chart/table analytics layout.
