import { useEffect, useMemo, useState } from 'react'
import { ContentFilters, ContentCollection, ContentCard, ContentRow } from '@kolkrabbi/kol-component'
import { PageHeader } from '@kolkrabbi/kol-shell'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'

/**
 * LibraryLocal — `/library/local`: the repo's OWN images (`public/images/<group>/`),
 * indexed by `photoIndexPlugin` into `/__photos.json`. No client, no bucket —
 * the third library page (user 2026-08-27: "and local gallery").
 *
 * On the content-card family, like every other listing on the site: the folder
 * groups are a filter, the wall is `ContentCollection` six across, the item is
 * `ContentCard default` (the media tile) / `ContentRow default`. The retired
 * page's click-to-enlarge-in-place is gone — a card opens the file.
 */
export default function LibraryLocal() {
  usePageTitle('Local')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/__photos.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then(setData)
      .catch(setError)
  }, [])

  /* flat items — `name` is one of ContentFilters' default searchKeys */
  const items = useMemo(
    () => (data?.groups ?? []).flatMap((g) => g.files.map((src) => ({ src, name: src.split('/').pop(), group: g.name }))),
    [data],
  )
  const groups = useMemo(() => (data?.groups ?? []).map((g) => g.name), [data])

  return (
    <PageSection id="library-local">
      <PageHeader size="sm" voice="mono" title="Local" subtitle="The images this repo ships — public/images, grouped as on disk." />
      {error ? (
        <p className="kol-mono-12 text-fg-64">
          Index unavailable: {String(error.message ?? error)}. Is <code>photoIndexPlugin</code> serving <code>/__photos.json</code>?
        </p>
      ) : (
        <ContentFilters
          tone="inverse"
          items={items}
          title="Images"
          totalCount={items.length}
          searchKeys={['name']}
          filterGroups={[{ label: 'Group', key: 'group', values: groups }]}
          mutuallyExclusiveFilters={['group']}
          showCountOnlyWhenFiltering
          layoutOptions={[{ value: 'list', label: 'LIST' }, { value: 'grid', label: 'GRID' }]}
          layoutClassName="kol-helper-14"
          defaultLayout="grid"
          renderItem={(rows, _view, layout) => {
            const list = layout === 'list'
            const Item = list ? ContentRow : ContentCard
            return (
              <ContentCollection form={list ? 'list' : 'grid'} cols={6}>
                {rows.map((item) => (
                  <Item
                    key={item.src}
                    variant="default"
                    title={item.name}
                    meta={item.group}
                    media={<img src={item.src} alt="" loading="lazy" />}
                    href={item.src}
                    onNavigate={(e) => { e.preventDefault(); window.open(item.src, '_blank', 'noreferrer') }}
                  />
                ))}
              </ContentCollection>
            )
          }}
        />
      )}
    </PageSection>
  )
}
