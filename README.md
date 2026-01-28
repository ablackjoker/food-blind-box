# 🍽️ 음식점 룰렛 (Food Roulette)

오늘 뭐 먹을까 고민될 때! 룰렛이 음식점을 랜덤으로 선택해드립니다.

## ✨ 주요 기능

1. **위치 기반 음식점 탐색**
   - 사용자의 현재 위치를 기반으로 주변 음식점 검색
   - 카카오맵 API 활용

2. **랜덤 돌림판 UI**
   - Canvas를 활용한 부드러운 돌림판 애니메이션
   - 시각적으로 매력적인 색상 디자인
   - 최대 15개 음식점 표시

3. **선택된 음식점 정보**
   - 음식점 이름, 카테고리, 주소, 전화번호
   - 거리 정보

4. **편의 기능**
   - **길찾기**: 네이버맵, 카카오맵으로 바로 연결
   - **배달 주문**: 배달의민족, 쿠팡이츠, 요기요 앱 연결

## 🚀 시작하기

### 필요 조건

- Node.js (v14 이상)
- npm 또는 yarn

### 설치 및 실행

1. **패키지 설치**
   ```bash
   npm install
   ```

2. **카카오맵 API 키 설정**
   
   `src/api/kakaoMap.js` 파일을 열어 API 키를 설정하세요:
   
   ```javascript
   const KAKAO_API_KEY = 'YOUR_KAKAO_REST_API_KEY';
   ```

   #### 카카오 API 키 발급 방법:
   1. [카카오 개발자 센터](https://developers.kakao.com/) 접속
   2. 로그인 후 '내 애플리케이션' 메뉴로 이동
   3. '애플리케이션 추가하기' 클릭
   4. 앱 이름 입력 후 저장
   5. '앱 설정' > '앱 키'에서 **REST API 키** 복사
   6. `src/api/kakaoMap.js`의 `KAKAO_API_KEY`에 붙여넣기

   > **참고**: API 키 없이도 샘플 데이터로 앱을 테스트할 수 있습니다.

3. **개발 서버 실행**
   ```bash
   npm start
   ```

   브라우저에서 자동으로 [http://localhost:3000](http://localhost:3000) 열립니다.

4. **프로덕션 빌드**
   ```bash
   npm run build
   ```

## 📱 사용 방법

1. **"내 위치에서 음식점 찾기"** 버튼 클릭
2. 브라우저의 위치 권한 허용
3. 주변 음식점이 룰렛에 표시됨
4. **"룰렛 돌리기!"** 버튼 클릭
5. 선택된 음식점의 정보 확인
6. 길찾기 또는 배달 주문 버튼 활용

## 🛠️ 기술 스택

- **프론트엔드**: React
- **스타일링**: CSS3 (Flexbox, Animation)
- **위치 API**: Kakao Map REST API
- **지도 서비스**: 네이버맵, 카카오맵
- **애니메이션**: HTML5 Canvas

## 📂 프로젝트 구조

```
food-roulette/
├── public/
├── src/
│   ├── api/
│   │   └── kakaoMap.js          # 카카오맵 API 연동
│   ├── components/
│   │   ├── Roulette.js          # 룰렛 컴포넌트
│   │   ├── Roulette.css
│   │   ├── LocationButton.js    # 위치 설정 버튼
│   │   ├── LocationButton.css
│   │   ├── RestaurantInfo.js    # 음식점 정보 표시
│   │   └── RestaurantInfo.css
│   ├── App.js                   # 메인 앱 컴포넌트
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 주요 특징

### 1. Canvas 기반 룰렛
- 부드러운 회전 애니메이션
- Ease-out 효과로 자연스러운 감속
- 다양한 색상 팔레트

### 2. 반응형 디자인
- 모바일, 태블릿, 데스크톱 대응
- 터치 및 클릭 모두 지원

### 3. 사용자 친화적 UI
- 직관적인 버튼 배치
- 명확한 시각적 피드백
- 애니메이션으로 재미 요소 추가

## 🔧 환경 설정 (선택사항)

### API 키 환경 변수 사용

더 안전한 API 키 관리를 위해 `.env` 파일을 사용할 수 있습니다:

1. 프로젝트 루트에 `.env` 파일 생성:
   ```
   REACT_APP_KAKAO_API_KEY=your_actual_api_key_here
   ```

2. `src/api/kakaoMap.js` 수정:
   ```javascript
   const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
   ```

3. `.env` 파일을 `.gitignore`에 추가 (이미 포함되어 있음)

## 📝 개발 노트

### 샘플 데이터
- API 키가 없거나 API 호출 실패 시 샘플 데이터 사용
- 개발 및 테스트에 유용

### 제한 사항
- 카카오맵 API 무료 플랜: 일일 30만 건 호출 제한
- 룰렛 최대 15개 음식점 (가독성 고려)

## 🐛 문제 해결

### 위치 정보를 가져올 수 없어요
- 브라우저의 위치 권한 확인
- HTTPS 환경에서만 Geolocation API 사용 가능 (localhost 제외)

### 음식점이 표시되지 않아요
- 카카오 API 키 확인
- 네트워크 연결 확인
- 콘솔 에러 메시지 확인

### 룰렛이 제대로 돌아가지 않아요
- 브라우저 캐시 삭제 후 재시도
- 최신 브라우저 사용 권장 (Chrome, Firefox, Safari, Edge)

## 🚀 향후 개선 계획

- [ ] PWA(Progressive Web App) 지원
- [ ] 음식 카테고리 필터링
- [ ] 최근 방문/선택 기록
- [ ] 즐겨찾기 기능
- [ ] 친구와 공유 기능
- [ ] 다크 모드
- [ ] 여러 지도 API 통합 (네이버, 구글맵)

## 📄 라이선스

MIT License

## 👨‍💻 개발자

Made with ❤️ for food lovers

---

**즐거운 식사 되세요! 🍴**
