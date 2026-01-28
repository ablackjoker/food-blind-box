// Kakao Map API 설정
// 실제 사용 시 카카오 개발자 센터에서 REST API 키를 발급받아 사용하세요
// https://developers.kakao.com/

const KAKAO_API_KEY = 'YOUR_KAKAO_REST_API_KEY'; // 여기에 발급받은 API 키를 입력하세요

export const fetchNearbyRestaurants = async (latitude, longitude, radius = 1000) => {
  // API 키가 설정되지 않은 경우 샘플 데이터 반환
  if (KAKAO_API_KEY === 'YOUR_KAKAO_REST_API_KEY') {
    console.warn('카카오 API 키가 설정되지 않았습니다. 샘플 데이터를 반환합니다.');
    return getSampleRestaurants(latitude, longitude);
  }

  try {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&x=${longitude}&y=${latitude}&radius=${radius}&sort=distance`;

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('음식점 정보를 가져오는데 실패했습니다.');
    }

    const data = await response.json();
    
    // 최대 15개의 음식점만 반환 (룰렛이 너무 복잡해지지 않도록)
    return data.documents.slice(0, 15);
  } catch (error) {
    console.error('API 호출 실패:', error);
    // API 실패 시 샘플 데이터 반환 (사용자 위치 기반)
    return getSampleRestaurants(latitude, longitude);
  }
};

// 샘플 데이터 (개발/테스트용)
// 사용자 위치 기반으로 동적 생성
const getSampleRestaurants = (latitude, longitude) => {
  // 위치를 기준으로 주변에 랜덤하게 배치
  const restaurants = [
    { name: '맛있는 한식당', category: '음식점 > 한식' },
    { name: '이탈리안 레스토랑', category: '음식점 > 양식' },
    { name: '일본라멘', category: '음식점 > 일식' },
    { name: '중화요리', category: '음식점 > 중식' },
    { name: '치킨집', category: '음식점 > 치킨' },
    { name: '피자가게', category: '음식점 > 피자' },
    { name: '분식집', category: '음식점 > 분식' },
    { name: '카페 베이커리', category: '음식점 > 카페' }
  ];

  return restaurants.map((restaurant, index) => {
    // 반경 1km 내에서 랜덤하게 분포
    // 1도 = 약 111km, 0.01도 = 약 1.11km
    const randomLat = latitude + (Math.random() - 0.5) * 0.01;
    const randomLng = longitude + (Math.random() - 0.5) * 0.01;
    
    // 거리 계산 (미터 단위, 대략적)
    const latDiff = (randomLat - latitude) * 111000;
    const lngDiff = (randomLng - longitude) * 111000 * Math.cos(latitude * Math.PI / 180);
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

    return {
      place_name: restaurant.name,
      category_name: restaurant.category,
      address_name: `현재 위치 근처 ${index + 1}`,
      phone: `02-${1000 + index * 111}-${5000 + index * 111}`,
      distance: Math.round(distance).toString(),
      x: randomLng.toFixed(6),
      y: randomLat.toFixed(6)
    };
  }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); // 거리순 정렬
};

export default {
  fetchNearbyRestaurants,
};
