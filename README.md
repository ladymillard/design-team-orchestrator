# Design Team Orchestrator

`$design-team-orchestrator` is a local Codex skill that assembles a temporary team of design specialists around a brief. Codex acts as the Design Director: it frames the assignment, gives each specialist a bounded responsibility, coordinates parallel exploration, critiques the work, and synthesizes one coherent recommendation or artifact.

The specialists provide focused evidence and options. They do not replace final judgment; the Design Director—and ultimately the user—decides what ships.

## What it does

- Extracts the desired outcome, audience, context, deliverables, constraints, and material assumptions from a brief.
- Selects the smallest useful team, normally two or three specialists, without duplicating perspectives.
- Delegates independent questions such as research, interaction, visual direction, content, accessibility, or technical feasibility.
- Runs compatible work in parallel while keeping dependent tasks sequential.
- Uses an independent critique pass for consequential design work.
- Resolves conflicts and returns one synthesized direction instead of concatenated specialist reports.
- Keeps work scoped, inspectable, evidence-aware, and under the Design Director's control.

## Workflow

1. **Define the goal** — clarify the outcome, audience, context, deliverables, constraints, and decisions that need confirmation.
2. **Build the team** — choose only the roles needed for the brief and preserve a concurrency slot for the Design Director.
3. **Explore** — assign each specialist a concrete decision, evidence, deliverables, constraints, and file boundaries.
4. **Critique** — evaluate clarity, brief and brand fit, accessibility, edge cases, trust, feasibility, and implementation risk.
5. **Converge** — the Design Director weighs the evidence, resolves contradictions, and delivers the smallest useful final package.

If agent spawning is unavailable, the skill simulates the same roles sequentially and discloses the limitation. If a specialist fails, the Design Director continues with the available evidence or reassigns the work once.

## Installation

Download the [installable skill bundle](public/downloads/design-team-orchestrator.zip), extract the complete `design-team-orchestrator` folder, and keep `SKILL.md`, `references/`, and `agents/` together.

With that folder in your current directory, copy it into your local Codex skills directory:

```bash
mkdir -p ~/.codex/skills && cp -R ./design-team-orchestrator ~/.codex/skills/
```

The installed entry point should be:

```text
~/.codex/skills/design-team-orchestrator/SKILL.md
```

Start a new Codex turn after installing the skill.

## Usage

Invoke the skill by name and provide a design brief in natural language:

```text
Use $design-team-orchestrator to [design task].
```

This is prompt syntax, not a shell command or standalone CLI. Stronger briefs include the audience, desired outcome, platform, constraints, source evidence, and required deliverables.

### AUTO staffing

AUTO is the default usage pattern: describe the problem and let the Design Director select the smallest team that covers the decisions in the brief.

```text
Use $design-team-orchestrator to design the onboarding experience for a community savings app. Make joining or creating a circle feel simple and trustworthy.
```

The skill may draw from product strategy, UX research, interaction design, visual design, content design, design systems, accessibility and inclusive design, design engineering, and brand strategy.

### DIRECTED staffing

DIRECTED usage lets you request particular perspectives when the assignment or review process requires them. The Design Director still owns scope, sequencing, synthesis, and final quality.

```text
Use $design-team-orchestrator with an interaction designer, content designer, and accessibility reviewer to redesign our checkout flow. Include empty, error, and recovery states.
```

AUTO and DIRECTED are prompt-level staffing modes documented here for clarity; they are not separate executable commands.

## Example prompts

```text
Use $design-team-orchestrator to create a launch-page concept for [your product].
```

```text
Use $design-team-orchestrator to create three distinct homepage directions, critique them, and refine the strongest direction.
```

```text
Use $design-team-orchestrator to audit this design system for consistency, accessibility, responsive behavior, and governance gaps.
```

```text
Use $design-team-orchestrator with a brand strategist, visual designer, and content designer to develop a launch direction for [brand].
```

These are prompt examples, not additional repository commands.

## Supported design work

- product concepts and product strategy
- UX, UI, navigation, onboarding, and task flows
- websites, apps, services, and launch experiences
- brand positioning, visual direction, and campaigns
- information architecture, content design, and microcopy
- design systems, reusable components, and responsive behavior
- design audits, accessibility reviews, and inclusive-design critique
- implementation planning, prototyping, and design-engineering feasibility

## Principles and guardrails

- **Staff for the decision.** Use the smallest effective team; do not spawn agents for trivial work or duplicate roles.
- **Bound every assignment.** Specialists receive a clear question, deliverables, constraints, evidence, and file ownership.
- **Separate evidence from assumptions.** Specialists report both, along with risks and recommendations; research findings are never fabricated.
- **Explore before converging.** Independent perspectives may run in parallel, but dependent work stays sequential.
- **Critique before commitment.** Consequential work is checked for task clarity, accessibility, inclusion, edge cases, trust, and feasibility.
- **Synthesize; do not aggregate.** The final response is one reasoned direction, not a stack of agent reports or a vote.
- **Protect shared work.** A specialist may edit shared files only with exclusive ownership; the Design Director performs or verifies the final merge.
- **Prefer safer design.** Unsafe, deceptive, or inaccessible requests are surfaced and redirected.
- **Keep control human.** Temporary specialists advise. The Design Director makes the tradeoffs, and the user retains final judgment.

## Repository structure

```text
.
├── app/                                  # Product website (Next.js/React)
├── public/
│   └── downloads/
│       └── design-team-orchestrator.zip # Installable skill bundle
├── tests/                                # Rendered-site verification
├── worker/                               # Cloudflare worker entry point
├── db/                                   # Drizzle/D1 schema and helpers
├── examples/d1/                          # Optional D1 example surface
├── build/                                # Site build integration
├── .openai/hosting.json                  # Sites project and binding metadata
├── package.json                          # App scripts and dependencies
├── vite.config.ts                        # vinext/Vite configuration
└── README.md
```

The downloadable ZIP contains the skill itself:

```text
design-team-orchestrator/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── brief-template.md
    └── roles.md
```

## Local development

The repository includes a product website built with vinext, Next.js, React, TypeScript, Tailwind CSS, and Cloudflare tooling. Node.js `>=22.13.0` is required.

```bash
npm install
npm run dev
```

Available project scripts:

- `npm run dev` — start local development.
- `npm run build` — create the vinext build output.
- `npm start` — start the built app.
- `npm test` — build the app and run the repository's rendered HTML test.
- `npm run lint` — run ESLint.
- `npm run db:generate` — generate Drizzle migrations after schema changes.

The site does not use `wrangler.jsonc`. Its declared local bindings are handled through `.openai/hosting.json` and `vite.config.ts`; the database schema in `db/schema.ts` is intentionally empty, while `examples/d1/` provides the optional D1 example.

> **Contributor note:** the checked-in rendered HTML test still targets the original starter content and needs to be updated before it can verify the current product page.

## Final responsibility

`$design-team-orchestrator` coordinates temporary specialist agents; it does not turn design into an autonomous committee. Specialists investigate and recommend. The Design Director owns the brief, staffing, critique, synthesis, and quality, while the user keeps final authority over the direction and any resulting implementation.
