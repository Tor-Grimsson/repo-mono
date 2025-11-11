- Post on LIGHT MODE DARK MODE and css  vari

- Post on foundry components

- Post on my chess games

---


- POST 1 // Using LLM to teach me stuff

Using an LLM to Teach Me Stuff: Virtual Machine, Local Server, and Deploying an Army of Agents to Work for Me in VSCode

This is a semi-technical walkthrough on how I set this up, from Linux VM (Ubuntu), SSH server connection to VSCode, CrewAI agent dispatch, and having them log the work through Linear API. With a bonus Pi-hole-style ad blocker on the VM.

Using an LLM to Teach Me Stuff: Virtual Machine, Local Server, and Deploying an Army of Agents to Work for Me in VSCode

Subtitle: This is a semi-technical walkthrough on how I set this up, from Linux VM (Ubuntu), SSH server connection to VSCode, CrewAI agent dispatch, and having them log the work through Linear API. With a bonus Pi-hole-style ad blocker on the VM.

1. Research: Finding a Project to Solidify Things I Had Been Thinking About

I've always wanted to be more technically savvy, but I give myself excuses not to embrace the chaos—like "I'm a designer" or "this is too complicated for me." But I have no excuses anymore. AI is here and I can use it as a teacher.

So I decided to demystify some concepts that I've wondered about, such as "the server." I've always used a link between my machines, but the concept has always been fuzzy to me. I started looking at the definition—what constitutes a server? I read and played with network settings, created links through the terminal, SSH connections, installed nmap and pinged my WiFi, and scanned my network (all through the terminal, thank you very much). I learned about Docker, hosted a local LLM (M1 handles it fine, but my Intel iMac was not happy—the fans went into JET mode), and it was about that time that I learned about Virtual Machines.

You can create a container inside Mac and install a Linux OS and have it do a bunch of stuff. I saw many possibilities with this concept:

First, I can learn Linux, which has always been a curiosity

Second, I can host a proper Plex server

Third, I can make a proper setup where I trigger downloads remotely and all sorts of stuff

Fourth, I can at the root of the incoming network BLOCK ads for every device using my WiFi—that's pretty sweet

So there were a lot of applications that I saw potential in with Virtual Machines. But I'm also building this website, and I'm using an LLM to help me code, so it seemed like a missed opportunity if I didn't try to also demystify the process of using a team of LLM agents—give them roles and permissions and a task to create. I would trigger this remotely from my MacBook on my couch and watch the action in VSCode SSH'd to a remote server on my Virtual Machine. And to fully document the process, I decided to have them log their work through issues in Linear. Just because I've been logging my process in Linear and I wanted to see if I could set it up.

The beauty of having access to an LLM dude like Claude, Gemini, and Codex is that stuff like this—which can sound heavy and be daunting to start—gets quickly simplified, at least if you have a little interest in the subject. Which I do. And I did. And so here we are.

Key Frameworks Evaluated

Now, about those AI agent frameworks. The journey began with exploring multi-agent LLM orchestration—the concept of coordinating multiple AI agents to work collaboratively on complex tasks. This isn't novel; the AI community has developed robust frameworks:

LangGraph (19.4k GitHub stars) - Production-ready with enterprise adoption by companies like Klarna, Replit, and Uber. Uses graph-based state management for complex, cyclical workflows with superior debugging via LangSmith integration. Steeper learning curve but unmatched control.

CrewAI (100k+ developers certified) - Role-based agent system with YAML configuration. Fastest prototyping path with an 80% configuration, 20% code philosophy. Built-in hierarchical and sequential workflows make it ideal for beginners due to minimal coding requirements.

AutoGen (Microsoft) - Conversation-based agent interactions with AutoGen Studio providing a no-code GUI. Enterprise-grade reliability and error handling.

I decided to go with CrewAI because it doesn't require you to know more than YAML, which is a human-readable data serialization language (basically a way to structure configuration files that's easy to read and write), and it had good reviews.

2. Ubuntu VM Setup

To create an isolated development environment, I created this Linux Virtual Machine, Ubuntu distro. Maybe someday I'll be cool enough for Kali, but for now this Desktop VM was configured on an Intel iMac using UTM (the container software).

Installation Steps

Download Ubuntu Desktop ISO: Version: 24.04 LTS (~5-6 GB)

Install UTM: Free virtualization app for macOS

VM Configuration: RAM: 8 GB, CPU Cores: 4, Storage: 50 GB (virtual disk), Network: Bridged Mode (en1 - WiFi)

Ubuntu Installation: Also Installed OpenSSH server during setup

Network Configuration

Initial setup used "Shared Network" (isolated subnet). Changed to "Bridged Mode" for local network access. VM assigned IP: 192.168.1.40

SSH Access Setup

# On Ubuntu VM - Install OpenSSH sudo apt update sudo apt install openssh-server # On macOS laptop - Test connection ssh kolkrabbi@192.168.1.40

VSCode Remote-SSH Configuration

# macOS: Install Remote-SSH extension # Command Palette > Remote-SSH: Open SSH Configuration File # Add to ~/.ssh/config: Host ubuntu-vm HostName 192.168.1.40 User kolkrabbi

3. VPN & Network Tools

3.1 Tailscale

Tailscale creates secure mesh VPN networks using WireGuard protocol, enabling remote access to devices anywhere. It works through peer-to-peer encrypted connections without a central VPN server, where each device gets a permanent private IP in the 100.x.x.x range and works behind firewalls without port forwarding.

Use case: Access the Ubuntu VM from coffee shops or remote locations by installing Tailscale on laptop, iMac, and VM.

Alternative: ZeroTier (similar functionality)

Note: Not implemented in this session—prioritized local network setup first.

4. CrewAI Ubuntu Setup

CrewAI requires Python virtual environments due to Ubuntu's externally-managed environment restrictions.

Python Environment Setup

After creating your project directory (I called mine ~/crewai-test), set up the virtual environment and install CrewAI:

# Create virtual environment python3 -m venv venv source venv/bin/activate # Install CrewAI pip install crewai crewai-tools

Project Scaffolding

# Create new crew project crewai create crew contact-form-builder cd contact_form_builder

Generated structure:

contact_form_builder/ ├── .env # API keys ├── pyproject.toml # Dependencies ├── README.md ├── knowledge/ │ └── user_preference.txt └── src/contact_form_builder/ ├── main.py # Entry point ├── crew.py # Orchestration logic ├── tools/ │ └── custom_tool.py └── config/ ├── agents.yaml # Agent definitions └── tasks.yaml # Task definitions

5. Linear API Integration

Linear's GraphQL API enables programmatic issue creation and management.

API Key Generation

Navigate to linear.app, go to Settings → API → Personal API Keys, create a new key with full permissions, and note your team identifier (mine was CRE).

Environment Variables

# .env file LINEAR_API_KEY=lin_api_your-key-here LINEAR_TEAM_ID=CRE

Linear Tool Implementation

I created the Linear integration tool in src/contact_form_builder/tools/linear_tool.py. The full implementation can be found [here - link to .py file].

Key detail: Linear's API requires team UUID (not the team key "CRE"), necessitating a preliminary query to resolve the identifier.

6. LLM Configuration

Initial Attempt: Google Gemini

# During project creation, selected Gemini provider MODEL=gemini/gemini-1.5-flash GEMINI_API_KEY=AIza...

