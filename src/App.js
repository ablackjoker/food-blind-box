import React, { useState, useEffect } from 'react';
import './App.css';
import Roulette from './components/Roulette';
import RestaurantInfo from './components/RestaurantInfo';
import LocationButton from './components/LocationButton';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleLocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
  };

  const handleLocationError = (error) => {
    console.error('위치 정보를 가져올 수 없습니다:', error);
    alert('위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
    }
  };

  const handleSpin = () => {
    if (!userLocation) {
      alert('먼저 위치를 설정해주세요!');
      return;
    }
    if (restaurants.length === 0) {
      alert('주변에 음식점이 없습니다!');
      return;
    }
    setIsSpinning(true);
  };

  const handleSpinComplete = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsSpinning(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍽️ 음식점 룰렛</h1>
        <p>오늘 뭐 먹을까? 룰렛이 정해드립니다!</p>
      </header>

      <main className="App-main">
        <LocationButton 
          onGetLocation={getLocation}
          userLocation={userLocation}
          onFetchRestaurants={setRestaurants}
        />

        {restaurants.length > 0 && (
          <div className="roulette-section">
            <Roulette
              restaurants={restaurants}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
            <button 
              className="spin-button"
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? '돌리는 중...' : '🎰 룰렛 돌리기!'}
            </button>
          </div>
        )}

        {selectedRestaurant && !isSpinning && (
          <RestaurantInfo restaurant={selectedRestaurant} />
        )}
      </main>

      <footer className="App-footer">
        <p>Made with ❤️ for food lovers</p>
      </footer>
    </div>
  );
}

export default App;
