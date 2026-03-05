# Flowx Product Understanding

## Product identity
- Product name: Flowx (powered by Antspace).
- Category: lightweight algorithmic trading web application.
- Current mode: frontend-first demo experience with local data persistence.

## Primary users
- Retail and semi-pro traders who want to automate strategies.
- Users managing multiple strategy types across paper and broker execution.
- Users who need a simple UI for deploy/monitor/stop workflows.

## Core jobs-to-be-done
- Create and edit strategy logic with time settings and legs.
- Assign execution mode/broker for each strategy.
- Run, stop, or square off positions quickly.
- Monitor strategy status, P&L snapshots, and analysis metrics.
- Manage broker connections through guided setup forms.

## Current feature map (implemented in frontend)
- Authentication (demo/localStorage): register, login, logout, session handling.
- App shell: fixed sidebar navigation + topbar controls.
- Home dashboard: summary cards, table, search/filter UI, row selection.
- Strategy management: list, create/edit, deploy/undeploy flows.
- Analytics page: KPI-focused analysis view.
- Broker page: broker cards and modal setup form variants.
- Theme support: light/dark mode with persistence.

## UX principles inferred from requests
- Modern, minimal, fintech-like UI with strong hierarchy.
- Fast operator actions (run/stop/square off) with confirmations.
- Visual consistency across auth and post-login screens.
- Clear status signaling and safe destructive actions via modal confirmation.

## Domain assumptions
- Flowx must support multi-asset expansion: Indian stocks, derivatives, and forex.
- Paper trading is first-class and should be selectable at runtime.
- Broker selection is strategy-specific and may vary by execution path.
- Backend integration will be added later; current app should remain usable in demo mode.

## Planned backend expectation (from docs)
- Future stack: Spring Boot + PostgreSQL (design documented separately).
- APIs expected for users, strategies, deployments, broker linking, analytics.

## How this file should evolve
- Update this document whenever a new user-visible feature is added or behavior changes.
- Keep sections concise and aligned with actual implemented behavior.
- Add a dated "Recent changes" section once backend/live-trading capabilities begin.