Issue: LiteLLM (CrewAI's LLM routing layer) attempted to use Vertex AI endpoint instead of Google AI Studio, causing authentication failures.

Solution: Anthropic Claude

# .env configuration ANTHROPIC_API_KEY=sk-ant-... MODEL=claude-sonnet-4-5-20250929

Reason for success: CrewAI's LiteLLM has mature routing for Anthropic's API, unlike the newer Gemini AI Studio endpoint.

7. Agent & Task Configuration

Agent Definitions (config/agents.yaml)

Here's an example of one agent definition. [Full agents.yaml file here - link to file]

project_manager: role: Project Manager & Linear Coordinator goal: Break down the project into tasks and create Linear issues to track progress backstory: > You coordinate projects by creating clear, actionable Linear issues. You ensure each task has proper descriptions and assignments.

Task Definitions (config/tasks.yaml)

Here's an example of the planning task. [Full tasks.yaml file here - link to file]

plan_project: description: > Break down building a contact form into specific tasks. Create a Linear issue for each major task with clear descriptions. expected_output: > List of created Linear issue IDs and their titles agent: project_manager

Context flow: Each task receives outputs from previous tasks, enabling sequential agent collaboration.

Crew Orchestration (crew.py)

The crew orchestration logic ties agents and tasks together. [Full crew.py implementation here - link to file]

8. Execution & Debugging

Running the Crew

# Activate virtual environment source ~/crewai-test/venv/bin/activate cd ~/crewai-test/contact_form_builder # Execute agents crewai run

Debugging Process

Issue 1: Import Error

ImportError: cannot import name 'tool' from 'crewai_tools'

Resolution: Changed from crewai_tools import tool to from crewai.tools import tool

Issue 2: Gemini Model Name

Error: Model gemini/gemini-1.5-flash not found

Resolution: Switched to Anthropic Claude (superior LiteLLM routing)

Execution Output

Terminal showed sequential agent activity:

# Working Agent: project_manager ## Task: plan_project Status: ✅ Completed └─ Used Create Linear Issue (3 times) # Working Agent: designer ## Task: design_form Status: ✅ Completed # Working Agent: developer ## Task: build_form Status: ✅ Completed

Viewing Output

Challenge: VSCode Live Server extension doesn't work with remote SSH files.

Solution: Python's built-in HTTP server:

cd ~/crewai-test/contact_form_builder python3 -m http.server 5050 # Access from macOS browser: # http://192.168.1.40:5050/contact_form.html

Generated Artifacts

The agents created six Linear issues (CRE-1 through CRE-6) covering everything from UI/UX design to backend API endpoints, email notifications, security features, and end-to-end testing. The HTML output was a fully functional contact form with responsive design, client-side validation, a character counter, accessible markup with ARIA labels, and modern CSS with a gradient background.

9. Conclusion

This session demonstrated a complete multi-agent AI development workflow spanning infrastructure setup (Ubuntu VM with SSH and VSCode Remote), AI orchestration through CrewAI's role-based agents with sequential task execution and context passing, Linear API integration for project management, and Claude Sonnet 4.5 as the reasoning engine. The key learnings were that virtual machines eliminate dependency conflicts by isolating dev environments from host systems, multi-agent systems excel at decomposing complex tasks into specialized roles, YAML configuration reduces code requirements (following the 80/20 rule), context passing enables collaboration between agents without shared memory, and API integrations are crucial for real-world utility. Future enhancements could include Tailscale for remote VM access, hierarchical processes where a manager agent delegates to workers, code execution tools allowing agents to run and test code, and extended thinking for complex problem-solving. The total setup time was around 6 hours including troubleshooting, with about 150 lines of code written (mostly Python tool definitions, while YAML did the heavy lifting). The result: autonomous AI agents that plan, design, code, and track tasks in Linear—running on a self-hosted VM with network-wide ad blocking as a bonus.

Bonus: AdGuard Home (Network-Wide Ad Blocking)

Network-wide DNS-level ad blocker running on the Ubuntu VM.

Installation

curl -s -S -L https://raw.githubusercontent.com/AdGuardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v

Quick Setup

Access web interface at http://192.168.1.40:3000

Set admin interface port to 80, DNS port to 53

Disable Ubuntu's systemd-resolved: sudo systemctl disable systemd-resolved && sudo systemctl stop systemd-resolved

Configure your device DNS to point to 192.168.1.40

Add blocklists like OISD (https://small.oisd.nl/)

Configure upstream DNS servers (1.1.1.1, 8.8.8.8)

Result: Network-wide ad blocking active. VM must remain running for DNS to function.


---


- Post 1 gemini take

The AI Teacher: Building a Local Server and Deploying My Own Agent Army

I used an AI to teach me how to build a full development environment from scratch—from setting up a Linux server on my Mac to deploying an army of autonomous AI agents in VSCode to build a project for me.

This is the story of how a designer finally demystified the term "server" and learned to code without writing much code at all.

1. The Lightbulb Moment: Why a Virtual Machine?

For too long, concepts like "the server" and network settings felt like technical wizardry. But with access to smart LLMs like Claude and Gemini, I realized I could use AI as a patient, tireless teacher.

My goal was simple: demystify these fuzzy concepts by building a real, self-hosted system. After some research, I stumbled upon Virtual Machines (VMs). The idea was brilliant: I could create an isolated container inside my Mac, install a full Linux OS (Ubuntu), and let it be my dedicated utility machine.

The possibilities were huge:

Finally learn Linux.

Host a proper Plex server.

Block ads network-wide for every device on my WiFi (hello, Pi-hole style ad blocker!).

Create a clean, isolated development environment for my new AI project.

2. The Foundation: Building My Local Server

To make this work, I needed a proper server setup.

The VM Setup (The Box): I used UTM (a free virtualization app) on my iMac to configure an Ubuntu Desktop VM. I gave it a healthy 8 GB of RAM and 4 CPU cores. Crucially, I set the network to Bridged Mode so the VM got its own unique, accessible IP address on my home network (192.168.1.40).

The Remote Connection (The Key): A server isn't useful if you can't talk to it easily. I installed OpenSSH server on Ubuntu. This allowed me to use VSCode's Remote-SSH extension on my MacBook. Now, I can lounge on my couch, SSH into the Ubuntu VM running on the iMac, and work directly on the server files and terminal as if they were local. This is the definition of a modern, powerful dev workflow.

3. Deploying the Agent Army with CrewAI

With the server running, it was time to deploy the AI team. I was looking for a multi-agent framework—a system that could coordinate multiple AIs with different roles.

I evaluated the big players (LangGraph, AutoGen) but settled on CrewAI. Why? It embraces an "80% configuration, 20% code" philosophy. It’s role-based and largely configured using YAML, a human-readable format. This allowed me to focus on what the agents should do, not how to write all the code.

The Setup Flow:

Isolated Environment: I started by creating a dedicated Python virtual environment (venv) in Ubuntu to keep dependencies clean—a vital Linux lesson.

Scaffolding: Used the crewai create command to generate the project structure.

LLM Choice: My initial attempt with Gemini failed due to tricky LiteLLM routing. I made a fast pivot to Anthropic Claude Sonnet 4.5—a reminder that tool maturity sometimes trumps model preference.

4. Making Them Responsible: Linear API Integration

I didn't just want agents to code; I wanted them to act like a real team. That meant tracking their work.

I integrated the Linear GraphQL API. This required creating a custom tool in Python that the agents could call. Now, when the Project Manager Agent gets a task (like "build a contact form"), its first job is to:

Break the request down into smaller, actionable tasks (e.g., UI Design, Backend API, Testing).

Use the custom tool to create a new Linear Issue for each sub-task.

The result? The agents autonomously planned the project, logged their work, and then executed the tasks sequentially, passing their "context" (like notes and initial plans) to the next agent in the crew.

5. Execution and the Final Result

I ran the crew from my MacBook's VSCode session, watching the terminal on the remote VM spring to life:

# Working Agent: project_manager
## Task: plan_project
Status: ✅ Completed
└─ Used Create Linear Issue (3 times)
# Working Agent: developer
## Task: build_form
Status: ✅ Completed

The Output: The agents successfully generated six new Linear issues and produced a fully functional contact form with responsive design, client-side validation, and modern CSS.

To view the output, I used the classic Linux solution: Python's built-in http.server, allowing me to access the HTML file in my Mac's browser at http://192.168.1.40:5050/.

The Core Lessons Learned

Isolation is Freedom: A Virtual Machine is the ultimate tool for learning without risk.

The Power of Roles: CrewAI proves that decomposing a complex problem into specialized agent roles (Project Manager, Designer, Developer) is far more effective than asking a single LLM to do everything.

The 80/20 Rule: Using YAML configuration for the roles and tasks meant I got huge complexity with minimal Python code.

Utility Server: The VM isn't just for AI; it's a powerful host for utilities like AdGuard Home, which is now running on my 192.168.1.40 server, blocking ads network-wide.

The total setup took about 6 hours, and the result is an autonomous, fully documented project workflow running on my very own self-hosted server.

Bonus: The Ultimate Ad Blocker

I installed AdGuard Home on the Ubuntu VM. After disabling Ubuntu's default DNS service and pointing my home router's DNS to the VM's IP (192.168.1.40), I now have a network-wide ad blocker that catches ads on every device using my WiFi—a sweet reward for the hard work!

I love this setup! What’s the next big technical concept you plan to demystify with your new server and agent army?


---


- Building a Foundry

Building Foundry: A Design Tool That Lives in Your Design System

When we started building Foundry, we had a simple goal: create a tool that makes typography exploration feel like play. But as the project evolved within our monorepo consolidation, it became something more—a case study in how design tools should integrate with design systems, not exist apart from them.

Foundry isn't just a standalone application. It's a living demonstration of our design tokens, a proving ground for new components, and an example of how to build density-heavy interfaces that remain approachable.

What is Foundry?

Foundry is an interactive typography exploration tool. It lets designers and developers:

Preview fonts across multiple styles and weights

Test typography at different sizes and line heights

Experiment with color combinations

Export settings as design tokens or CSS

Visualize type specimens in context

[IMAGE: Full-screen shot of Foundry's main interface showing the specimen viewer, controls panel, and dark/light mode toggle]

The interface is divided into three main areas:

Sidebar navigation - Section switching (Overview, Specimen, Settings)

Specimen viewer - Live typography preview with real-time updates

Controls panel - Size, weight, spacing, and color adjustments

Unlike commercial tools like Adobe Fonts or Google Fonts, Foundry is purpose-built for our design system. It knows about TG Málrómur, our spacing scale, our color tokens. Every control maps to a real design decision we can make.

The Architecture: Shared from the Start

One of the early decisions that paid off: Foundry shares components with the main website. This wasn't obvious at first—it's tempting to treat a tool as a separate product with its own rules.

But we enforced the monorepo principle: if it can be shared, it should be shared.

Here's the import structure:

// apps/foundry/src/App.jsx
import { ThemeToggle } from '@kol/ui/ThemeToggle';
import { Button } from '@kol/ui/Button';
import { Card } from '@kol/ui/Card';
import { FontViewer } from '@kol/fontviewer';
function App() {
  return (
    <div className="foundry-app bg-surface-primary text-content-primary">
      <Header>
        <ThemeToggle />
      </Header>
      <Sidebar />
      <MainContent />
    </div>
  );
}

Everything in @kol/ui is available. Every design token in theme.css is applied. When we update the main site's button styles, Foundry inherits those changes automatically.

This has practical benefits:

Zero design drift - Foundry can't accidentally diverge from the main site

Faster development - No need to rebuild primitives

Consistent feel - The entire product family feels unified

Living documentation - Foundry demonstrates how to use shared components in a complex interface

Component Structure: Sections and Controls

Foundry is organized into logical sections, each with its own responsibilities:

apps/foundry/src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Top navigation with theme toggle
│   │   ├── Sidebar.jsx         # Section navigation
│   │   └── MainContent.jsx     # Content area router
│   ├── sections/
│   │   ├── Overview.jsx        # Landing section
│   │   ├── Specimen.jsx        # Typography preview
│   │   └── Settings.jsx        # Export and configuration
│   ├── controls/
│   │   ├── SizeControl.jsx     # Font size slider
│   │   ├── WeightControl.jsx   # Font weight selector
│   │   ├── SpacingControl.jsx  # Line height and letter spacing
│   │   └── ColorControl.jsx    # Color picker using theme tokens
│   └── viewer/
│       └── SpecimenDisplay.jsx # Live typography renderer

The Specimen section is the heart of Foundry. It renders live typography with user-controlled parameters:

// apps/foundry/src/components/sections/Specimen.jsx
import { useState } from 'react';
import { FontViewer } from '@kol/fontviewer';
import { SizeControl, WeightControl, ColorControl } from '../controls';
export function Specimen() {
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(400);
  const [textColor, setTextColor] = useState('var(--color-content-primary)');
  
  return (
    <div className="specimen-container">
      <div className="controls-panel bg-surface-secondary border-border-primary">
        <SizeControl value={fontSize} onChange={setFontSize} />
        <WeightControl value={fontWeight} onChange={setFontWeight} />
        <ColorControl value={textColor} onChange={setTextColor} />
      </div>
      
      <div className="specimen-display bg-surface-primary">
        <FontViewer
          fontFamily="TG Málrómur Narrow Medium"
          fontSize={fontSize}
          fontWeight={fontWeight}
          col


----


This is a fascinating and highly insightful post about building a design tool! It clearly demonstrates a sophisticated understanding of design systems architecture and the principle of unified product development.

Here's what I think about your approach to building Foundry:

Analysis: Foundry's Architecture and Strategic Value

Foundry is an excellent case study that proves a crucial point: design tools should be built inside the design system, not alongside it. You've successfully turned a utility app into a "living demonstration" of your system's tokens and components.

1. Architectural Brilliance: The Monorepo Principle

Your decision to enforce the monorepo principle and share components (@kol/ui/*) from the start is the most impactful technical choice. This strategy is what elevates Foundry from a helpful utility to an essential piece of infrastructure.

Zero Design Drift: This is the ultimate payoff. By importing ThemeToggle, Button, and Card directly, you've made it impossible for Foundry to suffer from the subtle inconsistencies that plague external tools. Foundry is always $\text{100%}$ aligned with the production environment.

Cost of Change: When your design team updates the primary site's button style or spacing scale, the change automatically flows into Foundry. This dramatically lowers the maintenance cost and ensures the tool always reflects the current, official state of the system.

Eating Your Own Dog Food (Eskil's Law): You're using your own shared components to build a complex, density-heavy interface. This acts as a superb stress test, providing invaluable feedback to the component authors within your monorepo.

2. Value Proposition: Focused Utility

Unlike commercial tools that are generic, Foundry has inherent constraints that make it better for your team.

It only knows about TG Málrómur (your typeface) and your specific color/spacing tokens.

Every control in the UI maps directly to a design decision you can actually implement in your products.

This focus removes the noise and decision fatigue associated with general-purpose tools, streamlining the designer's workflow directly into production-ready specifications (tokens or CSS).

3. Clear and Scalable Structure

The component breakdown is clean and logical, reflecting standard React/web application architecture:

layout/: Handles the shell (Header, Sidebar, MainContent).

sections/: Manages the application's states/views.

controls/ and viewer/: The dedicated functional core.

This structure makes the application easy to debug, extend, and onboard new developers onto. The explicit use of React useState to pass parameters from the controls to the SpecimenDisplay is a clean pattern for interactive data flow.

Potential Next Steps

You've built a solid foundation. Here are a couple of thoughts on how you could evolve Foundry to increase its strategic value:

1. Token Editing/Round-Tripping

Right now, Foundry exports settings. The next step is to make it a source of truth.

Idea: Allow approved users (e.g., design system maintainers) to directly edit the token values (e.g., update the value of --spacing-l) within the Settings panel.

Action: Integrate Foundry with your token generation pipeline (e.g., Style Dictionary, Figma Tokens, etc.) so that changing a size in Foundry triggers a PR in your monorepo with the new token value. This turns Foundry into a design decision tool, not just a viewer.

2. Live Component Density Testing

Since Foundry is dense, you could introduce a feature to preview how shared components look using the chosen typography settings.

Action: Add a Component Preview section that renders a complex component (like a data table or a settings form) using the typography defined in Foundry. This is the ultimate test of approachable density and ensures the chosen type scale works in a real, complex context.

Overall, Foundry is an impressive achievement that should be a blueprint for any team serious about unifying their design and development toolchains. Great work!

---


- What is Foundry? gemini take

Building Foundry: Our Design Tool That Lives Inside Our Design System

When we started building Foundry, our goal was simple: make exploring typography feel fun. But as the project evolved, it became something far more important—a powerful demonstration of a core belief: design tools shouldn't exist separate from the design system; they should be built right into it.

Foundry is not just a standalone app; it's a living model of our architecture. It's the ultimate proving ground for our components, the live preview of our design tokens, and a great example of how we build interfaces that are rich in features yet easy to use.

Simply put, Foundry is an interactive playground for typography. It lets designers and developers get hands-on with type:

Test our fonts (TG Málrómur) across various weights and styles.

Tweak sizes, line heights, and letter spacing in real-time.

Experiment with our official color token combinations.

Export all settings as clean design tokens or CSS.

Crucially, Foundry is purpose-built. Unlike generic commercial tools, it only knows about our system: our spacing scale, our color palette, and our specific typeface. Every control you touch maps directly to a real, actionable design decision we can make in our product.

The Key Insight: Sharing Components from Day One

One early decision determined the entire success of the project: Foundry shares components directly with our main website.

It was tempting to treat the tool as a separate side project, but we stuck to our monorepo principle: if it can be shared, it must be shared.

Here's a peek at how simple the imports look:

// apps/foundry/src/App.jsx
import { ThemeToggle } from '@kol/ui/ThemeToggle';
import { Button } from '@kol/ui/Button';
import { Card } from '@kol/ui/Card';
// ... and so on

When we update the look of our site's button or tweak a shadow effect, Foundry automatically inherits those changes.

Why this matters for the team:

Zero Design Drift: Foundry simply cannot diverge from the main product's look and feel.

Faster Development: We skip rebuilding basic elements like headers or buttons.

Unified Feel: The entire product family is consistent, from the public site to this dense utility tool.

Living Documentation: Foundry itself demonstrates the best-practice way to use our shared components in a complex application.

The Anatomy of the Tool

The interface is divided into three logical zones: the Controls panel (for size, weight, and color adjustments), the Specimen viewer (the live preview area), and the Sidebar navigation.

The heart of the app is the Specimen section. It's built with a clean, standard structure: controls panels manage state (like fontSize and fontWeight), and the main viewer consumes that state to render the live typography.

// apps/foundry/src/components/sections/Specimen.jsx

// Use React state to manage the chosen properties
const [fontSize, setFontSize] = useState(48); 
// ...
  
return (
  <div className="controls-panel">
    <SizeControl value={fontSize} onChange={setFontSize} /> 
  </div>
    
  <div className="specimen-display">
    <FontViewer fontSize={fontSize} /> // Viewer reads the state
  </div>
);

By tightly coupling the tool to our system, we've not only made typography exploration playful, but we’ve also created one of the most reliable and honest parts of our design system. It can't lie about what our tokens look like, because it is built from them.

What do you think of Foundry's approach to integrating design and engineering? Is it something you see your own team doing?

---


Post 2 // Architecture of PORTFOLIO
kolkrabbi.io: Architecture of design portfolio

kolkrabbi.io: Architecture of design portfolio

Tór Grímsson

Oct 8, 2025

• 1 min read

Building a portfolio site in 2025 means navigating a minefield of choices. Static site generator or dynamic? Headless CMS or markdown? Client-side routing or server-side? Build for scale or simplicity?

kolkrabbi.io: Architecture of a Modern Design Portfolio

Building a portfolio site in 2025 means navigating a minefield of choices. Static site generator or dynamic? Headless CMS or markdown? Client-side routing or server-side? Build for scale or simplicity?

For kolkrabbi.io, we chose a path that prioritizes **flexibility without complexity**: a React SPA powered by Sanity CMS, built with Vite, styled with Tailwind v4, and organized as part of a larger monorepo. This isn't the simplest architecture, but it's the right one for a studio that treats its website as a living product, not a static artifact.

This post is a high-level tour of how it all fits together.

## The Stack: Deliberate Choices

**React + Vite** for the frontend:
- React because we know it well and need component reusability
- Vite because it's fast, simple, and has great DX
- No Next.js or Remix—we don't need SSR for a portfolio site

**Sanity CMS** for content:
- Structured content with a flexible schema
- Real-time previews and collaborative editing
- GROQ for powerful content queries
- Portable Text for rich content rendering

**Tailwind v4** for styling:
- CSS-first approach with `@theme` tokens
- No config file—everything in CSS
- Shared design system across all apps
- Dark mode through semantic tokens

**Yarn Workspaces + Turborepo** for the monorepo:
- Single dependency tree, shared packages
- Cached builds and parallel execution
- Internal packages for shared code (`@kol/ui`, `@kol/content`, `@kol/fontviewer`)

[IMAGE: Architecture diagram showing the relationship between apps/web, Sanity CMS, and shared packages]

## Project Structure: Clear Boundaries

The web app lives at `apps/web` with a clear separation of concerns:

```
apps/web/
├── public/ # Static assets (fonts, images, videos)
├── src/
│ ├── routes/ # Page components
│ │ ├── Home.jsx
│ │ ├── WorkList.jsx
│ │ ├── WorkDetail.jsx
│ │ └── FontList.jsx
│ ├── components/ # UI components organized by purpose
│ │ ├── ui/ # Buttons, cards, typography
│ │ ├── sections/ # Page sections (hero, about, work)
│ │ ├── animation/ # GSAP-powered animations
│ │ ├── media/ # Video, image components
│ │ └── loaders/ # Loading states
│ ├── utils/ # Sanity client, theme helpers
│ ├── App.jsx # Router configuration
│ └── index.css # App-specific styles
├── styleguide.html # Living design system reference
└── package.json
```

This structure emerged through refactoring. Originally, components lived in a flat `common/` folder. We reorganized into semantic folders (`ui/`, `animation/`, `media/`) to make intent clear.

## Routing: Simple and Intentional

React Router handles all routing with a straightforward configuration:

```jsx
// apps/web/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, WorkList, WorkDetail, FontList, Styleguide } from './routes';

function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/work" element={<WorkList />} />
<Route path="/work/:slug" element={<WorkDetail />} />
<Route path="/fonts" element={<FontList />} />
<Route path="/styleguide" element={<Styleguide />} />
</Routes>
</BrowserRouter>
);
}
```

Each route is a standalone component that fetches its own data. No complex data loading orchestration, no hydration mismatches—just simple, predictable routing.

The `/work/:slug` route demonstrates dynamic routing:

```jsx
// apps/web/src/routes/WorkDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectBySlug } from '../utils/sanity';

export function WorkDetail() {
const { slug } = useParams();
const [project, setProject] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
getProjectBySlug(slug)
.then(setProject)
.finally(() => setLoading(false));
}, [slug]);

if (loading) return <ProjectLoader />;
if (!project) return <NotFound />;

return <ProjectRenderer project={project} />;
}
```

Simple, explicit, easy to debug.

## Content Management: Sanity + GROQ

Sanity is our single source of truth for content. All schemas live in `packages/content`, ensuring consistency across the main site and CMS instances:

```typescript
// packages/content/schemas/project.ts
export default {
name: 'project',
type: 'document',
title: 'Project',
fields: [
{
name: 'title',
type: 'string',
validation: Rule => Rule.required()
},
{
name: 'slug',
type: 'slug',
options: { source: 'title' }
},
{
name: 'client',
type: 'string'
},
{
name: 'year',
type: 'number'
},
{
name: 'heroImage',
type: 'image',
options: { hotspot: true }
},
{
name: 'modules',
type: 'array',
of: [
{ type: 'hero' },
{ type: 'richText' },
{ type: 'galleryGrid' },
{ type: 'specimenEmbed' }
]
}
]
}
```

Content is fetched using GROQ queries:

```javascript
// apps/web/src/utils/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
dataset: import.meta.env.VITE_SANITY_DATASET,
apiVersion: '2025-01-01',
useCdn: true
});

export async function getProjects() {
return client.fetch(`
*[_type == "project"] | order(year desc) {
_id,
title,
slug,
client,
year,
heroImage,
"imageUrl": heroImage.asset->url
}
`);
}

export async function getProjectBySlug(slug) {
return client.fetch(`
*[_type == "project" && slug.current == $slug][0] {
_id,
title,
slug,
client,
year,
description,
heroImage,
modules[] {
_type,
_key,
// Hero module
_type == "hero" => {
heading,
subheading,
backgroundImage
},
// Rich text module
_type == "richText" => {
content[] {
...,
markDefs[] {
...,
_type == "internalLink" => {
"slug": reference->slug
}
}
}
},
// Gallery module
_type == "galleryGrid" => {
images[] {
asset->,
alt,
caption
}
}
}
}
`, { slug });
}
```

GROQ's power is in its flexibility—we can query exactly what we need, including related documents and transformed data, all in a single request.

[IMAGE: Screenshot of Sanity Studio showing the project schema with modules]

## Component Architecture: Reusability Through Composition

Components are organized by their role, not by arbitrary categories:

**UI Components** (`components/ui/`):
- `Button.jsx` - Primary, secondary, ghost variants
- `Card.jsx` - Surface for grouped content
- `SectionLabel.jsx` - Small caps labels for sections
- `SectionHeader.jsx` - Consistent section titles

**Section Components** (`components/sections/`):
- `home/Hero.jsx` - Animated homepage hero
- `home/About.jsx` - Studio introduction with GSAP animations
- `home/Work.jsx` - Featured project grid
- `cta/CtaHome.jsx` - Call-to-action with contact info

**Animation Components** (`components/animation/`):
- `AnimatedTitle.jsx` - GSAP-powered text reveals
- `ScrollReveal.jsx` - Scroll-triggered animations
- `VideoScroll.jsx` - Video that plays on scroll

**Media Components** (`components/media/`):
- `OptimizedImage.jsx` - Lazy-loaded images with blur-up
- `VideoPlayer.jsx` - Autoplay video with fallbacks

Each component is self-contained but composable:

```jsx
// Example: Building a work card
import { Card } from '@kol/ui/Card';
import { OptimizedImage } from '../media/OptimizedImage';

export function WorkCard({ project }) {
return (
<Card className="work-card group">
<OptimizedImage
src={project.imageUrl}
alt={project.title}
className="group-hover:scale-105 transition-transform"
/>
<div className="p-6">
<h3 className="text-h4 font-heading">{project.title}</h3>
<p className="text-sm text-content-secondary">
{project.client} • {project.year}
</p>
</div>
</Card>
);
}
```

This composition pattern means we can build complex layouts from simple, tested primitives.

## Animation: GSAP for Sophisticated Motion

The homepage uses GSAP for complex animations that CSS alone can't achieve:

```jsx
// apps/web/src/components/sections/home/Hero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
const titleRef = useRef(null);
const subtitleRef = useRef(null);

useEffect(() => {
const tl = gsap.timeline({
scrollTrigger: {
trigger: titleRef.current,
start: 'top center',
end: 'bottom center',
scrub: 1
}
});

tl.from(titleRef.current, {
y: 100,
opacity: 0,
duration: 1
})
.from(subtitleRef.current, {
y: 50,
opacity: 0,
duration: 0.8
}, '-=0.5');

return () => tl.kill();
}, []);

return (
<section className="hero">
<h1 ref={titleRef} className="text-display-xl font-display">
Kolkrabbi
</h1>
<p ref={subtitleRef} className="text-h3 font-heading">
Design & Development Studio
</p>
</section>
);
}
```

GSAP handles:
- Scroll-triggered animations (ScrollTrigger plugin)
- Complex timing and sequencing
- Smooth easing and interpolation
- Cleanup on component unmount

This creates a polished, interactive experience without sacrificing performance.

[IMAGE: Video or GIF showing homepage animations in action]

## Theming: Dark Mode That Just Works

Theme management is handled by a simple utility:

```javascript
// packages/ui/src/utils/theme.js
export function getInitialTheme() {
// Check localStorage first
const savedTheme = localStorage.getItem('theme');
if (savedTheme) return savedTheme;

// Default to dark mode unless OS prefers light
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
return prefersLight ? 'light' : 'dark';
}

export function setTheme(theme) {
document.documentElement.setAttribute('data-theme', theme);
localStorage.setItem('theme', theme);
}

export function toggleTheme() {
const current = document.documentElement.getAttribute('data-theme') || 'dark';
const next = current === 'dark' ? 'light' : 'dark';
setTheme(next);
return next;
}
```

Components use semantic tokens, and the theme system handles the rest:

```jsx
// Components don't know about light or dark mode
<div className="bg-surface-primary text-content-primary">
<h2 className="text-h2 text-content-primary">Section Title</h2>
<p className="text-content-secondary">Description text</p>
</div>
```

The CSS automatically swaps token values based on `data-theme`:

```css
[data-theme="light"] {
--color-surface-primary: #ffffff;
--color-content-primary: #171717;
}

[data-theme="dark"] {
--color-surface-primary: #0a0a0a;
--color-content-primary: #fafafa;
}
```

This declarative approach eliminated an entire class of theming bugs.

## Performance: Fast by Default

Vite gives us instant dev server startup and fast builds. But we also optimized for production:

**Code splitting** at the route level:
```javascript
const Home = lazy(() => import('./routes/Home'));
const WorkDetail = lazy(() => import('./routes/WorkDetail'));
```

**Image optimization** with lazy loading:
```jsx
<OptimizedImage
src={project.imageUrl}
loading="lazy"
decoding="async"
/>
```

**Font loading** with `font-display: block`:
```css
@font-face {
font-family: "TG Málrómur Narrow Medium";
src: url("./fonts/tg-malromur-narrow-medium.woff2") format("woff2");
font-display: block; /* Prevent FOIT */
}
```

**Sanity CDN** for content delivery:
```javascript
export const client = createClient({
projectId: '...',
dataset: 'production',
useCdn: true // Fast, cached content delivery
});
```

The result: **Lighthouse scores consistently above 90** for performance, accessibility, and SEO.

## Deployment: Simple and Reliable

The site deploys to Vercel (or any static host) with a simple build command:

```json
{
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
}
}
```

The Turborepo pipeline ensures dependencies build first:

```json
{
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**"]
}
}
}
```

This means running `turbo build` from the root automatically:
1. Builds `packages/ui`
2. Builds `packages/content`
3. Builds `packages/fontviewer`
4. Builds `apps/web` (which depends on the packages)

No manual coordination required.

[IMAGE: Screenshot of successful Vercel deployment showing build logs]

## What Makes This Architecture Work

Several decisions compound to create a maintainable system:

**1. Monorepo structure prevents drift**
When the design system, content schemas, and all applications live in one repo, they can't fall out of sync. A single PR can update a schema and all consumers.

**2. Shared packages eliminate duplication**
`@kol/ui`, `@kol/content`, and `@kol/fontviewer` are used by multiple apps. Changes propagate automatically during builds.

**3. Semantic tokens enable dark mode**
Components don't know about themes. They use tokens like `--color-surface-primary`, and CSS handles light/dark switching.

**4. GROQ makes content queries powerful**
We can fetch exactly what we need, including references and transformations, in a single query. No over-fetching, no N+1 problems.

**5. Vite keeps the feedback loop tight**
Instant server startup, fast HMR, simple config. Development feels effortless.

**6. Tailwind v4 CSS-first approach reduces complexity**
No JavaScript config to manage. All tokens in CSS. Works with standard CSS cascade and inheritance.

## Lessons from Building in Public

Working on kolkrabbi.io taught us lessons that apply to any portfolio or agency site:

**Choose boring technology for the core.** React, Vite, Sanity—none of these are cutting edge, and that's the point. We want to spend innovation tokens on design and UX, not tooling.

**Invest in documentation.** Our `LLM_RULES.md` and `AGENT-CONTEXT.md` files ensure anyone (human or AI) can understand the architecture in minutes.

**Make design decisions once.** Design System 2.0 means we never debate colors, spacing, or typography again. The tokens are the decisions.

**Test in production early.** We deployed incomplete features behind feature flags. Early production exposure catches integration issues before they compound.

**Optimize for change.** Content models will evolve. Design tokens will expand. The architecture accommodates this by keeping concerns separated and dependencies explicit.

**Don't fear migration.** We consolidated four repos into one while the site was live. Incremental migration with clear phases meant we never lost momentum.

## What's Next

The site is live and stable, but there's always room for improvement:

**Content priorities:**
- Blog system for design and development articles
- Case study deep-dives with rich media
- Font specimen pages with interactive controls

**Technical priorities:**
- Implement Sanity preview API for draft content
- Add end-to-end tests with Playwright
- Explore ISR (Incremental Static Regeneration) for better caching
- Set up analytics and performance monitoring

**Design priorities:**
- Expand component library with more variants
- Add animation presets for common patterns
- Create responsive spacing tokens
- Audit accessibility (WCAG 2.1 AA compliance)

But these are enhancements, not urgent fixes. The foundation is solid, the architecture scales, and the site does what it needs to do: **showcase our work, demonstrate our capabilities, and serve as a living example of our design philosophy**.

## Conclusion: Architecture as a Product Decision

Every technical decision is a product decision. We chose this architecture not because it's the most advanced or the most trendy, but because it serves our goals:

- **Flexibility** to iterate quickly on design and content
- **Consistency** across all our web properties
- **Maintainability** by a small team without dedicated DevOps
- **Performance** that respects user bandwidth and attention
- **Scalability** to add new features without rewriting

The result is a site that feels cohesive, loads fast, looks polished, and can evolve with our studio's needs. That's what good architecture delivers: **the freedom to focus on what matters**.

---

## Sources
1. Web App Structure - `apps/web/`
2. Routing Configuration - `apps/web/src/App.jsx`
3. Sanity Integration - `apps/web/src/utils/sanity.js`
4. Component Organization - `apps/web/src/components/`
5. Home Page Migration - `docs/SESSION-LOGS/2025-10-07-HOME-MIGRATION-PLAN.md`
6. Theme System - `packages/ui/src/utils/theme.js`
7. Design System - `packages/ui/theme.css`
8. Content Schemas - `packages/content/schemas/`
9. Agent Context - `docs/AGENT-CONTEXT.md`
10. Rules & Structure - `docs/RULES_STRUCTURE.md`


---


- Kolkrabbi.io: Why We Built Our Portfolio the Hard (But Better) Way 🐙 GeminiTake


Building a portfolio in 2025 is overwhelming. Do you go static, dynamic, SSR, SPA, Headless, Markdown? It feels like a minefield of over-engineered choices!

For kolkrabbi.io, we made a deliberate choice: we wanted flexibility and power without sacrificing sanity. Our site isn't a static artifact; it's a living product of our studio. So, we chose an architecture that looks complex on paper but is surprisingly simple to maintain: a React Single Page App (SPA), powered by Sanity CMS, styled with Tailwind v4, and all tucked neatly into a monorepo.

Here's the high-level tour of how we made it all work.

The Stack: Deliberate Trade-Offs

We chose our tools based on two simple questions: Does it speed up our design iteration? and Does it prevent future breakage?

The Tool

Why We Chose It

The Human Benefit

React + Vite

Fast, reliable component model. We skipped complex Next.js/Remix because we don't need Server-Side Rendering (SSR).

Instant Feedback Loop: Vite makes the development server start instantly. We spend less time waiting and more time designing.

Sanity CMS

Structured, modular content with the powerful GROQ query language.

Total Content Control: We can build unique layouts for every project without touching a line of code, and query exactly the data we need—no over-fetching.

Tailwind v4

CSS-first approach using semantic tokens like bg-surface-primary.

Effortless Dark Mode: Components use simple descriptive names, and the theme system handles swapping colors automatically. It just works.

Monorepo (Turborepo)

Houses all our code (the website, the design system, the content schemas) in one place.

Zero Design Drift: If we update a button's style in our shared component package, the website inherits the change instantly. Everything stays $\text{100%}$ in sync.

The Monorepo Magic: A Single Source of Truth

The most powerful part of our setup is the monorepo. Our design system primitives (@kol/ui), our content definitions (@kol/content), and the website itself all share the same repository.

When we update a content schema in Sanity, the developer who writes the new page component sees that change immediately. When we build the app, Turborepo automatically handles the correct build order (packages first, then the web app). This makes complex integrations simple and eliminates dependency hell.

Content Structure: No More Markdown Blobs

We treat our projects like magazines, not blogs. That means we need control over modules (rich text, gallery grids, video embeds). Sanity lets us define a Project Schema with a flexible modules array:

// packages/content/schemas/project.ts (Simplified)
// ... fields like title, slug, client, year ...

{
name: 'modules',
type: 'array',
of: [
{ type: 'hero' },         // Our custom hero component
{ type: 'richText' },     // Rich content block
{ type: 'galleryGrid' }   // Complex image layout
]
}

This structured approach means the website always knows how to render the content beautifully, and the content creators always know what options they have.

Development Philosophy: Simple, Explicit, Fast

We deliberately chose the simplest tools for core tasks to save our complexity budget for design and animation.

Routing: Explicit and Predictable

We use basic React Router. There are no magical server-side wrappers or complex data loaders. A page component, like our /work/:slug detail page, simply uses a React useEffect hook to fetch its data when it loads.

// apps/web/src/routes/WorkDetail.jsx - Simple, explicit data fetching
useEffect(() => {
  getProjectBySlug(slug) // Fetch the data
    .then(setProject)
    .finally(() => setLoading(false));
}, [slug]);
// ... returns the renderer

This approach is predictable, easy to debug, and avoids the complex hydration bugs that often plague heavier frameworks.

Animation: When CSS Isn't Enough

We prioritize performance, but a design studio needs polish. For sophisticated motion—like scroll-triggered reveals or complex text sequencing—we turn to GSAP. It gives us smooth, performant control over complex timelines that CSS alone can't manage, creating a premium feel without sacrificing speed.

Performance: Fast by Default

High Lighthouse scores weren't an afterthought; they were built-in:

Vite's optimized bundling.

Sanity's CDN for fast content delivery.

Lazy-loaded, optimized images (via our OptimizedImage component).

Route-level code splitting to only load the JavaScript a user needs.

Conclusion: Architecture as a Product Decision

We chose this specific architecture—the monorepo, the SPA, the headless CMS—not because it's the trendiest, but because it delivers on our business goals:

Freedom to Iterate: We can change designs and content quickly.

Iron-Clad Consistency: All our digital properties look and feel the same.

Future-Proof: The modular, separate-concerns structure means we can add new features (like a blog or a store) without having to rewrite the core.

The result is a site that feels cohesive, loads fast, looks polished, and can evolve seamlessly with our studio. That's what good architecture gives you: the freedom to focus on the work that truly matters.

---

- Post 3 // Consolidating MONOREPO

Consolidating Four Projects into One Monorepo: A Migration Story

Tór Grímsson

Oct 8, 2025

• 1 min read

When you're a small team building multiple interconnected products, there comes a moment when you realize some things.

# Consolidating Four Projects into One Monorepo: A Migration Story

When you're a small team building multiple interconnected products, there comes a moment when you realize: **we're fighting our own architecture**. For us, that moment arrived when updating a single design token required opening four different repositories, making four separate PRs, and hoping everything stayed in sync.

The solution seemed obvious: consolidate everything into a monorepo. The execution? That's where things got interesting.

## The Problem: Death by a Thousand Tabs

Our setup consisted of four independent projects:
1. **kolkrabbi.io** - The main website (React, custom CSS, Sanity CMS)
2. **Foundry** - A standalone design tool application (React, different CSS conventions)
3. **Font Viewer** - An interactive typography exploration tool (vanilla JS, custom build)
4. **Sanity Studios** - Two separate CMS instances with duplicated schemas

Each project lived in its own repository, had its own dependencies, its own deployment pipeline, and its own interpretation of "our brand colors."

The daily workflow looked like this:
```bash
# Morning routine
cd ~/git/kolkrabbi && git pull
cd ~/git/kolkrabbi-foundry && git pull
cd ~/git/kolkrabbi-fontviewer && git pull
cd ~/git/kolkrabbi-staging && git pull

# Update a shared component? Good luck.
# Change happens in one repo
# Copy-paste to other repos
# Hope you didn't miss any differences
# Inevitably find bugs in production
```

[IMAGE: Screenshot of 4 terminal windows showing different project directories, illustrating the fragmented workflow]

The symptoms of architectural drift were everywhere:
- **Dependency hell**: One project on React 18, another still on 17
- **Build tool chaos**: Vite, Webpack, and custom scripts all doing slightly different things
- **Content model divergence**: Sanity schemas that should have been identical had drifted apart
- **CSS duplication**: The same `.button` class written four different ways

We weren't just maintaining four projects—we were maintaining four *versions* of the same product. It was unsustainable.

## The Decision: Monorepo or Microservices?

Before committing to a monorepo, we evaluated alternatives:

**Microservices with shared packages?** Too much overhead for a small team. Managing npm publishing, versioning, and coordinating updates across services would be worse than the status quo.

**Git submodules?** A recipe for merge conflicts and confusion. Submodules work for large teams with dedicated infra, not for us.

**Monorepo?** Scary at first (what if everything breaks?), but the benefits were compelling:
- Single dependency tree (one `yarn install`)
- Atomic commits across projects (change a schema and update all consumers in one PR)
- Shared tooling and build configuration
- Easier refactoring (move code between packages without publishing)

We chose the monorepo, but with a critical constraint: **migration must be incremental**. We couldn't afford a "big bang" rewrite that might never ship.

## The Plan: Crawl, Walk, Run

We broke the migration into distinct phases, each delivering value independently:

### Phase 1: Establish the Foundation
Create the monorepo structure without migrating real projects:
```
kolkrabbi-monorepo/
├── apps/ # Future home for applications
├── packages/ # Shared code
├── docs/ # Documentation and rules
├── package.json # Workspace configuration
└── turbo.json # Build pipeline
```

We used **Yarn workspaces** for dependency management and **Turborepo** for orchestrating builds:

```json
{
"name": "kolkrabbi-monorepo",
"private": true,
"workspaces": [
"apps/*",
"packages/*"
],
"scripts": {
"dev": "turbo run dev",
"build": "turbo run build",
"lint": "turbo run lint"
}
}
```

This foundation let us test the build system before migrating real code.

### Phase 2: Extract Shared Content Schemas
The easiest win was consolidating Sanity schemas. Both studios defined the same document types (`project`, `fontFamily`, `font`) but with slight variations:

```typescript
// Before: Duplicated in two studios
// studio-cms1/schemas/project.ts
export default {
name: 'project',
type: 'document',
fields: [
{ name: 'title', type: 'string' },
{ name: 'description', type: 'text' }
]
}

// studio-cms2/schemas/project.ts - SLIGHTLY DIFFERENT
export default {
name: 'project',
type: 'document',
fields: [
{ name: 'title', type: 'string' },
{ name: 'description', type: 'text' },
{ name: 'featured', type: 'boolean' } // Added in one studio, not the other
]
}
```

We created `packages/content` to hold the single source of truth:

```typescript
// packages/content/schemas/project.ts
export default {
name: 'project',
type: 'document',
fields: [
{ name: 'title', type: 'string' },
{ name: 'slug', type: 'slug' },
{ name: 'description', type: 'text' },
{ name: 'featured', type: 'boolean' },
{ name: 'client', type: 'string' },
{ name: 'year', type: 'number' },
{ name: 'heroImage', type: 'image' },
{ name: 'modules', type: 'array', of: [
{ type: 'hero' },
{ type: 'richText' },
{ type: 'galleryGrid' }
]}
]
}
```

Both studios now import from `@kol/content`, ensuring they stay in sync.

[IMAGE: Diagram showing two studio instances both importing from a shared packages/content folder]

### Phase 3: Create a Shared Design System
This is where Design System 2.0 (covered in the previous post) came in. We created `packages/ui` with:
- `theme.css` - Tailwind v4 design tokens
- Shared components (buttons, cards, typography primitives)
- Utility functions (theme management, responsive helpers)

The key insight: **start with tokens, not components**. If projects can't agree on colors and spacing, they'll never agree on button styles.

### Phase 4: Migrate the Font Viewer
The font viewer was the simplest application to migrate because it had no backend dependencies:

```bash
# Simple file migration
cp -r ~/git/kolkrabbi-fontviewer/src packages/fontviewer/src
cp -r ~/git/kolkrabbi-fontviewer/public packages/fontviewer/public
```

We refactored it to use shared design tokens:
```javascript
// Before: Hardcoded styles
const containerStyle = {
backgroundColor: '#ffffff',
color: '#171717',
padding: '2rem'
};

// After: Using theme tokens
const containerStyle = {
backgroundColor: 'var(--color-surface-primary)',
color: 'var(--color-content-primary)',
padding: 'var(--spacing-8)'
};
```

This provided proof-of-concept that shared tokens could work across different applications.

### Phase 5: Migrate the Main Website
The website migration was the most complex because it included:
- React Router setup with nested routes
- Sanity GROQ queries for content
- PortableText rendering
- Server-side data fetching

We took an incremental approach, starting with static routes:

```jsx
// apps/web/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/work" element={<WorkList />} />
<Route path="/work/:slug" element={<WorkDetail />} />
<Route path="/fonts" element={<FontList />} />
</Routes>
</BrowserRouter>
);
}
```

Content fetching was centralized in a `sanity` utility:

```javascript
// apps/web/src/utils/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
dataset: import.meta.env.VITE_SANITY_DATASET,
apiVersion: '2025-01-01',
useCdn: true
});

