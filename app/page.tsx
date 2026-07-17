"use client";

import { useState } from "react";

const installCommand = "mkdir -p ~/.codex/skills && cp -R ./design-team-orchestrator ~/.codex/skills/";
const prompt = "Use $design-team-orchestrator to create a launch-page concept for [your product].";

const workflow = [
  ["01", "Define the goal", "Agree on what you’re making, who it’s for, and what could limit the work."],
  ["02", "Build the team", "Choose only the specialists needed to solve the problem."],
  ["03", "Explore ideas", "Give each specialist one clear question and responsibility."],
  ["04", "Review the work", "Check that the ideas are clear, accessible, trustworthy, and practical."],
  ["05", "Choose a direction", "Bring the strongest ideas together into one clear result."],
];

function CopyButton({ value, label = "Copy command" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return <button className="copy" onClick={copy} aria-live="polite">{copied ? "Copied ✓" : label}</button>;
}

export default function Home() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Design Team Orchestrator home"><span>DESIGN</span><span>TEAM</span><span>ORCHESTRATOR</span></a>
        <nav aria-label="Primary navigation"><a href="#install">Install</a><a href="#workflow">How it works</a><a className="nav-cta" href="#install">Start <span aria-hidden="true">↘</span></a></nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Design, orchestrated</p>
            <h1 id="hero-title">Design Team <span>Orchestrator</span><i>.</i></h1>
            <p className="lede">Design Team Orchestrator helps Codex assemble the right specialists, explore in parallel, critique the work, and converge on one coherent direction.</p>
            <div className="actions"><a className="button primary" href="#install">Install the skill <span aria-hidden="true">↓</span></a><a className="button ghost" href="#workflow">See how it works</a></div>
            <p className="proof">Small teams. Clear ownership. One synthesized outcome.</p>
          </div>
        </section>

        <section className="benefits" aria-labelledby="benefits-title">
          <div className="section-head"><p className="eyebrow">What it enables</p><h2 id="benefits-title">More perspective.<br/>Less design-by-committee.</h2></div>
          <div className="benefit-grid">
            <article><span>01</span><h3>Staff for the decision</h3><p>Codex selects the smallest useful team—typically two or three specialists—based on the brief.</p></article>
            <article><span>02</span><h3>Explore in parallel</h3><p>Research, interaction, visual, content, accessibility, and feasibility work can advance at the same time.</p></article>
            <article><span>03</span><h3>Converge with intent</h3><p>A critique surfaces gaps. The Design Director delivers one direction—not disconnected reports.</p></article>
          </div>
        </section>

        <section className="install" id="install" aria-labelledby="install-title">
          <div className="install-intro"><p className="eyebrow dark">Install / 3 steps</p><h2 id="install-title">Add the skill.<br/>Open the room.</h2><p>Skills are local folders Codex can read. Keep the complete folder together, including its references.</p></div>
          <ol className="steps">
            <li><span>01</span><div><h3>Get the skill folder</h3><p>Download the complete <code>design-team-orchestrator</code> folder, including <code>SKILL.md</code>, its role references, and Codex metadata.</p><a className="download-skill" href="/downloads/design-team-orchestrator.zip" download>Download skill folder <span aria-hidden="true">↓</span><small>ZIP · ready to install</small></a></div></li>
            <li><span>02</span><div><h3>Place it in your skills directory</h3><p>With the skill folder in your current directory, run:</p><div className="codeblock"><code>{installCommand}</code><CopyButton value={installCommand}/></div><p className="path">Final location: ~/.codex/skills/design-team-orchestrator/SKILL.md</p></div></li>
            <li><span>03</span><div><h3>Start a new Codex turn</h3><p>Ask Codex to use the skill for a product, UX, UI, brand, service, content, or design-system brief.</p><div className="try"><small>TRY IT</small><code>{prompt}</code><CopyButton value={prompt} label="Copy prompt"/></div></div></li>
          </ol>
          <aside className="review-note"><b>Review before you install.</b> The skill directs Codex’s workflow; it does not install software or contact external services by itself.</aside>
        </section>

        <section className="workflow" id="workflow" aria-labelledby="workflow-title">
          <div className="section-head"><p className="eyebrow">The workflow</p><h2 id="workflow-title">Explore many ideas.<br/>Choose one clear direction.</h2></div>
          <ol className="workflow-list">{workflow.map(([n,title,body]) => <li key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
        </section>

        <section className="trust" aria-labelledby="trust-title">
          <div><p className="eyebrow dark">Control stays with you</p><h2 id="trust-title">Not more output.<br/>Better decisions.</h2><p>The orchestrator coordinates temporary specialist agents inside Codex. It makes material assumptions visible and keeps final judgment with the Design Director.</p></div>
          <ul><li><b>Local and inspectable</b><span>The workflow lives in plain-text files you can review.</span></li><li><b>Scoped by the brief</b><span>Every specialist receives a bounded assignment.</span></li><li><b>Honest about uncertainty</b><span>Evidence, assumptions, and risks stay distinct.</span></li><li><b>Accessible by design</b><span>Critique includes clarity, inclusion, and failure states.</span></li></ul>
        </section>

        <section className="closing"><p className="eyebrow">The next practice</p><h2>The future of design work is a team that forms around the problem.</h2><p>Install the skill, bring a real brief, and let Codex assemble the perspectives it needs.</p><a className="button primary" href="#install">Install Design Team Orchestrator <span aria-hidden="true">↑</span></a></section>
      </main>
      <footer><span>Design Team Orchestrator</span><span>A local Codex skill / 2026</span></footer>
    </div>
  );
}
