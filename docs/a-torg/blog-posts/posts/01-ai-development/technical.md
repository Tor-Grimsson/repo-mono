# Using an LLM to Teach Me Stuff: Building a Local Server and Deploying My Own Agent Army

*Technical Deep Dive • 15 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

This is a semi-technical walkthrough on how I set up a complete AI-powered development environment from scratch: Linux VM with SSH, CrewAI agent orchestration, Linear API integration, and network-wide ad blocking. The goal was to use LLMs not just as code assistants, but as teachers to demystify complex infrastructure concepts.

The beauty of having access to smart LLMs like Claude and Gemini is that stuff which sounds heavy and daunting gets quickly simplified when you have a little curiosity and AI guidance.

## 1. Research: Finding a Project to Solidify Concepts

### The Problem

I've always wanted to be more technically savvy, but gave myself excuses: "I'm a designer" or "this is too complicated for me." With AI as a teacher, those excuses disappeared.

### The Goal

I decided to demystify "the server" concept. I'd used links between machines, but the architecture was fuzzy. I wanted to understand:
- What constitutes a server?
- How do network settings actually work?
- Can I create a self-hosted system?

### Virtual Machine Epiphany

I learned about Virtual Machines: creating a container inside Mac, installing a full Linux OS, and letting it be a dedicated utility machine. The possibilities excited me:

1. **Learn Linux** (long-time curiosity)
2. **Host a proper Plex server**
3. **Trigger remote downloads and automation**
4. **Block ads network-wide** (Pi-hole style ad blocker)
5. **Deploy AI agents** to build projects autonomously

## 2. Multi-Agent Framework Evaluation

### Framework Comparison

I evaluated the leading multi-agent LLM orchestration frameworks:

**LangGraph**
- 19.4k GitHub stars
- Production-ready with enterprise adoption (Klarna, Replit, Uber)
- Graph-based state management for complex workflows
- Superior debugging via LangSmith integration
- Steeper learning curve but unmatched control

**CrewAI**
- 100k+ developers certified
- Role-based agent system with YAML configuration
- "80% configuration, 20% code" philosophy
- Built-in hierarchical and sequential workflows
- Ideal for beginners with minimal coding requirements

**AutoGen (Microsoft)**
- Conversation-based agent interactions
- AutoGen Studio provides no-code GUI
- Enterprise-grade reliability and error handling

### Why CrewAI

I chose CrewAI because:
- YAML-based configuration (human-readable)
- Minimal coding required
- Fast prototyping path
- Good documentation and community

## 3. Ubuntu VM Setup

### Infrastructure Setup

**VM Configuration:**
- Platform: UTM (free virtualization app for macOS)
- OS: Ubuntu Desktop 24.04 LTS (~5-6 GB)
- Resources: 8 GB RAM, 4 CPU cores
- Storage: 50 GB virtual disk
- Network: Bridged Mode (en1 - WiFi)
- Assigned IP: 192.168.1.40

**Initial Setup:**
```bash
# Install OpenSSH during Ubuntu setup
sudo apt update
sudo apt install openssh-server
```

### Network Configuration

**Shared Network → Bridged Mode:**
- Initially used "Shared Network" (isolated subnet)
- Changed to "Bridged Mode" for local network access
- VM gets unique IP on home network: 192.168.1.40

### SSH Access Setup

**On Ubuntu VM:**
```bash
sudo apt update
sudo apt install openssh-server
```

**On macOS Laptop:**
```bash
# Test connection
ssh kolkrabbi@192.168.1.40
```

### VSCode Remote-SSH Configuration

1. Install Remote-SSH extension
2. Command Palette → Remote-SSH: Open SSH Configuration File
3. Add to `~/.ssh/config`:

```bash
Host ubuntu-vm
HostName 192.168.1.40
User kolkrabbi
```

Result: SSH into VM directly from VSCode on MacBook, working on remote files as if local.

## 4. CrewAI Project Setup

### Python Environment

CrewAI requires isolated Python environments:

```bash
# Create project directory
cd ~
mkdir crewai-test
cd crewai-test

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install CrewAI
pip install crewai crewai-tools
```

