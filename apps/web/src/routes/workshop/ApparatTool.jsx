import { useNavigate } from 'react-router-dom'
import { PageSection } from '@kolkrabbi/kol-framework'
import { Button } from '@kolkrabbi/kol-component'

// Per-tool about page: concept, story, stack, links — the frame lives at
// apparat/<id>/live (about/preview split law: this page never iframes).
const ApparatTool = ({ tool }) => {
  const navigate = useNavigate()

  return (
    <div>
      <PageSection
        id={`${tool.id}-about`}
        label={`Scope: Apparat — ${tool.label}`}
        title={tool.label}
        body={tool.concept}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={() => navigate(`/workshop/apparat/${tool.id}/live`)} iconLeft="maximize" iconRight="caret-right">
            Open {tool.label}
          </Button>
          <Button variant="ghost" quiet href={tool.live} target="_blank" rel="noreferrer" iconRight="external-link">
            Live deploy
          </Button>
          <Button variant="ghost" quiet href={tool.repo} target="_blank" rel="noreferrer" iconLeft="code" iconRight="external-link">
            GitHub
          </Button>
          {(tool.links || []).map((l) => (
            <Button key={l.href} variant="ghost" quiet href={l.href} target="_blank" rel="noreferrer" iconRight="external-link">
              {l.label}
            </Button>
          ))}
        </div>
      </PageSection>

      {tool.approach && (
        <PageSection id={`${tool.id}-approach`} label="Approach" title="How it works" body={tool.approach} />
      )}

      {tool.stack && (
        <PageSection id={`${tool.id}-stack`} label="Stack" title="Built with" body={tool.stack} />
      )}
    </div>
  )
}

export default ApparatTool
