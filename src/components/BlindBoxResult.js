import React from 'react';
import './BlindBoxResult.css';

const BlindBoxResult = ({ item, onRetry }) => {
  const openAmapSearch = () => {
    const keyword = encodeURIComponent(item.mapKeyword || item.place_name);
    const url = `https://uri.amap.com/search?keyword=${keyword}&view=map&src=food-blind-box&callnative=0`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="blind-result" aria-live="polite">
      <div className="result-topline">本次开盒</div>
      <h2>{item.place_name}</h2>
      <p className="result-category">{item.category_name}</p>

      <div className="result-meta">
        <span>预算 {item.budget}</span>
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <p className="result-reason">{item.reason}</p>
      <p className="result-tip">{item.tip}</p>

      <div className="result-actions">
        <button type="button" className="secondary-button" onClick={onRetry}>
          再开一次
        </button>
        <button type="button" className="primary-button" onClick={openAmapSearch}>
          高德搜索
        </button>
      </div>
    </section>
  );
};

export default BlindBoxResult;
