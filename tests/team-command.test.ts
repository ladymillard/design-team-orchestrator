import assert from "node:assert/strict";
import test from "node:test";
import { parseTeamCommand } from "../app/team-command.ts";

test("resolves configured teams", () => {
  const result = parseTeamCommand("/team build\nShip the research assistant");
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.plan.agents.map((agent) => agent.id), ["agent-architecture-engineering", "persona-behavior-design", "data-model-operations", "design", "platform-infrastructure"]);
});
test("resolves an individual agent and the full team", () => {
  const agent = parseTeamCommand("/agent security-privacy\nReview the auth design");
  const full = parseTeamCommand("/full-team\nPlan the release");
  assert.equal(agent.ok && agent.plan.agents[0].id, "security-privacy");
  assert.equal(full.ok && full.plan.agents.length, 15);
});
test("rejects unknown selections and missing briefs", () => {
  const unknown = parseTeamCommand("/team mystery\nBrief");
  const missing = parseTeamCommand("/team gate");
  assert.match(unknown.ok ? "" : unknown.error, /Unknown team/);
  assert.match(missing.ok ? "" : missing.error, /project brief/);
});