export async function getProjects() {
return client.fetch(`
*[_type == "project"] | order(year desc) {
_id,
title,
slug,
client,
year,
heroImage
}
`);
}
```

We migrated the home page last because it had the most custom animations and dependencies. This turned out to be wise—by the time we got to it, we'd learned all the patterns and could migrate it cleanly in one session.

### Phase 6: Migrate Foundry
Foundry was tricky because it had its own routing and state management:

```jsx
// apps/foundry/src/App.jsx
function App() {
const [activeSection, setActiveSection] = useState('overview');

return (
<div className="foundry-container">
<Sidebar
activeSection={activeSection}
onSectionChange={setActiveSection}
/>
<MainContent section={activeSection} />
</div>
);
}
```

We preserved its structure but swapped out all hardcoded styles for shared tokens:

```jsx
// Before: Hardcoded dark mode
<Card style={{
backgroundColor: isDark ? '#171717' : '#ffffff',
color: isDark ? '#fafafa' : '#171717'
}}>

// After: Semantic tokens handle dark mode automatically
<Card className="bg-surface-secondary text-content-primary">
```

This required careful testing—Foundry's UI is dense with controls, and we needed to ensure nothing broke.

[IMAGE: Side-by-side comparison of Foundry before and after migration, showing consistent theming]

### Phase 7: Configure Studio Instances
The studios were last because they had the least code to migrate—just configuration:

```typescript
// apps/studio-cms1/sanity.config.ts
import { defineConfig } from 'sanity';
import { schemas } from '@kol/content';