### Project Scaffolding

```bash
# Create new crew project
crewai create crew contact-form-builder
cd contact_form_builder
```

**Generated Structure:**
```
contact_form_builder/
├── .env                    # API keys
├── pyproject.toml          # Dependencies
├── README.md
├── knowledge/
│   └── user_preference.txt
└── src/contact_form_builder/
    ├── main.py             # Entry point
    ├── crew.py             # Orchestration logic
    ├── tools/
    │   └── custom_tool.py
    └── config/
        ├── agents.yaml     # Agent definitions
        └── tasks.yaml      # Task definitions
```

## 5. Linear API Integration

### Why Linear?

I didn't want agents to just code; I wanted them to act like a real team and track their work through a proper project management system.

### Setup Process

**1. Generate API Key:**
- Navigate to linear.app
- Settings → API → Personal API Keys
- Create new key with full permissions
- Note team identifier (mine: CRE)

**2. Environment Variables:**
```bash
# .env file
LINEAR_API_KEY=lin_api_your-key-here
LINEAR_TEAM_ID=CRE
```

**3. Custom Tool Implementation:**
Created `src/contact_form_builder/tools/linear_tool.py` with Linear GraphQL API integration.

**Key Detail:** Linear's API requires team UUID (not team key "CRE"), so I added a preliminary query to resolve the identifier.

## 6. LLM Configuration

### Initial Attempt: Google Gemini

During project creation, I selected Gemini:
```bash
MODEL=gemini/gemini-1.5-flash
GEMINI_API_KEY=AIza...
```

