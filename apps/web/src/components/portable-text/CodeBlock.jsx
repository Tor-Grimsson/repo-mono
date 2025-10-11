import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ value }) => {
  const { language, code, filename } = value

  // Custom styles to fix rendering issues
  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontSize: '14px',
      lineHeight: '1.6',
      textShadow: 'none',
      letterSpacing: '0',
      overflow: 'visible',
      border: 'none',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: 'var(--font-family-mono)',
      fontSize: '14px',
      textShadow: 'none',
      letterSpacing: '0',
      textDecoration: 'none',
      display: 'block',
    },
  }

  return (
    <div className="code-block-wrapper">
      {filename && <div className="code-filename">{filename}</div>}
      <div className="code-block">
        <SyntaxHighlighter
          language={language || 'text'}
          style={customStyle}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflow: 'visible',
            height: 'auto',
            maxHeight: 'none',
          }}
          wrapLines={true}
          wrapLongLines={true}
          PreTag="div"
          lineProps={{
            style: {
              border: 'none',
              background: 'transparent',
              display: 'block',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
