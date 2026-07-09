import { useContext, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShellTocContext } from '../../components/shell'
import { PageSection } from '@kolkrabbi/kol-framework'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import { DashMetricCard } from '@kolkrabbi/kol-component/dashboards'

const DOC_LINKS = [
  { id: '5.6.0-dashboard', label: 'Dashboard System' },
  { id: '5.0.0-workshop-index', label: 'Workshop Index' },
]

// Prose companion to the live dashboard — what gets tracked, where the data
// comes from, and how it reaches the cards. Facts mirror apps/web/api/* and
// src/hooks/useMetricsData.js — update here when those change.
const DashboardMetricsSetup = () => {
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent links={DOC_LINKS} />)
    return () => setTocContent(null)
  }, [setTocContent])

  return (
    <div>
      <PageSection
        id="metrics-setup"
        label="Dashboard • Notes"
        title="How the metrics work"
        body="The pipeline behind kolkrabbi.io/metrics — what is tracked, which APIs serve it, and how it reaches the dashboard cards."
      />

      <PageSection
        id="tracking"
        label="Tracking"
        title="Umami"
        body="Site analytics come from a self-hosted Umami instance — first-party, cookieless, no third-party tracker."
      >
        <div className="mt-8 max-w-[60ch] space-y-6 kol-sans-body-02">
          <p>
            Umami runs as its own deployment (kol-umami.vercel.app) and records pageviews,
            visitors, sessions, referrers, countries, and devices across kolkrabbi.io and its
            subdomains. Every tracked host reports into a single website ID, which is why the
            Site tab can filter per host — main site, client subdomains, tool deploys — from one
            dataset.
          </p>
          <p>
            The dashboard never talks to Umami directly. A serverless proxy
            (<code className="kol-helper-12">/api/metrics</code>) logs in server-side, holds the
            bearer token, and caches each range + host combination for five minutes —
            credentials stay out of the browser, and warm instances skip repeat auth round-trips.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="endpoints"
        label="Data sources"
        title="The five endpoints"
        body="Each tab is fed by small serverless functions in apps/web/api — one per source, each with its own cache window."
      >
        <div className="mt-8 max-w-[60ch] kol-sans-body-02">
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>/api/metrics</strong> — the Umami proxy. Traffic, top pages, countries,
              devices, visit breakdown. Cached 5 minutes per range + host.
            </li>
            <li>
              <strong>/api/metrics-repo</strong> — repo stats (components, routes, lines of
              code, commits, session logs). A static snapshot: serverless has no repo access, so
              the numbers are measured locally with <code className="kol-helper-12">git</code> and{' '}
              <code className="kol-helper-12">find</code> and hardcoded periodically.
            </li>
            <li>
              <strong>/api/metrics-sanity</strong> — CMS document counts, type distribution, and
              recent edits, queried live from the Sanity dataset. Cached 10 minutes.
            </li>
            <li>
              <strong>/api/metrics-deploys</strong> — deployment history from the Vercel API:
              state, duration, source, branch. Cached 5 seconds so the deploy strip stays fresh.
            </li>
            <li>
              <strong>/api/metrics-b2</strong> — Backblaze B2 storage: bucket sizes, object
              counts, recent uploads. Cached 15 minutes.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection
        id="rendering"
        label="Client"
        title="From fetch to card"
        body="One hook orchestrates everything; the dashboard components just render what they are handed."
      >
        <div className="mt-8 max-w-[60ch] space-y-6 kol-sans-body-02">
          <p>
            <code className="kol-helper-12">useMetricsData</code> fires all five fetches,
            normalizes the responses, and exposes them as <code className="kol-helper-12">siteData</code>,{' '}
            <code className="kol-helper-12">projectData</code>, <code className="kol-helper-12">sanityData</code>,{' '}
            <code className="kol-helper-12">deploys</code>, and <code className="kol-helper-12">b2Data</code> —
            plus the range and host-filter state. Changing the timeline range or picking a host
            refetches only the Umami proxy; the other sources are independent of both.
          </p>
          <p>
            Rendering is the <Link to="/workshop/dashboard/components" className="underline">dashboard
            component library</Link> — DashMetricCard, DashChartCard, DashListCard, DashTableCard
            and the chart primitives — laid out on the container-query grid, so the same cards
            work full-page on{' '}
            <a href="https://kolkrabbi.io/metrics" target="_blank" rel="noreferrer" className="underline">kolkrabbi.io/metrics</a> and
            embedded in the <Link to="/workshop/dashboard/metrics" className="underline">Metrics page</Link> here
            in the workshop.
          </p>

          <figure>
            <div className="rounded-[4px] overflow-hidden bg-fg-04 border border-fg-08 p-6">
              <DashMetricCard
                label="VISITORS (30D)"
                value="58"
                delta="+3.6% vs prev period"
                borderColor="var(--kol-palette-blue)"
              />
            </div>
            <figcaption className="kol-helper-12 uppercase tracking-wider text-fg-48 mt-2">
              DashMetricCard — label, value, delta. The atom every tab is built from.
            </figcaption>
          </figure>
        </div>
      </PageSection>
    </div>
  )
}

export default DashboardMetricsSetup
