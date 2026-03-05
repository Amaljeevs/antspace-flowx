## Lessons Learned

### 2026-03-05 - UI parity and theme validation
- Mistake pattern: Declared UI updates complete before visual parity was strong enough on key screens.
- Prevention rule: For UI tasks, always update at least one primary post-login screen (not only auth) and verify theme behavior there.
- Prevention rule: Ensure theme toggle is accessible on all relevant flows (including unauthenticated screens) so users can validate quickly.
- Validation checklist:
  - Confirm `data-theme` toggles correctly on `<html>`.
  - Verify both login and app-shell surfaces visibly change between light and dark.
  - Build succeeds after UI/theme changes.

### 2026-03-05 - Home screen visual mismatch
- Mistake pattern: Sidebar and home table layout did not include the complete menu set and structure expected from the provided reference.
- Prevention rule: For reference-driven pages, match menu inventory and table column structure before polishing details.
- Validation checklist:
  - Sidebar includes Home, Strategy, Analysis, Signals, Broker, Plans, Profile.
  - Home has top summary cards, right-aligned search/filter controls, and a full strategy table layout.

### 2026-03-05 - Domain specific feature parity
- Mistake pattern: Initial screens looked modern but did not include domain-critical actions (deploy/undeploy and broker-specific setup requirements).
- Prevention rule: For trading app UI requests, implement core domain interactions, not just styling.
- Validation checklist:
  - Strategy cards support Deploy/Un-Deploy with status persistence.
  - Create Strategy includes options/futures oriented controls and day execution chips.
  - Analysis and Broker pages mirror referenced information density and workflows.

### 2026-03-05 - Branding font precision
- Mistake pattern: Misinterpreted requested branding font keyword (phonk vs prior placeholder font).
- Prevention rule: When user names a specific font-family string, use that exact family declaration and update all brand class usages consistently.

### 2026-03-05 - Navigation context and icon quality
- Mistake pattern: Kept a static page title in topbar and used emoji placeholders in sidebar, reducing app-level context and visual polish.
- Prevention rule: For dashboard-style apps, prefer route-aware breadcrumbs/section labels and proper vector icons over emoji.
- Validation checklist:
  - Topbar label reflects current route section.
  - Sidebar uses consistent SVG iconography for all navigation entries.
