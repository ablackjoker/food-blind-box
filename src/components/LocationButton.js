import React, { useEffect } from 'react';
import { fetchNearbyRestaurants } from '../api/kakaoMap';
import './LocationButton.css';

const LocationButton = ({ onGetLocation, userLocation, onFetchRestaurants }) => {
  useEffect(() => {
    if (userLocation) {
      loadRestaurants();
    }
  }, [userLocation]);

  const loadRestaurants = async () => {
    try {
      const restaurants = await fetchNearbyRestaurants(
        userLocation.lat,
        userLocation.lng
      );
      onFetchRestaurants(restaurants);
    } catch (error) {
      console.error('음식점 정보를 가져오는데 실패했습니다:', error);
      alert('음식점 정보를 가져오는데 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="location-section">
      <button className="location-button" onClick={onGetLocation}>
        📍 내 위치에서 음식점 찾기
      </button>
      {userLocation && (
        <div className="location-info">
          <p>✅ 위치 설정 완료!</p>
          <button className="refresh-button" onClick={loadRestaurants}>
            🔄 음식점 다시 불러오기
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationButton;
