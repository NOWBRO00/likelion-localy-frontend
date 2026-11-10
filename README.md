# 🗺️ Localy (로컬리) — Frontend

> 멋쟁이사자처럼 13기 아기사자 취업트랙 (Pawket) 팀 프로젝트

**Localy**는 지역을 탐험하며 미션과 챌린지를 수행하고, 매일의 감정을 기록·분석해 볼 수 있는 지역 커뮤니티 웹 앱입니다.
이 저장소는 팀 저장소 [Localy-Maker/likelion-localy-frontend](https://github.com/Localy-Maker/likelion-localy-frontend)의 포크입니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 회원 인증 | 이메일 회원가입·로그인, 이메일 인증, 비밀번호 찾기, Google 로그인 |
| 온보딩 | 관심사 선택, 신규 사용자 온보딩 흐름 |
| 메인 | 감정 캐릭터 카드, 감정 추이 요약, 북마크 캐러셀, 빠른 실행 버튼 |
| 감정 대시보드 | 주간·월간 감정 통계 차트 (Recharts), 연·월 선택 사이드바 |
| 로컬 탐험 | 주변 장소 추천, 장소 상세, 위치 기반 미션 인증, 챌린지, 포인트 사용, 북마크 |
| 채팅·알림 | STOMP(WebSocket) 기반 채팅과 실시간 알림 |
| 챗봇 | 오늘의 챗봇 대화 조회 |
| 마이페이지 | 내 정보 조회·수정, 로그아웃, 프리미엄 플랜 안내 |
| 다국어 | 한국어, 영어, 일본어, 중국어, 스페인어, 프랑스어 |

## 🙋 담당 역할 (이재형)

- **인증**: 로그인·회원가입·비밀번호 찾기 화면과 API 연동, Google 로그인 구현 (신규 사용자는 온보딩으로 이동)
- **온보딩**: 관심사 등록 API 연동, 온보딩·웰컴 페이지
- **감정 대시보드**: 주간·월간 감정 차트, 더미 데이터 제거 후 실제 API 연동, null 데이터 예외 처리
- **마이페이지**: 내 정보 조회·수정 API 연동, 로그아웃 모달, 프리미엄 플랜 페이지
- **공통**: 스플래시·로딩 페이지, API 클라이언트 설정, Swagger 명세에 맞춘 엔드포인트 정리, Vercel 배포 설정
- 팀 브랜치(`dev`)와의 머지 충돌 해결, lint·빌드 에러 수정

## 🛠 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Framework | React 19, Vite 7 |
| Routing | React Router 7 |
| Styling | styled-components, Swiper |
| HTTP | axios |
| 실시간 통신 | @stomp/stompjs, sockjs-client |
| 차트 | Recharts |
| 코드 품질 | ESLint, Prettier, GitHub Actions CI |
| 배포 | Vercel |

## 💻 실행 방법

```bash
npm install
npm run dev       # 개발 서버
npm run lint      # ESLint 검사
npm run build     # lint 후 프로덕션 빌드
npm run preview   # 빌드 결과 확인
```

API 서버 주소는 `VITE_API_BASE_URL` 환경 변수로 바꿀 수 있습니다. 설정하지 않으면 배포 서버(`https://api.localy-maker.shop`)를 사용합니다.

```dotenv
VITE_API_BASE_URL=http://localhost:8080
```

## 📂 디렉토리 구조

```text
src/
├── features/          # 기능 단위 폴더 (api / components / hooks / pages / styles)
│   ├── auth/          # 로그인, 회원가입, 비밀번호 찾기
│   ├── onboarding/    # 온보딩, 웰컴
│   ├── main/          # 메인 홈
│   ├── dashboard/     # 감정 대시보드
│   ├── local/         # 로컬 탐험, 미션, 챌린지, 북마크
│   ├── chat/          # 채팅 (STOMP)
│   ├── chatbot/       # 챗봇
│   ├── notification/  # 알림 (STOMP)
│   ├── mypage/        # 마이페이지
│   ├── premium/       # 프리미엄 플랜
│   └── loading/       # 스플래시, 로딩
├── shared/            # 공용 API 클라이언트, 컴포넌트, 훅, 유틸
├── contexts/          # 다국어(LanguageContext)
├── styles/            # 전역 스타일, 색상, 폰트, 미디어 쿼리
├── App.jsx            # 라우팅
└── main.jsx
```
