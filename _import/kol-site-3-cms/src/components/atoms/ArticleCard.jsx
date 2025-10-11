import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Link to="/post" className="card" data-tags={article.tags.join(' ')}>
      <div className="card-media">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="card-body">
        <div className="kicker">{article.kicker}</div>
        <div className="title link-underline">{article.title}</div>
        <p className="summary">{article.summary}</p>
        <div className="meta">
          {article.meta.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
