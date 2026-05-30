import PageSection from '../components/framework/PageSection'
import { Table, Badge } from '@kol/component'
import usePageTitle from '../components/hooks/usePageTitle'
import { BRAND_INFO } from '../brand/data/info'
import {
  BIO,
  TIMELINE, EDUCATION, WORK, EXHIBITIONS, MUSIC,
  PRESS, AWARDS, PROFILES,
  COMPANIES, COLLABORATIONS, SOCIAL,
  VENDORS, STACK, OPEN_QUESTIONS,
} from '../brand/data/business-data'

/* ── Helpers ── */

const Meta = ({ children }) => <span className="kol-helper-12 text-meta">{children}</span>

const yearDesc = (a, b) => (b.year ?? 0) - (a.year ?? 0)

const KindBadge = ({ kind }) => {
  const map = {
    education:  'info',
    work:       'success',
    award:      'warning',
    type:       'info',
    exhibition: 'default',
    video:      'outline',
    music:      'default',
    milestone:  'outline',
    press:      'outline',
    profile:    'outline',
  }
  return <Badge variant={map[kind] ?? 'outline'} size="sm">{kind}</Badge>
}

const StatusBadge = ({ status }) => {
  const map = {
    active: 'success', shipped: 'success', proposed: 'info', planned: 'warning',
    tbd: 'outline', unrelated: 'destructive', archived: 'outline', past: 'outline',
    renamed: 'info',
  }
  return <Badge variant={map[status] ?? 'outline'} size="sm">{status}</Badge>
}

/* "year" / "year–endYear" pretty render. */
const formatYear = (r) => {
  if (r.year && r.endYear) return `${r.year}–${r.endYear}`
  if (r.year)              return String(r.year)
  return '—'
}

/* Media-type badge rendered inline next to a title for video / archive / etc. */
const MediaBadge = ({ mediaType }) => {
  if (!mediaType) return null
  const map = { video: 'critical', archive: 'info', release: 'success', 'photo-gallery': 'outline' }
  return <Badge variant={map[mediaType] ?? 'outline'} size="sm" className="ml-2">{mediaType}</Badge>
}

/* Shared link style for outbound rows. */
const linkClass = 'text-emphasis underline underline-offset-4 decoration-fg-24 hover:decoration-fg-64'

/* ── Tables ── */

const identityRows = [
  { field: 'Founder',       value: BRAND_INFO.identity.founder },
  { field: 'Role',          value: BRAND_INFO.identity.role },
  { field: 'Brand',         value: BRAND_INFO.identity.name },
  { field: 'Established',   value: BRAND_INFO.identity.established },
  { field: 'Studio',        value: `${BRAND_INFO.studio.street}, ${BRAND_INFO.studio.postcode}, ${BRAND_INFO.studio.country}` },
  { field: 'Email',         value: BRAND_INFO.contact.email },
  { field: 'Phone',         value: BRAND_INFO.contact.phone },
  { field: 'Web',           value: BRAND_INFO.contact.web },
  { field: 'Legal entity',  value: BRAND_INFO.legal.entity },
  { field: 'Kennitala',     value: BRAND_INFO.legal.kt },
]

const identityCols = [
  { accessor: 'field', header: 'Field', render: (r) => <Meta>{r.field}</Meta> },
  { accessor: 'value', header: 'Value', render: (r) => <span className="text-emphasis">{r.value}</span> },
]

const timelineCols = [
  { accessor: 'year',  header: 'Year',  render: (r) => <span className="text-emphasis">{formatYear(r)}</span> },
  { accessor: 'kind',  header: 'Kind',  render: (r) => <KindBadge kind={r.kind} /> },
  { accessor: 'title', header: 'Title', render: (r) => (
      <span>
        {r.href
          ? <a href={r.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.title}</a>
          : <span className="text-emphasis">{r.title}</span>}
        <MediaBadge mediaType={r.mediaType} />
      </span>
  ) },
  { accessor: 'org',   header: 'Org / Outlet', render: (r) => <span className="text-body">{r.org}</span> },
  { accessor: 'notes', header: 'Notes',        render: (r) => <Meta>{r.notes ?? '—'}</Meta> },
]

