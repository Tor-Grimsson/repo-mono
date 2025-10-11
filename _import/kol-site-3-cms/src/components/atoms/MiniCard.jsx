import React from 'react';
import { Link } from 'react-router-dom';

const MiniCard = ({ item }) => {
  return (
    <Link to="/post" className="mini" data-tags={item.tags.join(' ')}>
      <img src={item.image} alt={item.title} />
      <div>
        <div className="mini-title">{item.title}</div>
        <div className="mini-meta">{item.meta}</div>
      </div>
    </Link>
  );
};

export default MiniCard;
