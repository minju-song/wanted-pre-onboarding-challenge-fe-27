# 📌 React + TypeScript + Vite를 활용한 Todo

- 원티드 프리온보딩 프론트엔드 사전 과제


## 목차
- [주요 기능]
- [UI 미리보기]

## 🔧 주요 기능

- 🔒로그인 / 회원가입
1. /auth 경로에 로그인 / 회원가입 기능을 개발
2. 이메일과 비밀번호의 유효성을 확인 : 조건을 만족해야 제출 버튼이 활성화
3. 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동
4. 응답으로 받은 토큰은 로컬 스토리지에 저장
   
- 📝 Todo 리스트
1. 목록 / 상세 영역으로 나누어 구현
2. CRUD 기능


## 🖥️ UI 미리보기
🔸 홈화면
| 로그인 안했을 때 | 로그인 했을 때 |
|---|---|
|<img width="670" alt="스크린샷 2024-11-04 오후 7 04 33" src="https://github.com/user-attachments/assets/774625e6-dc47-490a-8974-7d520f3d1d3b">|<img width="670" alt="스크린샷 2024-11-04 오후 7 05 29" src="https://github.com/user-attachments/assets/273ab18f-3f95-4d1d-934b-80531186c40c">|
| 로그인 버튼 활성화 | 로그아웃 버튼 활성화 |

🔸 로그인 / 회원가입
| 로그인1 | 로그인2 | 로그인3 | 회원가입 |
|---|---|---|---|
|<img width="420" alt="스크린샷 2024-11-04 오후 7 06 27" src="https://github.com/user-attachments/assets/a0d3a2a2-75e3-475c-a404-754c6fc9218f">|<img width="420" alt="스크린샷 2024-11-04 오후 7 07 09" src="https://github.com/user-attachments/assets/cfcf562b-d97e-413a-a9cc-9f02fc711aa1">|<img width="340" alt="스크린샷 2024-11-04 오후 7 08 15" src="https://github.com/user-attachments/assets/eef76af4-1b94-4b15-9312-db2c1a59d2b6">|<img width="371" alt="스크린샷 2024-11-04 오후 7 07 38" src="https://github.com/user-attachments/assets/73ea6e83-6192-4c15-8530-2af13aabf9aa">|
| 기본 로그인 화면 | 조건 만족 시 제출 버튼 활성화 | 회원 정보 틀렸을 때 알림 | 회원가입 화면 |

🔸 TODO
| 기본 페이지 | TODO 상세보기 | 새로운 TODO |
|---|---|---|
|<img width="875" alt="스크린샷 2024-11-04 오후 7 08 58" src="https://github.com/user-attachments/assets/e62a862e-aef8-4841-9a57-22825efe0ff3">|<img width="875" alt="스크린샷 2024-11-04 오후 7 09 42" src="https://github.com/user-attachments/assets/1fbec678-2718-48d0-94e0-3e6e30a8e3ff">|<img width="875" alt="스크린샷 2024-11-04 오후 7 10 22" src="https://github.com/user-attachments/assets/2e85e4ca-44a5-4b9c-974e-892ebfd32f2c">|
| 처음 보이는 기본 화면 | 목록에서 클릭 시 보이는 상세 내용. 수정 / 삭제 기능 포함 | TODO 추가 |
