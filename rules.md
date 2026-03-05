# Cursor Development Rules

## 1. Plan Mode by Default

* Enter **plan mode** for any **non-trivial task** (3+ steps or architectural decisions).
* If something goes wrong, **STOP and re-plan immediately** — do not keep pushing forward blindly.
* Use **plan mode for verification steps**, not only for building features.
* Write **detailed specifications upfront** to reduce ambiguity.

---

## 2. Subagent Strategy

* Use **subagents liberally** to keep the main context window clean.
* Offload **research, exploration, and parallel analysis** to subagents.
* For complex problems, **increase compute by spawning multiple subagents**.
* Assign **one task per subagent** to maintain focused execution.

---

## 3. Self-Improvement Loop

After **any correction from the user**:

1. Update `tasks/lessons.md` with the mistake pattern.
2. Write **rules to prevent the same mistake again**.
3. Continuously refine these lessons until the **mistake rate drops**.
4. At the start of every session, **review relevant lessons for the project**.

---

## 4. Verification Before Completion

Never mark a task as **complete** without proving it works.

Verification checklist:

* Compare **behavior before and after changes** when relevant.
* Run **tests and validations**.
* Check **logs and system outputs**.
* Demonstrate correctness.

Ask yourself:

> “Would a staff engineer approve this?”

---

## 5. Demand Elegant Solutions (Balanced)

For **non-trivial changes**:

Pause and ask:

> “Is there a more elegant way to solve this?”

If the solution feels **hacky**:

* Reconsider the approach.
* Implement a **cleaner and more maintainable design**.

However:

* **Do not over-engineer** simple problems.
* Balance **simplicity and elegance**.

---

## 6. Autonomous Bug Fixing

When given a **bug report**:

* **Fix it directly** without asking for unnecessary guidance.
* Investigate using:

  * Logs
  * Error messages
  * Failing tests
* Identify the **root cause** and resolve it.

Goals:

* No unnecessary context switching for the user.
* Fix **failing CI tests automatically when possible**.

---

# Task Management Workflow

## 1. Plan First

Write a detailed plan in:

tasks/todo.md

Use **checkable items**.

Example:

* [ ] Define requirements
* [ ] Design architecture
* [ ] Implement feature
* [ ] Add tests
* [ ] Verify logs
* [ ] Final validation

---

## 2. Verify the Plan

Confirm the plan before starting implementation.

---

## 3. Track Progress

Mark tasks complete as work progresses.

---

## 4. Explain Changes

At each step provide:

* A **high-level explanation** of what changed.
* The **reason behind the change**.

---

## 5. Document Lessons

After finishing work:

* Add a **review section** to `tasks/todo.md`.
* Record learnings in:

tasks/lessons.md

---

## 6. Capture Results

After corrections or improvements:

* Update `tasks/lessons.md`.
* Document patterns that should **never repeat again**.

---

# Core Principles

## Simplicity First

* Make every change **as simple as possible**.
* Minimize code impact.

---

## No Laziness

* Always find the **root cause**.
* Avoid temporary fixes.
* Maintain **senior developer standards**.

---

## Minimal Impact

* Only change **what is necessary**.
* Avoid introducing **new bugs or complexity**.
