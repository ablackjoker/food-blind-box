import React from 'react';
import './RestaurantInfo.css';

const RestaurantInfo = ({ restaurant }) => {
  const openNaverMap = () => {
    const name = encodeURIComponent(restaurant.place_name || restaurant.name);
    // 좌표가 있으면 좌표로, 없으면 검색으로
    let url;
    if (restaurant.y && restaurant.x) {
      // 네이버맵: 좌표 기반 링크 (lng, lat 순서 주의)
      url = `https://map.naver.com/v5/?c=${restaurant.x},${restaurant.y},15,0,0,0,dh&p=${name}`;
    } else {
      url = `https://map.naver.com/v5/search/${name}`;
    }
    window.open(url, '_blank');
  };

  const openKakaoMap = () => {
    const name = encodeURIComponent(restaurant.place_name || restaurant.name);
    // 좌표가 있으면 좌표로 직접 전달
    let url;
    if (restaurant.y && restaurant.x) {
      // 카카오맵: 좌표 기반 링크 (lat, lng 순서)
      url = `https://map.kakao.com/link/map/${name},${restaurant.y},${restaurant.x}`;
    } else {
      url = `https://map.kakao.com/link/search/${name}`;
    }
    window.open(url, '_blank');
  };

  const openDeliveryApps = (app) => {
    const name = encodeURIComponent(restaurant.place_name || restaurant.name);
    let url = '';

    switch (app) {
      case 'baemin':
        // 배달의민족: 검색 페이지로 직접 이동
        url = `https://www.baemin.com/search?query=${name}`;
        break;
      case 'coupang':
        // 쿠팡이츠: 검색 페이지로 직접 이동
        url = `https://www.coupangeats.com/search?query=${name}`;
        break;
      case 'yogiyo':
        // 요기요: 검색 페이지로 직접 이동
        url = `https://www.yogiyo.co.kr/mobile/#/search/?keyword=${name}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  const getDeliveryAppName = (app) => {
    const names = {
      'baemin': '배달의민족',
      'coupang': '쿠팡이츠',
      'yogiyo': '요기요'
    };
    return names[app] || app;
  };

  return (
    <div className="restaurant-info">
      <div className="result-header">
        <h2>🎉 당첨!</h2>
      </div>

      <div className="restaurant-card">
        <h3>{restaurant.place_name || restaurant.name}</h3>
        
        {restaurant.category_name && (
          <p className="category">📂 {restaurant.category_name}</p>
        )}
        
        {restaurant.address_name && (
          <p className="address">📍 {restaurant.address_name}</p>
        )}
        
        {restaurant.phone && (
          <p className="phone">
            📞 <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
          </p>
        )}

        {restaurant.distance && (
          <p className="distance">📏 거리: {Math.round(restaurant.distance)}m</p>
        )}

        <div className="action-buttons">
          <h4>🗺️ 길찾기</h4>
          <div className="button-group">
            <button onClick={openNaverMap} className="map-button naver">
              네이버 지도
            </button>
            <button onClick={openKakaoMap} className="map-button kakao">
              카카오맵
            </button>
          </div>

          <h4>🛵 배달 주문</h4>
          <div className="button-group">
            <button onClick={() => openDeliveryApps('baemin')} className="delivery-button baemin">
              배달의민족
            </button>
            <button onClick={() => openDeliveryApps('coupang')} className="delivery-button coupang">
              쿠팡이츠
            </button>
            <button onClick={() => openDeliveryApps('yogiyo')} className="delivery-button yogiyo">
              요기요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
