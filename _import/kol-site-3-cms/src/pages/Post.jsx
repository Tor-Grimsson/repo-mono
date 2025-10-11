import React, { useEffect, useRef, useState } from 'react';
import { postContent } from '../data/content';

const Post = () => {
  const [progress, setProgress] = useState(0);
  const postRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = postRef.current;
      if (!element) return;

      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const start = element.offsetTop;
      const height = element.scrollHeight - window.innerHeight;
      if (height <= 0) {
        setProgress(100);
        return;
      }
      const pct = Math.max(0, Math.min(1, (scrollTop - start) / height));
      setProgress(pct * 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, [progress]);

  const renderPostBodyNode = (node, index) => {
    if (node.type === 'paragraph') {
      if (node.highlightTokens) {
        let content = node.content;
        node.highlightTokens.forEach((token) => {
          content = content.replace(
            token,
            `<code data-token>${token}</code>`,
          );
        });
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      }
      if (node.hasHTML) {
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
        );
      }
      return <p key={index}>{node.content}</p>;
    }

    if (node.type === 'heading-2') {
      return <h2 key={index}>{node.content}</h2>;
    }

    if (node.type === 'heading-3') {
      return <h3 key={index}>{node.content}</h3>;
    }

    if (node.type === 'blockquote') {
      return <blockquote key={index}>{node.content}</blockquote>;
    }

    if (node.type === 'code') {
      return (
        <div key={index} className="code-block-wrapper">
          {node.label && <div className="code-label">{node.label}</div>}
          <pre className="code-block">
            <code className={`language-${node.language}`}>
              {node.content}
            </code>
          </pre>
          {node.caption && <div className="code-caption">{node.caption}</div>}
        </div>
      );
    }

    if (node.type === 'image') {
      return (
        <figure key={index} className="post-image">
          {node.label && <div className="image-label">{node.label}</div>}
          <img src={node.src} alt={node.alt} />
          {node.caption && (
            <figcaption className="meta" style={{ marginTop: '8px' }}>
              {node.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    return null;
  };

  return (
    <article className="post" ref={postRef}>
      <header>
        <div className="eyebrow">{postContent.eyebrow}</div>
        <h1>{postContent.title}</h1>
        <div className="meta">
          {postContent.meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </header>
      <figure>
        <img src={postContent.heroImage} alt="Magazine grid" />
        <figcaption className="meta" style={{ marginTop: '8px' }}>
          Photography by Unsplash
        </figcaption>
      </figure>
      <div className="body">
        {postContent.body.map((node, index) => renderPostBodyNode(node, index))}
      </div>

      {postContent.sources && postContent.sources.length > 0 && (
        <div className="sources">
          <div className="sources-title">Sources & References</div>
          <ul className="sources-list">
            {postContent.sources.map((source, index) => (
              <li key={index} className="source-item">
                <div className="source-number">[{index + 1}]</div>
                <div className="source-content">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-title"
                  >
                    {source.title}
                  </a>
                  <div className="source-meta">{source.meta}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default Post;
