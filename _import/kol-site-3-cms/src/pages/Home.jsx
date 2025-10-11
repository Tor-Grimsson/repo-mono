import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/layout/Hero';
import ArticleCard from '../components/atoms/ArticleCard';
import MiniCard from '../components/atoms/MiniCard';
import { heroPrimary, heroSecondary, articleCards, cmsCards } from '../data/content';

const Home = () => {
  const { selectedFilter, searchQuery } = useOutletContext();
  const searchValue = searchQuery.trim().toLowerCase();

  const filteredArticles = useMemo(() => {
    return articleCards.filter((article) => {
      const matchesFilter = selectedFilter === 'all' || article.tags.includes(selectedFilter);
      if (!matchesFilter) return false;
      if (!searchValue) return true;
      const text = `${article.kicker} ${article.title} ${article.summary} ${article.meta.join(' ')}`.toLowerCase();
      return text.includes(searchValue);
    });
  }, [selectedFilter, searchValue]);

  const filteredMiniCards = useMemo(() => {
    return cmsCards.filter((card) => {
      const matchesFilter = selectedFilter === 'all' || card.tags.includes(selectedFilter);
      if (!matchesFilter) return false;
      if (!searchValue) return true;
      const text = `${card.title} ${card.meta}`.toLowerCase();
      return text.includes(searchValue);
    });
  }, [selectedFilter, searchValue]);

  return (
    <>
      <section>
        <Hero primary={heroPrimary} secondary={heroSecondary} />
      </section>

      <div className="k-sep" />

      <section>
        {filteredArticles.length > 0 ? (
          <div className="grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No articles match that filter just yet.</div>
        )}
      </section>

      <div className="k-sep" />

      <section className="cms-card">
        <div className="eyebrow" style={{ marginBottom: '10px' }}>
          From the CMS
        </div>
        {filteredMiniCards.length > 0 ? (
          <div className="cms-grid">
            {filteredMiniCards.map((item) => (
              <MiniCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">No highlights available with those filters.</div>
        )}
      </section>
    </>
  );
};

export default Home;
