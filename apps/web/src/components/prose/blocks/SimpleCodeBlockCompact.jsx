import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Icon } from '@kol/ui'

// Inline check-mark SVG
const CheckMarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4697 6.41987C19.7626 6.12697 20.2373 6.12697 20.5302 6.41987C20.8231 6.71276 20.8231 7.18752 20.5302 7.48041L10.9443 17.0663C9.87038 18.1401 8.12951 18.1401 7.05561 17.0663L3.46967 13.4804C3.17678 13.1875 3.17678 12.7128 3.46967 12.4199C3.76256 12.127 4.23732 12.127 4.53022 12.4199L8.11615 16.0058C8.60427 16.4938 9.39561 16.4938 9.88373 16.0058L19.4697 6.41987Z" fill="currentColor"/>
  </svg>
)

const SimpleCodeBlockCompact = ({ value }) => {
  const { language, code, filename } = value
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="simple-code-block-compact">
      {filename && <div className="simple-code-header-compact">{filename}</div>}
      <div className="simple-code-inner-compact">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '12px',
            lineHeight: '1.4',
          }}
          PreTag="pre"
        >
          {code}
        </SyntaxHighlighter>
        <button
          className="simple-copy-button-compact"
          onClick={handleCopy}
          aria-label={copied ? 'Code copied!' : 'Copy code'}
          title={copied ? 'Code copied!' : 'Copy code'}
        >
          {copied ? (
            <CheckMarkIcon />
          ) : (
            <Icon name="copy" size={16} />
          )}
        </button>
      </div>
    </div>
  )
}

export default SimpleCodeBlockCompact
