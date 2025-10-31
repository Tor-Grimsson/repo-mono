import { Fragment, useEffect, useMemo, useState, useCallback } from 'react'
import { Pill, Divider } from '@kol/ui'
import StickyNavCard from '../blocks/StickyNavCard'

const SAMPLE_ARTICLE = {
  tags: ['Agents', 'LLM Workflow', 'Virtual Machines'],
  title: 'Using an LLM to Teach Me Stuff: Virtual Machine, Local Server, and Deploying an Army of Agents to Work for Me in VSCode',
  excerpt:
    'This is a semi-technical walkthrough on how I set this up, from Linux VM (Ubuntu), SSH server connection to VSCode, CrewAI agent dispatch, and having them log the work through Linear API. With a bonus Pi-hole-style ad blocker on the VM.',
  author: {
    name: 'Tór Grímsson',
    avatar: 'https://placehold.co/96x96',
    role: 'Systems tinkerer'
  },
  date: 'Oct 11, 2025',
  readingTime: '9 min read',
  heroImage: 'https://placehold.co/1200x720',
  callout: {
    title: 'Network-wide DNS-level ad blocker running on the Ubuntu VM.',
    highlight: 'Installation',
    command:
      'curl -s -S -L https://raw.githubusercontent.com/AdGuardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v',
    sources: [
      { label: '[1]', title: 'LangGraph GitHub' },
      { label: '[2]', title: 'CrewAI GitHub' },
      { label: '[3]', title: 'Multi-Agent Systems Overview' },
      { label: '[4]', title: 'Ubuntu Desktop Download' },
      { label: '[5]', title: 'UTM Releases' },
      { label: '[6]', title: 'CrewAI Documentation' },
      { label: '[7]', title: 'Linear API Docs' },
      { label: '[8]', title: 'LangGraph Multi-Agent Patterns' },
      { label: '[9]', title: 'AdGuard Home GitHub' }
    ],
    tags: ['Virtual Machine', 'Ubuntu', 'CrewAI', 'LLM']
  },
  summary: [
    {
      heading: 'Ubuntu VM Setup',
      body: 'How the virtual machine was provisioned in UTM, from CPU cores to networking mode.',
      bullets: [
        'Download Ubuntu Desktop ISO 24.04 LTS (5–6 GB)',
        'Install UTM (free virtualisation on macOS)',
        'Assign 8 GB RAM, 4 vCPU cores, 50 GB storage',
        'Install OpenSSH server during setup'
      ]
    },
    {
      heading: 'SSH & VSCode',
      body: 'Establish remote development using VSCode Remote-SSH with host-specific config.',
      bullets: [
        'Enable “Bridged Mode” networking for LAN reachability',
        'Create SSH config entry with identity file & host alias',
        'Install VSCode Remote Development pack',
        'Test login: `ssh ubuntu@192.168.0.140`'
      ]
    },
    {
      heading: 'Agent Stack',
      body: 'CrewAI orchestrates multi-agent flows that report progress into Linear issues.',
      bullets: [
        'AutoGen for stand-alone experimentation',
        'CrewAI for task routing and reporting',
        'LangChain for tooling abstractions'
      ]
    }
  ],
  sections: [
    {
      title: '1. Research: Finding a Project to Solidify Things I Had Been Thinking About',
      paragraphs: [
        'I’ve always wanted to be more technically savvy, but I gave myself excuses not to embrace the idea—“I’m a designer” or “I run a studio” or “I don’t have time.” With modern LLM copilots, those excuses dissolved. The goal: demystify how servers, VMs, and network tooling actually work so I can build the stack I’ve daydreamed about.',
        'It started with the simple idea of understanding “the server.” I wanted a concrete definition, not just an abstract cloud. That quest sent me down the rabbit hole: learning core networking commands, experimenting with SSH tunnels, scanning the local network with nmap, and even hosting a local LLM. These experiments naturally led to virtual machines, which turned out to be the perfect playground.'
      ],
      listIntro: 'Four reasons the VM approach clicked immediately:',
      ordered: [
        'Learning Linux in a contained, recoverable sandbox.',
        'Hosting a proper Plex and media stack without touching my main machine.',
        'Automating download workflows remotely (hello, couch DevOps).',
        'Blocking ads for every device on my network with a Pi-hole style setup.'
      ],
      closing:
        'If I’m already building this site with LLM support, why not go further? The idea: give a crew of agents dedicated roles, trigger their work from my laptop, let them collaborate in VSCode over SSH, and ask them to log progress directly into Linear.'
    },
    {
      title: '2. Ubuntu VM Setup',
      paragraphs: [
        'Creating the playground started with a familiar tool: UTM. I grabbed the latest Ubuntu Desktop ISO, carved out 8 GB of RAM, four CPU cores, and a 50 GB disk image, then enabled “bridged” networking so the VM would look like any other machine on my LAN.',
        'The only “gotcha” is remembering to install the OpenSSH server during setup. Without it, there’s no remote access. Once the VM booted, I set a static DHCP reservation on my router so the box always comes back as `192.168.0.140`.'
      ],
      codeTitle: 'SSH config snippet',
      code: [
        'Host ubuntu-vm',
        '  HostName 192.168.0.140',
        '  User ubuntu',
        '  IdentityFile ~/.ssh/id_ed25519',
        '  AddKeysToAgent yes',
        '  UseKeychain yes'
      ]
    },
    {
      title: '3. CrewAI + Linear: Logging Work Like a Team',
      paragraphs: [
        'With remote access solved, I connected VSCode using the Remote-SSH extension. Now it was time to let the agents loose. CrewAI provides a neat way to describe roles, delegate tasks, and pass intermediate artefacts around. I wired up a supervisor, a builder, and a QA agent.',
        'Each agent received environment variables for the Linear API so they could create a ticket whenever a milestone was hit. Watching issues pop into the board while the terminal scrolled felt like pairing with a distributed crew.'
      ],
      quote:
        '“My goal wasn’t to automate myself out of the loop, but to amplify the boring parts. Every issue they filed gave me a breadcrumb trail of what happened.”'
    },
    {
      title: '4. VPN & Network Toolbox',
      paragraphs: [
        'A VPN wrapper (Tailscale) ties everything together. It gives each device a stable IP in my personal mesh network, reducing firewall gymnastics. Whenever I need the VM from a café, I simply open VSCode, trigger the SSH connection, and I’m back inside the environment.',
        'For extra fun, I installed AdGuard Home on the VM, routing DNS for the whole household through a single control point. It keeps the browsing experience clean, and the agents enjoy fast package installs without ad tracker noise.'
      ]
    },
    {
      title: '5. What’s Next',
      paragraphs: [
        'This playground isn’t a production deployment, but it’s already reshaped how I learn. Next experiments on the list: container orchestration for agent runtimes, a shared prompt library in the repo, and a UI for toggling agent crews without touching the terminal.',
        'The combination of LLM copilots + a VM sandbox lowered the barrier to entry dramatically. If you’ve been daydreaming about “real” infrastructure, the blueprint above is a weekend project away.'
      ]
    }
  ]
}