**Problem:** LiteLLM (CrewAI's LLM routing layer) tried to use Vertex AI endpoint instead of Google AI Studio, causing authentication failures.

### Solution: Anthropic Claude

```bash
ANTHROPIC_API_KEY=sk-ant-...
MODEL=claude-sonnet-4-5-20250929
```

**Reason for Success:** CrewAI's LiteLLM has mature routing for Anthropic's API, unlike the newer Gemini AI Studio endpoint.

## 7. Agent & Task Configuration

### Agent Definitions (config/agents.yaml)

```yaml
project_manager:
  role: Project Manager & Linear Coordinator
  goal: Break down projects into tasks and create Linear issues
  backstory: >
    You coordinate projects by creating clear, actionable Linear issues.
    You ensure each task has proper descriptions and assignments.

designer:
  role: UI/UX Designer
  goal: Create visually appealing and accessible user interfaces
  backstory: >
    You design interfaces that are both beautiful and functional,
    following modern design principles and accessibility guidelines.

developer:
  role: Full Stack Developer
  goal: Build robust, maintainable code with best practices
  backstory: >
    You write clean, well-documented code that follows industry standards
    and includes proper error handling and validation.
```

### Task Definitions (config/tasks.yaml)

```yaml
plan_project:
  description: >
    Break down building a contact form into specific tasks.
    Create a Linear issue for each major task with clear descriptions.
  expected_output: >
    List of created Linear issue IDs and their titles
  agent: project_manager

design_form:
  description: >
    Design the UI/UX for a contact form with modern styling,
    accessibility features, and responsive design.
  expected_output: >
    Complete HTML/CSS design with accessibility considerations
  agent: designer

build_form:
  description: >
    Build the contact form with client-side validation,
    proper form handling, and integration with the design.
  expected_output: >
    Functional HTML form with JavaScript validation
  agent: developer
```

**Context Flow:** Each task receives outputs from previous tasks, enabling sequential agent collaboration.

## 8. Execution & Debugging

### Running the Crew

```bash
# Activate virtual environment
source ~/crewai-test/venv/bin/activate
cd ~/crewai-test/contact_form_builder

# Execute agents
crewai run
```

### Debugging Process

**Issue 1: Import Error**
```
ImportError: cannot import name 'tool' from 'crewai_tools'
```
**Resolution:** Changed `from crewai_tools import tool` to `from crewai.tools import tool`

**Issue 2: Gemini Model Name**
```
Error: Model gemini/gemini-1.5-flash not found
```
**Resolution:** Switched to Anthropic Claude (superior LiteLLM routing)

### Execution Output

Terminal showed sequential agent activity:

```
# Working Agent: project_manager
## Task: plan_project
Status: ✅ Completed
└─ Used Create Linear Issue (3 times)
# Working Agent: designer
## Task: design_form
Status: ✅ Completed
# Working Agent: developer
## Task: build_form
Status: ✅ Completed
```

### Viewing Output

**Challenge:** VSCode Live Server extension doesn't work with remote SSH files.

**Solution:** Python's built-in HTTP server:

```bash
cd ~/crewai-test/contact_form_builder
python3 -m http.server 5050
# Access from macOS browser:
# http://192.168.1.40:5050/contact_form.html
```

## 9. Results

### Generated Artifacts

The agents successfully created:
- **Six Linear issues** (CRE-1 through CRE-6)
- **Complete HTML contact form** with:
  - Responsive design
  - Client-side validation
  - Character counter
  - Accessible markup (ARIA labels)
  - Modern CSS with gradient background
  - Professional styling

### Key Performance Metrics

- **Setup Time:** ~6 hours including troubleshooting
- **Code Written:** ~150 lines (mostly Python tool definitions)
- **Configuration:** YAML did the heavy lifting
- **Success Rate:** 100% task completion

## 10. Lessons Learned

### Technical Insights

1. **Isolation is Freedom:** Virtual machines eliminate dependency conflicts by isolating dev environments from host systems

2. **Role Decomposition Works:** Multi-agent systems excel at breaking complex tasks into specialized roles (Project Manager, Designer, Developer)

3. **80/20 Rule:** YAML configuration provides huge complexity with minimal Python code

4. **Context Passing:** Agents collaborate through shared context without needing shared memory

5. **API Integration:** Real-world utility requires proper API integrations (Linear, in this case)

### Architecture Decisions

- **Incremental Approach:** Starting simple and adding complexity prevented overwhelm
- **Tool Maturity Matters:** Sometimes established tools trump newer alternatives (Claude over Gemini)
- **Isolation Strategy:** Python virtual environments kept dependencies clean

## 11. Future Enhancements

### Planned Improvements

1. **Tailscale Integration:** Enable remote VM access from anywhere
2. **Hierarchical Processes:** Manager agent delegates to worker agents
3. **Code Execution Tools:** Allow agents to run and test code
4. **Extended Thinking:** Enable complex problem-solving workflows
5. **Additional APIs:** GitHub, Slack, Notion integrations

### Use Case Expansion

- **Plex Server Setup:** Media streaming for home network
- **Download Automation:** Remote trigger and manage downloads
- **Network Monitoring:** System health and security
- **Backup Systems:** Automated data protection

## Bonus: AdGuard Home (Network-Wide Ad Blocking)

### Installation & Setup

**Network-wide DNS-level ad blocker running on Ubuntu VM:**

```bash
curl -s -S -L https://raw.githubusercontent.com/AdGuardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

**Configuration:**
- Access web interface: http://192.168.1.40:3000
- Set admin port: 80, DNS port: 53
- Disable Ubuntu's DNS: `sudo systemctl disable systemd-resolved && sudo systemctl stop systemd-resolved`
- Configure router DNS: Point to 192.168.1.40
- Add blocklists: OISD (https://small.oisd.nl/)
- Configure upstream DNS: 1.1.1.1, 8.8.8.8

**Result:** Network-wide ad blocking for all devices on WiFi. VM must remain running for DNS functionality.

## Conclusion

This project demonstrated a complete AI-powered development workflow:
- Infrastructure setup (Ubuntu VM, SSH, VSCode Remote)
- AI orchestration (CrewAI role-based agents)
- Sequential task execution with context passing
- Linear API integration for project management
- Claude Sonnet 4.5 as reasoning engine

**The Final Result:** Autonomous AI agents that plan, design, code, and track tasks—all running on a self-hosted VM with network-wide ad blocking as a bonus.

**Total Time Investment:** 6 hours
**Outcome:** Complete understanding of server architecture, agent orchestration, and self-hosted development environment

The real victory wasn't the contact form—it was demystifying complex infrastructure concepts and building a foundation for future AI-assisted development projects.