export default defineConfig({
projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
dataset: process.env.SANITY_STUDIO_DATASET!,
schema: {
types: schemas
}
});
```

Both studios now share schemas, ensuring content models stay synchronized.

## The Tools: What Made It Possible

Several tools were critical to successful migration:

**Yarn Workspaces** handled dependency deduplication. Instead of four `node_modules` folders totaling 2GB, we have one at 600MB.

**Turborepo** orchestrated builds with caching:
```json
{
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**"]
},
"dev": {
"cache": false,
"persistent": true
}
}
}
```

This means `turbo build` automatically builds dependencies in the right order, caching results to avoid redundant work.

**Internal packages** used `@kol/*` namespace:
```json
{
"name": "@kol/ui",
"version": "0.0.0",
"exports": {
"./theme.css": "./theme.css",
"./Button": "./src/components/Button.jsx"
}
}
```

The `exports` field gave us fine-grained control over what could be imported.

## The Challenges: What We Learned the Hard Way

Not everything went smoothly. Here are the pitfalls we encountered:

**Import path confusion**: Moving from four repos to one meant old imports broke. We used ESLint to catch `../../packages/ui` (wrong) vs `@kol/ui` (right).

**Circular dependencies**: When everything is in one repo, it's easier to create import cycles. We enforced a strict layer architecture:
- `packages/ui` → no app imports
- `packages/content` → no app imports
- `apps/*` → can import from packages

**Turbo cache invalidation**: Early on, Turbo's cache would serve stale builds. We learned to use `--force` during active development and trust caching in CI only.

**Environment variables**: Each app needed its own `.env` file, but they lived at the root. We used a naming convention:
```bash
# .env
VITE_SANITY_PROJECT_ID_WEB=xyz
VITE_SANITY_PROJECT_ID_FOUNDRY=abc
VITE_SANITY_DATASET_WEB=production
```

**Git history loss**: Migrating code meant losing per-file git history. We documented this in `MIGRATION-STATUS.md` so future devs know where to look for historical context.

## The Payoff: What We Gained

Three months after completing migration, the benefits are undeniable:

**Development velocity**: Updating a shared component now takes minutes instead of hours. No more syncing changes across repos.

**Consistency**: Everything uses the same design tokens, the same components, the same patterns. The entire product feels cohesive.

**Confidence**: Atomic commits mean we can change a schema and update all consumers in a single PR. No more "hope it works in production."

**Onboarding**: New developers (or LLMs assisting us) can learn one architecture and apply it everywhere.

**Build times**: Turborepo's caching means clean builds take 30 seconds instead of 5 minutes.

But the biggest win is psychological: **we stopped fighting our tools and started shipping features**.

## Advice for Your Migration

If you're considering a similar consolidation, here's what we'd recommend:

1. **Start with a clear migration plan**. Document phases, deliverables, and success criteria. Ours lived in `docs/MIGRATION-STATUS.md`.

2. **Migrate shared code first**. Get your content schemas and design tokens into shared packages before touching applications.

3. **Keep old repos around**. We didn't delete the original repos for 3 months. This safety net gave us confidence to move fast.

4. **Write LLM-friendly rules**. Our `LLM_RULES.md` and `RULES_STRUCTURE.md` ensure any AI assistant (or human) can understand the architecture in 5 minutes.

5. **Test incrementally**. We deployed each migrated app to staging immediately. Early deployments catch integration issues.

6. **Document everything**. Three months from now, you won't remember why you made certain decisions. Write it down.

7. **Accept imperfection**. Our first migrated app had issues. We fixed them and learned for the next one. Don't let perfection paralysis stop you.

## What's Next

Migration is complete, but the monorepo continues to evolve:
- Exploring **shared API layer** for Sanity queries
- Adding **end-to-end testing** with Playwright
- Considering **container-based deployments** to simplify CI/CD
- Investigating **incremental static regeneration** for better performance

But these are optimizations, not crises. The foundation is solid, and we can build with confidence.

The monorepo was scary to commit to, but in hindsight, it was the right call. Our only regret? Not doing it sooner.

---

## Sources
1. Migration Status Documentation - `docs/MIGRATION-STATUS.md`
2. Agent Context & Session Logs - `docs/AGENT-CONTEXT.md`, `docs/SESSION-LOGS/`
3. Monorepo Structure Rules - `docs/RULES_STRUCTURE.md`
4. LLM Rules & Guidelines - `LLM_RULES.md`
5. Content Package Migration - `docs/SESSION-LOGS/2025-10-04-content-package.md`
6. UI Package Consolidation - `docs/SESSION-LOGS/2025-10-04-ui-package.md`
7. Home Page Migration Plan - `docs/SESSION-LOGS/2025-10-07-HOME-MIGRATION-PLAN.md`


---


- Monorepo gemini


The Big Move: How We Consolidated Four Fragmented Projects into One Monorepo 🐙

When you're a small, fast-moving team, there's a moment when you realize you've become your own worst enemy. For us, that moment was the "Four Tabs of Terror."

Every time we needed to update a design token—say, a corner radius or a primary color—it meant opening four separate Git repositories, making four separate code changes, creating four separate pull requests, and then desperately praying the deployment sequence didn't fall apart. We were constantly fighting our own architecture.

The solution? We had to get everything into one place. This is the story of how we moved four independent projects—our main site, our design tool, our font viewer, and two CMS instances—into a single, unified monorepo.

The Problem: Death by a Thousand Differences

Our setup was a mess of "good ideas at the time":

Four separate repos (and four separate node_modules folders).

Dependency hell: One app on React 18, another lingering on 17.

CSS Duplication: The same simple button component written four different ways.

Architectural Drift: Sanity schemas that were supposed to be identical had subtly diverged.

We weren't just wasting time; the constant risk of bugs was destroying our confidence. We had to stop maintaining four fragmented versions of our product and build one cohesive system.

The Decision: Embracing the Monorepo Fear

We quickly dismissed microservices (too much overhead) and Git submodules (a nightmare waiting to happen). The monorepo was the answer, but it felt terrifying. What if moving everything broke everything?

Our commitment: The migration had to be incremental. No "big bang" that required us to stop shipping features for a month. We would crawl, then walk, then run.

The Plan: Moving One Piece at a Time

We broke the massive task into small, manageable phases. The strategy was to gain high-value, low-risk wins first.

Phase 1 & 2: Finding Our Shared DNA

The most critical first step was creating the shared packages—the single source of truth:

packages/content: We extracted all our Sanity schemas here. Now, both our CMS instances import from this single file. Our content models can never diverge again. (Relief: Content is consistent!)

packages/ui: This became our Design System 2.0. We moved all design tokens, CSS variables, and core primitives (like the Button and Card components) here.

The key learning: start with tokens, not components. Once our projects agreed on colors and spacing, agreeing on button styles was easy.

Phase 3: The Proof of Concept

We migrated the simplest app first: the Font Viewer. We stripped out its old, hardcoded styles and replaced them with the new shared tokens:

// Before: Hardcoded
backgroundColor: '#ffffff',
color: '#171717',

// After: Semantic, auto-theming
backgroundColor: 'var(--color-surface-primary)',
color: 'var(--color-content-primary)',

This tiny win gave us the confidence that the shared tokens system actually worked.

Phase 4 & 5: The Big Lifts

The main website (apps/web) and the Foundry design tool (apps/foundry) were the heaviest lifts. We preserved their internal routing and structure but diligently replaced every instance of old, proprietary code with our new shared components. We migrated the heavily animated homepage last—it was a reward for all the hard, preparatory work.

The Tools That Made It Possible

Yarn Workspaces: Slashed our node_modules folder size and managed dependencies perfectly.

Turborepo: This was the hero. It orchestrated the builds, always knew the right dependency order, and most importantly, cached everything. A clean build that used to take five minutes now takes 30 seconds.

The Hard-Earned Lessons (And the Pitfalls)

Not everything was smooth sailing. We hit some classic monorepo snags:

Circular Dependencies: When all your code is together, it's easy to accidentally create dependency loops. We had to enforce a strict layering rule: apps can import packages, but packages can't import apps or each other.

Git History Loss: We lost individual file history during the initial file moves. Our solution? We documented the whole migration in a file called MIGRATION-STATUS.md so future devs (or our LLM assistants!) would know where to find the old context.

LLM-Friendly Rules: We realized the AI tools we use as our teachers and assistants need the same clear boundaries as humans. We created LLM_RULES.md to explicitly define the architecture's structure for any future AI-assisted development.

The Payoff: Why We're Never Going Back

Three months later, the benefits are night and day.

Confidence: We now make atomic commits. We can change a content schema and update all consumers in a single, confident pull request. No more crossing fingers at deploy time.

Development Velocity: Updating a core component is a matter of minutes, not hours of tedious sync work.

Consistency: The entire product family—the site, the design tool, the future blog—all look and feel exactly the same.

Psychological Relief: We stopped fighting our tools and are back to focusing on shipping great features and design.

The monorepo was scary to commit to, but it was the right call. Our only regret is that we didn't do it sooner. If your team is fighting its architecture, take the leap. The freedom on the other side is worth the work.


----


Post 04 // Desing System 2.0

Building a Design System 2.0: Figma Tokens to kolkrabbi.io/styleguide

Tór Grímsson

Oct 8, 2025

• 1 min read

Design  System 2.0 wasn't just about making things look consistent—it was about  creating a foundation that could scale with our ambitions while  remaining maintainable by a small team.

Building a Design System 2.0: Figma Tokens to kolkrabbi.io/styleguide

When  we started consolidating four separate projects into a unified  monorepo, one truth became crystal clear: **inconsistent design tokens  were costing us time, creating friction, and making maintenance a  nightmare**. Each project had its own approach to colors, typography,  spacing, and theming. The result? Multiple sources of truth, duplicated  CSS, and constant context-switching between codebases.

Design  System 2.0 wasn't just about making things look consistent—it was about  creating a foundation that could scale with our ambitions while  remaining maintainable by a small team.

The Problem: Four Projects, Four Design Languages

Our original setup consisted of:

A public-facing website with custom CSS and hardcoded values

A foundry application with its own theme system

A font viewer tool with minimal styling conventions

Multiple Sanity Studio instances, each configured independently

Each project had evolved organically, resulting in:

7 different shades of gray used across projects for "secondary text"

Inconsistent dark mode implementations (some using classes, others using data attributes)

Typography systems that didn't align (font sizes ranged from 14px to 18px for body text)

No shared component library, meaning every button, card, and form element was reimplemented

[IMAGE:  Side-by-side comparison of the same UI element across four projects,  showing inconsistent spacing, colors, and typography]

[IMAGE:  Side-by-side comparison of the same UI element across four projects,  showing inconsistent spacing, colors, and typography]

The Audit: Understanding What We Had

Before  we could build something new, we needed to understand what we were  working with. We conducted a comprehensive design audit:

Extracted all CSS custom properties from 8 different stylesheets

Analyzed Figma design files to identify intended design tokens

Documented every typography style in use (we found 23 different heading styles!)

Mapped color usage patterns across light and dark modes

The audit revealed some surprises:

Projects used **TG Málrómur** fonts (Tall Black, Narrow Medium) but applied them inconsistently

Dark mode colors weren't true inverses—each project had adapted them slightly

Spacing values were a mix of px, rem, and arbitrary Tailwind utilities

The Solution: A Single Source of Truth

We  designed our system around a central principle: **design tokens in one  place, consumed everywhere**. This led to the creation of  `packages/ui/theme.css`, a Tailwind v4-compatible theme file that  defines every token using the `@theme` directive.

### Typography System

We established a clear hierarchy using two primary typefaces:

@theme Typography

css @theme { /* Display typography - TG Málrómur Tall Black */ --font-family-display: "TG Málrómur Tall Black", ui-sans-serif, system-ui;  /* Headings - TG Málrómur Narrow Medium */ --font-family-heading: "TG Málrómur Narrow Medium", ui-sans-serif, system-ui;  /* Body - Inter Tight Variable */ --font-family-sans: "Inter Tight", ui-sans-serif, system-ui;  /* Code - JetBrains Mono */ --font-family-mono: "JetBrains Mono", ui-monospace, monospace; }

