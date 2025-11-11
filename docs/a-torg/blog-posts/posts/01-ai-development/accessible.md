# The AI Teacher: Building a Local Server and Deploying My Own Agent Army

*Accessible Guide • 8 min read*

**Author:** Tór Grímsson
**Date:** November 4, 2025

---

## Introduction

I used an AI to teach me how to build a full development environment from scratch—from setting up a Linux server on my Mac to deploying an army of autonomous AI agents in VSCode to build a project for me.

This is the story of how a designer finally demystified the term "server" and learned to code without writing much code at all.

## 1. The Lightbulb Moment: Why a Virtual Machine?

For too long, concepts like "the server" and network settings felt like technical wizardry. But with access to smart LLMs like Claude and Gemini, I realized I could use AI as a patient, tireless teacher.

### My Goal

I wanted to demystify these fuzzy concepts by building a real, self-hosted system. After some research, I stumbled upon Virtual Machines (VMs). The idea was brilliant: I could create an isolated container inside my Mac, install a full Linux OS (Ubuntu), and let it be my dedicated utility machine.

### The Possibilities Were Huge

1. **Finally learn Linux**
2. **Host a proper Plex server**
3. **Block ads network-wide** for every device on my WiFi (hello, Pi-hole style ad blocker!)
4. **Create a clean, isolated development environment** for my new AI project

## 2. The Foundation: Building My Local Server

To make this work, I needed a proper server setup.

### The VM Setup (The Box)

I used UTM (a free virtualization app) on my iMac to configure an Ubuntu Desktop VM. I gave it a healthy 8 GB of RAM and 4 CPU cores. Crucially, I set the network to "Bridged Mode" so the VM got its own unique, accessible IP address on my home network (192.168.1.40).

### The Remote Connection (The Key)

A server isn't useful if you can't talk to it easily. I installed OpenSSH server on Ubuntu. This allowed me to use VSCode's Remote-SSH extension on my MacBook. Now, I can lounge on my couch, SSH into the Ubuntu VM running on the iMac, and work directly on the server files and terminal as if they were local.

This is the definition of a modern, powerful dev workflow.

## 3. Deploying the Agent Army with CrewAI

With the server running, it was time to deploy the AI team. I was looking for a multi-agent framework—a system that could coordinate multiple AIs with different roles.

### The Framework Choice

I evaluated the big players (LangGraph, AutoGen) but settled on **CrewAI**. Why? It embraces an "80% configuration, 20% code" philosophy. It's role-based and largely configured using YAML, a human-readable format. This allowed me to focus on what the agents should do, not how to write all the code.

### The Setup Flow

**Isolated Environment:** I started by creating a dedicated Python virtual environment (venv) in Ubuntu to keep dependencies clean—a vital Linux lesson.

**Scaffolding:** Used the `crewai create` command to generate the project structure.

**LLM Choice:** My initial attempt with Gemini failed due to tricky LiteLLM routing. I made a fast pivot to Anthropic Claude Sonnet 4.5—a reminder that tool maturity sometimes trumps model preference.

## 4. Making Them Responsible: Linear API Integration

I didn't just want agents to code; I wanted them to act like a real team. That meant tracking their work.

I integrated the Linear GraphQL API. This required creating a custom tool in Python that the agents could call. Now, when the Project Manager Agent gets a task (like "build a contact form"), its first job is to:

1. **Break the request down** into smaller, actionable tasks (e.g., UI Design, Backend API, Testing)
2. **Use the custom tool** to create a new Linear Issue for each sub-task

The result? The agents autonomously planned the project, logged their work, and then executed the tasks sequentially, passing their "context" (like notes and initial plans) to the next agent in the crew.

## 5. Execution and the Final Result

I ran the crew from my MacBook's VSCode session, watching the terminal on the remote VM spring to life:

```
# Working Agent: project_manager
## Task: plan_project
Status: ✅ Completed
└─ Used Create Linear Issue (3 times)
# Working Agent: developer
## Task: build_form
Status: ✅ Completed
```

### The Output

The agents successfully generated six new Linear issues and produced a **fully functional contact form** with responsive design, client-side validation, and modern CSS.

To view the output, I used the classic Linux solution: Python's built-in `http.server`, allowing me to access the HTML file in my Mac's browser at `http://192.168.1.40:5050/`.

## 6. The Core Lessons Learned

### Isolation is Freedom
A Virtual Machine is the ultimate tool for learning without risk.

### The Power of Roles
CrewAI proves that decomposing a complex problem into specialized agent roles (Project Manager, Designer, Developer) is far more effective than asking a single LLM to do everything.

### The 80/20 Rule
Using YAML configuration for the roles and tasks meant I got huge complexity with minimal Python code.

### Utility Server
The VM isn't just for AI; it's a powerful host for utilities like AdGuard Home, which is now running on my 192.168.1.40 server, **blocking ads network-wide**.

## 7. Bonus: The Ultimate Ad Blocker

I installed AdGuard Home on the Ubuntu VM. After disabling Ubuntu's default DNS service and pointing my home router's DNS to the VM's IP (192.168.1.40), I now have a network-wide ad blocker that catches ads on every device using my WiFi—a sweet reward for the hard work!

## 8. The Business Value

### What This Enabled

This project opened doors to:
- **Remote server management** from anywhere
- **Autonomous AI development** without constant supervision
- **Network-wide privacy** with ad and tracker blocking
- **Learning platform** for experimenting with AI and automation

### The Total Setup

The total setup took about **6 hours**, and the result is an autonomous, fully documented project workflow running on my very own self-hosted server.

## Conclusion: Architecture as Education

I love this setup! The real value wasn't the contact form—it was demystifying complex infrastructure concepts and proving that with AI guidance, a designer can build sophisticated systems without years of traditional training.

**What's the next big technical concept you plan to demystify with your new server and agent army?**

---

### Quick Reference

**Tools Used:**
- Ubuntu Desktop 24.04 LTS (VM)
- UTM (macOS virtualization)
- VSCode Remote-SSH
- CrewAI (multi-agent framework)
- Anthropic Claude Sonnet 4.5
- Linear API (project management)
- AdGuard Home (network-wide ad blocking)

**Key Takeaways:**
- AI can teach complex infrastructure concepts
- Multi-agent systems excel at task specialization
- Self-hosted environments provide unlimited experimentation
- Tool maturity often matters more than cutting-edge features