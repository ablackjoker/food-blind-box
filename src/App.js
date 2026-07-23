import React, { useMemo, useState } from 'react';
import './App.css';
import Roulette from './components/Roulette';
import BlindBoxResult from './components/BlindBoxResult';
import { blindBoxGroups } from './data/blindBoxes';

function App() {
  const [activeGroupId, setActiveGroupId] = useState(blindBoxGroups[0].id);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawCount, setDrawCount] = useState(0);

  const activeGroup = useMemo(
    () => blindBoxGroups.find((group) => group.id === activeGroupId) || blindBoxGroups[0],
    [activeGroupId]
  );

  const handleSpin = () => {
    setSelectedItem(null);
    setIsSpinning(true);
  };

  const handleSpinComplete = (item) => {
    setSelectedItem(item);
    setIsSpinning(false);
    setDrawCount((count) => count + 1);
  };

  const handleGroupChange = (groupId) => {
    if (isSpinning) return;
    setActiveGroupId(groupId);
    setSelectedItem(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p className="eyebrow">本地随机盲盒</p>
          <h1>今晚吃什么盲盒</h1>
          <p>把选择交给转盘，给胃一个答案。</p>
        </div>
      </header>

      <main className="App-main">
        <section className="blindbox-panel" aria-labelledby="blindbox-title">
          <div className="panel-header">
            <div>
              <p className="eyebrow">盲盒主题</p>
              <h2 id="blindbox-title">{activeGroup.title}</h2>
            </div>
            <div className="panel-stats">
              <span>{activeGroup.items.length} 个选项</span>
              <span>已开 {drawCount} 次</span>
            </div>
          </div>

          <div className="group-tabs" role="tablist" aria-label="盲盒主题">
            {blindBoxGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={group.id === activeGroupId ? 'group-tab active' : 'group-tab'}
                onClick={() => handleGroupChange(group.id)}
                disabled={isSpinning}
                aria-selected={group.id === activeGroupId}
                role="tab"
              >
                <span>{group.icon}</span>
                {group.title}
              </button>
            ))}
          </div>

          <div className="roulette-section">
            <Roulette
              items={activeGroup.items}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
            <button
              className="spin-button"
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? '开盒中...' : selectedItem ? '再开一次' : '开盲盒'}
            </button>
          </div>
        </section>

        {selectedItem && !isSpinning && (
          <BlindBoxResult item={selectedItem} onRetry={handleSpin} />
        )}
      </main>

      <footer className="App-footer">
        <p>Food Blind Box MVP</p>
      </footer>
    </div>
  );
}

export default App;
