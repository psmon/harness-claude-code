# Playwright 검증 체크리스트 — sample3 (v0.0.5)

**검증일**: 2026-03-23
**프로젝트**: sample3 (ASP.NET Core + Akka.NET PingPong Visualizer)
**하네스 버전**: 0.0.5
**Playwright 버전**: 1.58.2
**검증 브라우저**: Chromium

---

## 1. 브라우저 렌더링

### Desktop (1280×720)

- **결과**: PASS
- **스크린샷**: `tc/screenshot-desktop.png` (초기), `tc/screenshot-desktop-diagram.png` (다이어그램)
- **상세**:
  - 헤더: "PingPong Actor Visualizer" + 한글 부제 정상 렌더링
  - 컨트롤: Rounds 입력 (기본값 5), "Run PingPong" 버튼, "Ready" 상태 표시
  - 다크 테마 (#0a0a0a 배경) 정상
  - 버튼 클릭 후 시퀀스 다이어그램 완전 렌더링
    - 3개 액터 박스 (API=파랑, PingActor=주황, PongActor=초록) 컬러 구분 정상
    - StartPingPong → Ping(1)~Ping(5) / Pong(1)~Pong(5) → PingPongResult 전체 화살표 표시
    - 라운드 마커 (R1~R5) 좌측 표시
    - 애니메이션 순차 렌더링
  - Summary: "Rounds: 5, Messages: 12, Status: Completed 5 rounds" 정상
  - 상태 표시: "Done" (초록색)

### Mobile (375×812)

- **결과**: PARTIAL
- **스크린샷**: `tc/screenshot-mobile.png` (초기), `tc/screenshot-mobile-diagram.png` (다이어그램)
- **상세**:
  - 초기 화면: 헤더, 컨트롤 정상 렌더링. 버튼 터치 영역 적절
  - 다이어그램 렌더링 이슈:
    - PongActor 박스가 뷰포트 밖으로 잘림 (가로 스크롤 필요)
    - 메시지 화살표와 라벨이 우측으로 밀려 대부분 보이지 않음
    - 라운드 마커(R1~R5)만 표시, 실제 다이어그램 내용은 스크롤해야 볼 수 있음
    - PingPongResult 화살표만 하단에 부분 표시
  - Summary 섹션: 정상 표시 (텍스트 줄바꿈 적용)
  - **원인**: `.sequence-diagram { min-width: 500px }` + 고정 colWidth 계산으로 375px 뷰포트에서 오버플로우
  - **심각도**: 경미 — `overflow-x: auto`가 적용되어 스크롤로 접근 가능하지만 UX 불편

---

## 2. 디자인-코드 일관성

- **결과**: PASS
- **상세**:
  - 다크 테마: 배경 #0a0a0a, 텍스트 #e0e0e0 — 코드와 렌더링 일치
  - 액터 컬러: API=#4a9eff, Ping=#f59e0b, Pong=#10b981 — 코드 정의와 스크린샷 일치
  - 화살표 방향: right(Ping→Pong)=파랑, left(Pong→Ping)=초록 — 정상
  - 폰트: Segoe UI / system-ui 정상 로딩

---

## 3. API 기능 검증

- **결과**: PASS
- **상세**:
  - `GET /api/health` → 200 `{"status":"healthy"}`
  - `GET /api/pingpong/3` → 200, 3라운드 8이벤트, 타임스탬프 포함
  - `GET /api/pingpong/0` → 400 (경계값 차단)
  - `GET /api/pingpong/101` → 400 (경계값 차단)

---

## 4. harness-usage.md 기록

- **결과**: PASS (기존 보고서 존재, 이번 Playwright 검증 내용 추가 예정)

---

## 요약

| # | 항목 | Desktop | Mobile | 판정 |
|---|------|---------|--------|------|
| 1 | 초기 화면 렌더링 | PASS | PASS | PASS |
| 2 | 다이어그램 렌더링 | PASS | PARTIAL | PARTIAL |
| 3 | 디자인-코드 일관성 | PASS | — | PASS |
| 4 | API 기능 | PASS | — | PASS |
| **전체** | | | | **PARTIAL** |

### 판정: PARTIAL

- Desktop: 완전 정상 렌더링
- Mobile: 초기 화면 정상, 다이어그램 가로 오버플로우 (스크롤 가능하나 UX 불편)

### 개선 권장사항

- 모바일에서 시퀀스 다이어그램의 `min-width`를 뷰포트에 맞게 조정하거나 축소 표시
- 또는 모바일에서 세로형 타임라인 레이아웃으로 전환하는 반응형 대응 고려

---

## 스크린샷 파일 목록

| 파일 | 설명 |
|------|------|
| `tc/screenshot-desktop.png` | Desktop 초기 화면 |
| `tc/screenshot-mobile.png` | Mobile 초기 화면 |
| `tc/screenshot-desktop-diagram.png` | Desktop 다이어그램 렌더링 후 |
| `tc/screenshot-mobile-diagram.png` | Mobile 다이어그램 렌더링 후 |
