import teamConfig from "../agents/team.config.json" with { type: "json" };

export type DispatchPlan = { command: string; label: string; agents: typeof teamConfig.agents; brief: string };
export type CommandResult = { ok: true; plan: DispatchPlan } | { ok: false; error: string };

const teamIds = teamConfig.phases.map((phase) => phase.id);
const agentIds = teamConfig.agents.map((agent) => agent.id);

export const commandHelp = [...teamConfig.phases.map((phase) => `/team ${phase.id}`), "/agent <agent-id>", "/full-team", "/help"];

export function parseTeamCommand(input: string): CommandResult {
  const [firstLine = "", ...briefLines] = input.trim().split(/\r?\n/);
  const command = firstLine.trim().toLowerCase().replace(/\s+/g, " ");
  const brief = briefLines.join("\n").trim();
  if (!command || command === "/help") return { ok: false, error: `Commands: ${commandHelp.join(", ")}` };

  let selectedIds: string[];
  let label: string;
  if (command === "/full-team") {
    selectedIds = agentIds;
    label = "Full team";
  } else if (command.startsWith("/team ")) {
    const teamId = command.slice(6).trim();
    const phase = teamConfig.phases.find((candidate) => candidate.id === teamId);
    if (!phase) return { ok: false, error: `Unknown team “${teamId}”. Available teams: ${teamIds.join(", ")}.` };
    selectedIds = phase.agents;
    label = `${teamId[0].toUpperCase()}${teamId.slice(1)} team`;
  } else if (command.startsWith("/agent ")) {
    const agentId = command.slice(7).trim();
    if (!agentIds.includes(agentId as (typeof agentIds)[number])) return { ok: false, error: `Unknown agent “${agentId}”. Available agents: ${agentIds.join(", ")}.` };
    selectedIds = [agentId];
    label = agentId.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
  } else {
    return { ok: false, error: `Unknown command “${firstLine}”. Use /help to see valid commands.` };
  }
  if (!brief) return { ok: false, error: "Add the project brief on the next line so the selected team has work to run." };
  return { ok: true, plan: { command, label, agents: selectedIds.map((id) => teamConfig.agents.find((agent) => agent.id === id)!), brief } };
}