const companyCols = [
  { accessor: 'name',   header: 'Company', render: (r) => <span className="text-emphasis">{r.name}</span> },
  { accessor: 'role',   header: 'Role',    render: (r) => <span className="text-body">{r.role}</span> },
  { accessor: 'years',  header: 'Years',   render: (r) => <Meta>{r.years}</Meta> },
  { accessor: 'status', header: 'Status',  render: (r) => <StatusBadge status={r.status} /> },
  { accessor: 'notes',  header: 'Notes',   render: (r) => <Meta>{r.notes}</Meta> },
]

const collabCols = [
  { accessor: 'client', header: 'Client',  render: (r) => <span className="text-emphasis">{r.client}</span> },
  { accessor: 'type',   header: 'Kind',    render: (r) => <Badge variant="outline" size="sm">{r.type}</Badge> },
  { accessor: 'year',   header: 'Year',    render: (r) => <Meta>{r.year ?? '—'}</Meta> },
  { accessor: 'notes',  header: 'Notes',   render: (r) => <Meta>{r.notes}</Meta> },
]

const socialCols = [
  { accessor: 'platform', header: 'Platform', render: (r) => <span className="text-emphasis">{r.platform}</span> },
  { accessor: 'handle',   header: 'Handle',   render: (r) => <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.handle}</a> },
  { accessor: 'notes',    header: 'Notes',    render: (r) => <Meta>{r.notes ?? '—'}</Meta> },
]

const profileCols = [
  { accessor: 'title', header: 'Profile',  render: (r) => r.href
      ? <a href={r.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.title}</a>
      : <span className="text-emphasis">{r.title}</span> },
  { accessor: 'org',   header: 'Platform', render: (r) => <span className="text-body">{r.org}</span> },
  { accessor: 'notes', header: 'Notes',    render: (r) => <Meta>{r.notes ?? '—'}</Meta> },
]

const vendorCols = [
  { accessor: 'name',   header: 'Name',  render: (r) => r.url
      ? <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.name}</a>
      : <span className="text-emphasis">{r.name}</span> },
  { accessor: 'role',   header: 'Role',   render: (r) => <span className="text-body">{r.role}</span> },
  { accessor: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { accessor: 'notes',  header: 'Notes',  render: (r) => <Meta>{r.notes}</Meta> },
]

