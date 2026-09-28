# EKANI walkthrough: presenter and implementation guide

The public `/demo/` page is an interactive, illustrative walkthrough with anonymous sample records. It explains three workflows; it is not a capture or replica of the authenticated product interface. No messages, invoices or payments are created by the walkthrough.

**Publication is pending the website PR process.** Preview the branch locally until its PR is reviewed and merged. Do not treat `https://thalirone.com/demo/` as published merely because the page exists in this branch. Generated `docs/` files must come from `node build.mjs`; never push directly to `main`.

**Open EKANI CRM** links to the official [EKANI sign-in page](https://app.ekanicrm.com/login). An account is required. This change does not provide a live demo account, demo tenant, credentials or authenticated product session.

## A seven-minute sales call

Start with the customer's work and the point where it gets stuck. The timings below cover all three journeys; lead with the most relevant one and keep the other two brief when the customer has a clear priority.

| Time | Action |
| --- | --- |
| 0:00–1:00 | Ask what they sell or service, where enquiries arrive, and which follow-ups are hardest to keep track of. State that the page uses illustrative sample data. Enter **Presenter view**. |
| 1:00–3:00 | **Quote and deliver a job**: Enquiry → Quote → Project → Payment record. Relate the sample AC installation to their work. Ask how scope is agreed, how stages are tracked, and where payment is recorded. Describe payment recording without promising bank reconciliation. |
| 3:00–4:15 | **Handle a service request**: Request → Assignment → Progress → Customer history. Ask how a request reaches an engineer and how the next person finds the previous service context. |
| 4:15–5:30 | **Coordinate the team's day**: Capture → Assign → Day plan → Update. Use one familiar next action and ask who owns it, how it reaches the day's plan, and how completion becomes visible. |
| 5:30–6:30 | Exit presenter view and use the module groups to discuss the relevant scope. Consult [current EKANI plans](https://ekanicrm.com/pricing) for plan details. Open the actual CRM only if the isolated demo account and relevant real workflows have already been verified as described below. |
| 6:30–7:00 | Repeat the customer's main problem and agree which actual workflow to demonstrate next. Copy the most relevant step link for the customer, or offer the printed guide. Use **Get an EKANI demo** for the existing WhatsApp enquiry handoff. |

## Presenter controls and sharing

- Select a workflow across the top and select any of its four steps. **Previous**, **Next step** and **Start again** stay within the selected workflow; start again returns to its first step.
- **Presenter view** hides the surrounding site content. **Exit presenter view** or **Esc** restores it. **Conversation prompts** opens the optional presenter notes for the current step.
- After a step is selected, its heading receives focus. With focus on the walkthrough content, **← / →** moves between steps and **Home / End** selects the first or last step. These shortcuts do not intercept typing or the keyboard behaviour of buttons, links or the notes control. Use **Tab** and **Enter/Space** for those controls.
- **Copy link** copies the current page URL with the selected step fragment. If clipboard access fails, a selected text field appears for manual copying. Browser back/forward also restores selected steps. Copying from a local preview produces a local preview URL; use the published URL for recipients after release.
- Example fragments are `/demo/#installation-quote`, `/demo/#service-assignment` and `/demo/#team-day-plan`. They select that specific step when opened with JavaScript enabled.
- **Print guide** opens the browser print dialog and includes all three journeys and all twelve steps. Presenter notes and interactive controls are omitted. Without JavaScript, all twelve steps remain readable and the workflow/step links still work as page anchors.

## Module scope and evidence limits

The workflow wording lives in `DEMO` in `src/config.mjs`. Existing EKANI descriptions in that file support Leads & CRM, WhatsApp, Books, Projects, Service & AMC, Inventory, Purchasing, Finance, Planner and AI Suite. The [official pricing page](https://ekanicrm.com/pricing), checked on 26 September 2026, also lists **Planner Team** and describes assignment to one or many team members. Recheck current plan inclusion before a customer demonstration.

The three journeys illustrate these modules:

| Journey | Modules shown |
| --- | --- |
| Quote and deliver a job | WhatsApp, Leads & CRM, Books, Projects |
| Handle a service request | WhatsApp, Service & AMC, Leads & CRM |
| Coordinate the team's day | Planner Team |

The module overview also names Inventory, Purchasing, Finance, Planner and AI Suite; there are no interactive walkthroughs of those modules on this page. Public descriptions establish the scope of this presentation, not proof that a particular tenant, permission set, plan or end-to-end application workflow has been tested. Sample statuses, fields and records explain the sequence and must not be presented as exact application screens. Confirm the actual behaviour in the product before showing it live. Do not add claims about automatic bank reconciliation, unverified integrations, trials, customer counts, security certification or guaranteed outcomes.

## TODO for Claude Code: prepare an actual product demonstration

This is backend/product work and is not implemented by the public website change.

1. **TODO — Provision an isolated demo tenant and account.** Keep it separate from production customer data and use only fictional sample customers, team members and records. Share access through the appropriate secure account process; do not put credentials in this repository or public page.
2. **TODO — Create and verify a repeatable seed/reset procedure.** Restore the sample data to a known starting state before each demonstration. Limit any reset to the isolated demo tenant and verify that production data cannot be affected.
3. **TODO — Prevent external side effects.** Keep outbound WhatsApp, Telegram, SMS, email and other external messages disabled for demo actions. Prevent payment writes, charges, live invoice delivery and other changes to production or external financial systems. Any illustrative billing records must remain isolated demo data. Verify the controls before screen sharing.
4. **TODO — Verify the actual workflows from beginning to end.** Test enquiry/lead → quote → project → invoice/payment record; service request → engineer assignment → progress → customer history; and task capture → assignment → day plan → completion. Check the required modules, plan, permissions and actual UI on that tenant. Record what passed, what is unavailable and what still needs implementation; never substitute the public walkthrough for this verification.
5. **TODO — Rehearse the live screen share.** Confirm sign-in, fresh seed data, visible records and side-effect controls. Show only workflows that passed verification. If the real flow is unavailable, continue with the clearly labelled public illustration and arrange the product demonstration after it is ready.

No visitor-facing copy or backend changes are introduced by this guide. Any subsequent website changes still require a reviewed PR and regenerated `docs/` output.