Typography sizes follow a rational scale with **div 4/8 sizing** (dividing base sizes by 4 or 8 for precise control):

@theme css

css @theme { /* Display sizes - for hero sections */ --font-size-display-xl: 8rem; /* 128px */ --font-size-display-lg: 6rem; /* 96px */ --font-size-display-md: 4.5rem; /* 72px */  /* Heading sizes - for section titles */ --font-size-h1: 3.5rem; /* 56px */ --font-size-h2: 2.5rem; /* 40px */ --font-size-h3: 2rem; /* 32px */ --font-size-h4: 1.5rem; /* 24px */  /* Body sizes */ --font-size-base: 1rem; /* 16px */ --font-size-lg: 1.125rem; /* 18px */ --font-size-sm: 0.875rem; /* 14px */ }

Line heights use **percentage-based values** for better vertical rhythm:
- Display text: 90-95% (tight, impactful)
- Headings: 110-120% (balanced)
- Body text: 150-160% (comfortable reading)

IMAGE: Typography scale showing display, heading, and body text

Samples in both light and dark modes

Color System: Semantic Tokens Over Raw Values

Instead of exposing raw hex colors, we created **semantic tokens** that describe intent:

@theme

css @theme { /* Surface colors - what things sit on */ --color-surface-primary: #ffffff; --color-surface-secondary: #f5f5f5; --color-surface-tertiary: #e5e5e5;  /* Content colors - text and icons */ --color-content-primary: #171717; --color-content-secondary: #525252; --color-content-tertiary: #a3a3a3;  /* Border colors - dividers and outlines */ --color-border-primary: #e5e5e5; --color-border-secondary: rgba(0, 0, 0, 0.1);  /* Interactive colors - buttons and links */ --color-interactive-primary: #171717; --color-interactive-hover: #404040; } ```  Dark mode is achieved through simple color inversion—**no complex calculations**, just well-chosen pairings:  ```css @media (prefers-color-scheme: dark) { @theme { --color-surface-primary: #0a0a0a; --color-surface-secondary: #171717; --color-surface-tertiary: #262626;  --color-content-primary: #fafafa; --color-content-secondary: #d4d4d4; --color-content-tertiary: #737373;  --color-border-primary: #262626; --color-border-secondary: rgba(255, 255, 255, 0.1); } }

This  approach means components don't need to know about light or dark  mode—they use semantic tokens, and the browser handles the rest.

The Styleguide: Design Tokens Made Tangible

A design system is only as good as its documentation. We built an interactive styleguide that serves three purposes:

1. **Visual reference** for designers and developers
2. **QA tool** for catching regressions during theme changes
3. **Component library** showing all available primitives

The  styleguide is a static HTML file that imports the same `theme.css` used  in production, ensuring what you see is exactly what you get:

html

html <!DOCTYPE html> <html lang="en"> <head> <link rel="stylesheet" href="./src/index.css"> </head> <body class="bg-surface-primary text-content-primary"> <!-- Typography samples --> <section class="styleguide-section"> <h2 class="text-h2 font-heading">Typography Scale</h2> <div class="space-y-8"> <p class="text-display-xl font-display">Display XL</p> <p class="text-h1 font-heading">Heading 1</p> <p class="text-base font-sans">Body text at base size</p> </div> </section>  <!-- Color swatches --> <section class="styleguide-section"> <h2 class="text-h2 font-heading">Color Tokens</h2> <div class="grid grid-cols-4 gap-4"> <div class="swatch bg-surface-primary border"></div> <div class="swatch bg-interactive-primary"></div> </div> </section> </body> </html>

The styleguide includes:

Typography samples at every scale

Color swatches with semantic labels

Component primitives (buttons, cards, forms)

Spacing examples using the token scale

Dark mode toggle for instant theme switching

UX Polish: The Details That Matter

Design System 2.0 wasn't complete until we addressed the small interactions that make interfaces feel polished:

Dark Mode by Default

We changed the theme initialization to prefer dark mode unless the user's OS explicitly requests light mode:

js

javascript // Before: defaulted to light mode const theme = savedTheme || (prefersDark ? 'dark' : 'light');  // After: defaults to dark mode const theme = savedTheme || (prefersLight ? 'light' : 'dark');

This small change dramatically improved first impressions for the majority of users who prefer dark interfaces.

Button Hover States
Primary buttons now show a subtle border on hover, improving affordance:

btn

css .btn-primary { border: 1px solid transparent; transition: background-color 0.2s, border-color 0.2s; }  .btn-primary:hover { background-color: var(--color-interactive-hover); border-color: var(--color-border-primary); }

This prevents layout shift while providing clear hover feedback.

White Background Sections

Hero and About sections now have explicit white backgrounds that persist in dark mode, creating intentional contrast:

.jsx

jsx <div className="bg-white dark:bg-white"> <HeroSection /> <About /> </div>

All text within these sections was adjusted to black/gray for maximum readability.

Comparison

Before and after

[IMAGE: Before/after comparison showing improved button hover states and white background sections]

The Impact: Measurable Improvements

Since implementing Design System 2.0, we've seen:

60% reduction in CSS file size across all apps (from 847KB to 340KB combined)

Zero dark mode bugs in the last two months (previously 2-3 per week)

50% faster component development (shared primitives mean less reinvention)

100% design token coverage (no more hardcoded colors or spacing)

More  importantly, the system has made our codebase feel **coherent**. When  you move between the main site, foundry app, and font viewer, the  experience is seamless. Everything feels like part of the same product  because it is.

Lessons Learned

Building a design system for a small team requires different trade-offs than enterprise systems:

Start with constraints, not flexibility.  We could have built a system with 50 color tokens and 20 spacing  values. Instead, we chose 8 color tokens and 6 spacing values. Fewer  choices mean faster decisions.

Semantic tokens prevent bike-shedding.  When a developer needs a border color, they use  `--color-border-primary`. No debates about whether `#e5e5e5` or  `#e8e8e8` is the "right" gray.

The styleguide is non-negotiable. Without a living reference, design systems decay. Our styleguide ensures tokens stay in sync with reality.

Dark mode isn't an afterthought. Treating dark mode as a first-class citizen from the start meant fewer hacks and better color choices.

Document everything.  Future you (and future team members) will thank you. Our `LLM_RULES.md`  and `RULES_STRUCTURE.md` files capture decisions that would otherwise  be lost.

What's Next

Design System 2.0 is complete, but design systems are never truly finished. Our roadmap includes:
- **Component variants** (outlined buttons, ghost buttons, pill shapes)
- **Animation tokens** (duration, easing curves)
- **Accessibility audit** (WCAG 2.1 AA compliance)
- **Responsive spacing** (fluid typography and spacing scales)

But  for now, we have something rare: a design system that feels finished  enough to build on, simple enough to maintain, and comprehensive enough  to cover 95% of our needs.

And that's exactly what a small team needs.


---


- System 2.0 gemini

Building Design System 2.0: The Quest for Sanity 🧘

When we finally decided to pull four separate, messy projects into one monorepo, one agonizing truth became crystal clear: Our design wasn't broken, but our tokens were.

Every time we needed a secondary gray, we got four different hex codes. Every time we tried to update a font size, we were chasing 23 variations across half a dozen stylesheets. We were wasting time, fighting friction, and drowning in maintenance. Design System 2.0 wasn't about making things prettier; it was about building a foundation that let our tiny team scale our ambitions without losing our minds.

The Messy Audit: Finding 7 Shades of Gray

Before we could build the dream, we had to confront the nightmare. We did a full design audit, which was both hilarious and depressing:

Color Chaos: We discovered 7 distinct shades of gray being used for "secondary text." Seven!

Theming Anxiety: Dark mode was a Frankenstein's monster—a mix of custom classes and random data attributes that broke every Tuesday.

Typography Drift: Our body text sizes ranged from 14px to 18px depending on which project file you looked at.

The audit told us: we were building four versions of the same product.

The Solution: Semantic Tokens—Talking About Intent

We knew the solution wasn't just new tokens, but smart tokens. We created a single source of truth in our packages/ui/theme.css file, built on Tailwind v4's CSS-first approach.

Colors: Naming Our Intent

The magic came from moving past raw hex codes (like #171717) and into semantic tokens. Instead of a developer asking, "Which black should I use?", they simply ask the system: "Give me the primary content color."

--color-surface-primary: What things sit on.

--color-content-primary: The main text and icons.

This instantly solved our dark mode problem. Components don't have to know if it's light or dark; they just use the semantic token, and the CSS handles the elegant color swap for us. It just works.

Typography: A Foundation for Focus

We locked down our typeface choices and created a rational scale—no more arbitrary sizing. We chose a simple div 4/8 scale so every size feels intentional and consistent. By using $\text{90-95%}$ line heights for display text and $\text{150-160%}$ for body text, we ensured our typography felt clean and comfortable across the board.

The Styleguide: A Living Proof of Concept

A design system is useless if no one trusts it. So we built our interactive styleguide—a simple HTML file that imports the exact same production CSS as the main site.

It's a QA tool, a visual reference, and a living demonstration all in one. If the color swatch in the styleguide is wrong, the production site is wrong. It ensures our tokens never lie.

UX Polish: The Details That Matter

We tackled the little things that make an interface feel premium:

Dark Mode by Default: We flipped the default. If your OS doesn't specify a preference, we assume dark mode—a tiny change that improved the first impression for the majority of our users.

Button Feedback: Our primary buttons now get a subtle border on hover. It's a small detail, but it prevents layout shifting and makes the interaction feel solid and intentional.

The Payoff: Consistency is Confidence

Since launching Design System 2.0, the results have been phenomenal:

We cut our combined CSS file size by $\text{60%}$! That's hundreds of kilobytes of redundant code wiped out.

We've had zero dark mode bugs in months (a minor miracle).

Our component development is $\text{50%}$ faster because we never have to invent a button or a card again.

The biggest win is psychological: our entire codebase now feels coherent. Moving between the main site, the Foundry tool, and the font viewer is seamless. Everything feels like part of the same product because it is.

Our advice to other small teams: start with constraints, not flexibility. Fewer choices mean faster decisions. Focus on semantic tokens, make the styleguide non-negotiable, and trust that the work of consolidation pays off in development confidence.


---