const stackCols = [
  { accessor: 'layer',  header: 'Layer',  render: (r) => <span className="text-emphasis">{r.layer}</span> },
  { accessor: 'choice', header: 'Choice', render: (r) => <span className="text-body">{r.choice}</span> },
  { accessor: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const gapsCols = [
  { accessor: 'topic', header: 'Topic', render: (r) => <span className="text-emphasis">{r.topic}</span> },
  { accessor: 'note',  header: 'Note',  render: (r) => <span className="text-body">{r.note}</span> },
]

/* ── Page ── */

export default function Kolkrabbi() {
  usePageTitle(`Kolkrabbi · ${BIO.displayName} · Source of truth`)

  const timelineDesc = [...TIMELINE].sort(yearDesc)
  const videoRows    = TIMELINE.filter((t) => t.kind === 'video').sort(yearDesc)

  const counts = {
    timeline:       TIMELINE.length,
    education:      EDUCATION.length,
    work:           WORK.length,
    exhibitions:    EXHIBITIONS.length,
    music:          MUSIC.length,
    press:          PRESS.length,
    awards:         AWARDS.length,
    companies:      COMPANIES.length,
    collaborations: COLLABORATIONS.length,
    social:         SOCIAL.length,
    profiles:       PROFILES.length,
  }

  return (
    <main className="kol-page">
      <PageSection
        id="overview"
        label="Kolkrabbi · Source of truth"
        title={BIO.fullName}
        body="Single-page registry of everything we know about the founder + studio: identity, career timeline, art, music, press, collaborators, vendors, and open gaps. All data drawn live from the project's data files — edit once, propagate everywhere."
      >
        <div className="kol-prose mt-12">
          <p>
            <strong>Snapshot.</strong> {counts.timeline} dated career events —
            {' '}{counts.education} education · {counts.work} roles ·
            {' '}{counts.exhibitions} exhibitions · {counts.music} music entries ·
            {' '}{counts.press} press citations · {counts.awards} awards ·
            {' '}{counts.companies} companies · {counts.collaborations} collaborators ·
            {' '}{counts.social} social channels · {counts.profiles} profiles.
          </p>
        </div>
      </PageSection>

      <PageSection id="identity" label="01 — identity" title="Identity" body="Pulled live from src/brand/data/info.js.">
        <div className="mt-8"><Table columns={identityCols} rows={identityRows} /></div>
      </PageSection>

      <PageSection id="bio" label="02 — bio" title="Bio" body="Designer, artist & musician — founder of Kolkrabbi.">
        <div className="kol-prose mt-12">
          <p>
            <strong>From.</strong> {BIO.hometown} (b. {BIO.birthYear}). Based in {BIO.currentCity}. Also known as {BIO.aliases.join(' · ')} (music as Konsulat).
          </p>
          <p style={{ margin: '0 0 24px' }}>{BIO.bio}</p>
        </div>
      </PageSection>

      <PageSection id="timeline" label="03 — career timeline" title="Career timeline" body="Education, work, exhibitions, type, music, press, awards, milestones — sorted newest first.">
        <div className="mt-8"><Table columns={timelineCols} rows={timelineDesc} /></div>
      </PageSection>

      <PageSection id="press" label="04 — press" title="Press archive" body="Reviews, interviews, and mentions across art, music, and design. One item is authored by Þórður (an op-ed), not about him — flagged in its notes.">
        <div className="mt-8"><Table columns={timelineCols} rows={[...PRESS].sort(yearDesc)} /></div>
      </PageSection>

      <PageSection id="awards" label="05 — awards & education" title="Awards & education" body="Recognition + formal education credentials.">
        <div className="mt-8"><Table columns={timelineCols} rows={[...AWARDS, ...EDUCATION].sort(yearDesc)} /></div>
      </PageSection>

      <PageSection id="video" label="06 — video / direction" title="Video & direction" body="Music-video direction and experimental film work, c. 2008–2012.">
        <div className="mt-8"><Table columns={timelineCols} rows={videoRows} /></div>
      </PageSection>

      <PageSection id="companies" label="07 — companies" title="Companies & projects" body="Studio, bands, and labels founded or co-founded.">
        <div className="mt-8"><Table columns={companyCols} rows={COMPANIES} /></div>
      </PageSection>

      <PageSection id="collaborations" label="08 — collaborations" title="Collaborations & clients" body="Design clients and commissions — brand systems, identity, and UI/UX.">
        <div className="mt-8"><Table columns={collabCols} rows={COLLABORATIONS} /></div>
      </PageSection>

      <PageSection id="social" label="09 — social" title="Social presence" body="Public studio + personal channels.">
        <div className="mt-8"><Table columns={socialCols} rows={SOCIAL} /></div>
      </PageSection>

      <PageSection id="profiles" label="10 — profiles" title="Profiles" body="Portfolio and artist profiles across the web.">
        <div className="mt-8"><Table columns={profileCols} rows={PROFILES} /></div>
      </PageSection>

      <PageSection id="vendors" label="11 — vendors" title="Vendors & services" body="Active and planned vendors backing the studio + site.">
        <div className="mt-8"><Table columns={vendorCols} rows={VENDORS} /></div>
      </PageSection>

      <PageSection id="stack" label="12 — stack" title="Tech stack & decisions" body="What we ship, what is proposed, what is planned.">
        <div className="mt-8"><Table columns={stackCols} rows={STACK} /></div>
      </PageSection>

      <PageSection id="gaps" label="13 — gaps" title="Open questions" body="Things the data files can't answer yet — need first-party confirmation before they're treated as canonical.">
        <div className="mt-8"><Table columns={gapsCols} rows={OPEN_QUESTIONS} /></div>
      </PageSection>
    </main>
  )
}