const ArticleRichProse = ({ article = SAMPLE_ARTICLE }) => {
  const {
    tags,
    title,
    excerpt,
    author,
    date,
    readingTime,
    heroImage,
    summary,
    sections,
    callout
  } = article

  const sectionAnchors = useMemo(
    () =>
      sections.map((section, index) => {
        const slug =
          section?.title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || `section-${index}`
        return { id: slug, title: section?.title ?? `Section ${index + 1}` }
      }),
    [sections]
  )

  const [activeSummaryIndex, setActiveSummaryIndex] = useState(0)

  const scrollToSection = useCallback((anchorId) => {
    if (!anchorId) return
    const element = document.getElementById(anchorId)
    if (!element) return
    const rect = element.getBoundingClientRect()
    const offset = 120 // Align below sticky header / nav
    const top = rect.top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const observers = sectionAnchors.map(({ id }, index) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSummaryIndex(index)
            }
          })
        },
        {
          root: null,
          threshold: 0.15,
          rootMargin: '-25% 0px -60% 0px'
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [sectionAnchors])

  return (
    <main className="min-h-screen w-full bg-surface-primary text-auto">
      <header className="px-6 lg:px-10 pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
                <Pill key={tag ?? index} variant="inverse">
                  {tag}
                </Pill>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-6">
            <h1 className="kol-heading-display text-balance">{title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-fg-64">
              {author?.name && (
                <div className="flex items-center gap-3">
                  {author?.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="kol-helper-s uppercase text-fg-48">
                      {author.name}
                    </span>
                    {author?.role && (
                      <span className="kol-mono-xs text-fg-64">{author.role}</span>
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 kol-helper-s uppercase text-fg-48">
                {date && <span>{date}</span>}
                {readingTime && <span>• {readingTime}</span>}
              </div>
            </div>

            {excerpt && (
              <p className="kol-mono-text text-fg-64">{excerpt}</p>
            )}
          </div>

          {heroImage && (
            <div className="rounded overflow-hidden border border-auto bg-fg-12">
              <img
                src={heroImage}
                alt=""
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <Divider className="mx-6 lg:mx-10" />

      <section className="px-6 lg:px-10 py-16">
        <div className="max-w-[1200px] mx-auto grid gap-12 lg:grid-cols-[minmax(0,529px)_minmax(0,1fr)] lg:gap-16">
          {Array.isArray(summary) && summary.length > 0 && (
            <aside className="space-y-8">
              <div className="space-y-3">
                <h2 className="kol-heading-sm uppercase">In this playbook</h2>
                <p className="kol-mono-sm-fine text-fg-64">
                  A condensed outline in case you want the high-level steps before diving in.
                </p>
              </div>
              <div className="space-y-6 lg:sticky lg:top-28">
                {summary.map(({ heading, body, bullets }, index) => {
                  const anchor = sectionAnchors[index]
                  const isActive = activeSummaryIndex === index
                  return (
                    <StickyNavCard
                      key={heading ?? index}
                      heading={heading}
                      body={body}
                      bullets={bullets}
                      index={index}
                      isActive={isActive}
                      onClick={() => scrollToSection(anchor?.id)}
                    />
                  )
                })}
              </div>
            </aside>
          )}

          <article className="space-y-16">
            {sections.map(
              (
                { title: sectionTitle, paragraphs = [], listIntro, ordered, codeTitle, code, quote, closing },
                index
              ) => (
                <section
                  key={sectionTitle ?? index}
                  id={sectionAnchors[index]?.id}
                  className="kol-prose space-y-6 scroll-mt-32"
                >
                  {sectionTitle && <h2>{sectionTitle}</h2>}

                  {paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}

                  {listIntro && <p>{listIntro}</p>}

                  {Array.isArray(ordered) && ordered.length > 0 && (
                    <ol>
                      {ordered.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ol>
                  )}

                  {code && (
                    <Fragment>
                      {codeTitle && <h3>{codeTitle}</h3>}
                      <pre className="bg-surface-secondary text-auto border border-auto rounded-lg p-6 overflow-x-auto">
                        <code className="kol-mono-sm whitespace-pre">
                          {code.join('\n')}
                        </code>
                      </pre>
                    </Fragment>
                  )}

                  {quote && (
                    <blockquote>
                      <p>{quote}</p>
                    </blockquote>
                  )}

                  {closing && <p>{closing}</p>}
                </section>
              )
            )}

            {callout && (
              <section className="space-y-10">
                <div className="space-y-3">
                  <p className="kol-mono-text text-fg-64">{callout.title}</p>
                  {callout.highlight && (
                    <h3 className="kol-helper-md uppercase text-fg-48">{callout.highlight}</h3>
                  )}
                </div>

                {callout.command && (
                  <div className="rounded border border-auto bg-surface-secondary/40 p-6">
                    <pre className="overflow-x-auto">
                      <code className="kol-mono-sm whitespace-pre-wrap break-all">
                        {callout.command}
                      </code>
                    </pre>
                  </div>
                )}

                {Array.isArray(callout.sources) && callout.sources.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="kol-helper-s uppercase text-fg-48">Sources &amp; References</h4>
                    <div className="grid gap-3">
                      {callout.sources.map(({ label, title: sourceTitle }, index) => (
                        <div
                          key={label ?? index}
                          className="rounded-xl border border-auto bg-fg-02 p-4 flex items-center gap-4"
                        >
                          <span className="kol-helper-s uppercase text-fg-64">{label}</span>
                          <span className="kol-mono-text text-fg-48">{sourceTitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Array.isArray(callout.tags) && callout.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {callout.tags.map((calloutTag, index) => (
                      <Pill key={calloutTag ?? index} variant="inverse">
                        {calloutTag}
                      </Pill>
                    ))}
                  </div>
                )}
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}

export default ArticleRichProse
export { SAMPLE_ARTICLE as SAMPLE_RICH_PROSE_ARTICLE }
