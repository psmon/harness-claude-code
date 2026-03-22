# Playwright 검증 워크플로우

> v0.0.5 추가 — projects/sample1 Playwright 검증 여정에서 도출

## 개요

프로젝트 생성/수정 후 실제 브라우저에서 렌더링을 검증하는 워크플로우.
정적 분석(HTML 구조, CDN 경로)만으로는 발견할 수 없는 크로스브라우저·반응형 이슈를 포착한다.

## 검증 대상 브라우저

| 브라우저 | 뷰포트 | 용도 |
|---------|--------|------|
| Chromium | 1280x720 (Desktop) | 데스크톱 렌더링 검증 |
| Chromium | 375x812 (Mobile) | 모바일 반응형 검증 |

> Firefox는 제외 — Babel standalone `type="text/babel"` 외부 스크립트 호환성 이슈로 인해 CDN 기반 프로젝트에서 안정적 검증 불가.

## 사전 조건

- Playwright CLI 설치: `npm install -D playwright` 또는 전역 `npx playwright`
- Chromium 브라우저: `npx playwright install chromium`

## 검증 절차

### Step 1: 로컬 서버 시작

```bash
cd projects/[프로젝트명]
npx serve . -l [포트] &
```

> `file://` 프로토콜은 CORS 제한으로 `type="text/babel"` 외부 스크립트 로딩 실패 가능. 반드시 HTTP 서버 사용.

### Step 2: Desktop 스크린샷 캡처

```bash
npx playwright screenshot \
  --browser chromium \
  --full-page \
  http://localhost:[포트] \
  projects/[프로젝트명]/tc/screenshot-desktop.png
```

### Step 3: Mobile 스크린샷 캡처

```bash
npx playwright screenshot \
  --browser chromium \
  --viewport-size 375,812 \
  --full-page \
  http://localhost:[포트] \
  projects/[프로젝트명]/tc/screenshot-mobile.png
```

### Step 4: 스크린샷 시각 검증

캡처된 스크린샷을 Read 도구로 확인하여 다음을 점검:

| 점검 항목 | Desktop | Mobile |
|-----------|---------|--------|
| 전체 레이아웃 렌더링 | 섹션 누락 없음 | 세로 스택 정상 |
| 텍스트 렌더링 | 폰트 로딩, 크기 | 가독성, 오버플로우 |
| 색상·그라데이션 | 디자인 일치 | 디자인 일치 |
| 인터랙션 요소 | 버튼·링크 표시 | 터치 영역 크기 |
| 반응형 레이아웃 | N/A | flex-wrap, 네비게이션 |

### Step 5: 서버 종료

```bash
pkill -f "serve.*[포트]"
```

### Step 6: 결과 기록

검증 결과를 `projects/[프로젝트명]/tc/checklist-vX.Y.Z-playwright.md`에 기록.
스크린샷 파일 경로를 체크리스트에 포함.

## Journey 상태 모델 통합

기존 Journey에 `verifying` 상태를 추가:

```
idle → prompted → planning → building → verifying → recording → idle
```

| 상태 | 설명 | 산출물 |
|------|------|--------|
| verifying | Playwright 브라우저 검증 | `tc/screenshot-*.png`, `tc/checklist-*-playwright.md` |

### Agentic Loop 매핑

```
building (Take Action)
    ↓
verifying (Verify Results — Playwright)
    ↓ PASS → recording
    ↓ FAIL → building (수정 후 재검증)
```

## 오케스트레이터 패턴

### 검증 통과 시: Chain
```
architect(building) → playwright(verifying) → journey-recorder(recording)
```

### 검증 실패 시: Verify Loop
```
architect(building) → playwright(verifying) → [FAIL] → architect(building) 복귀
```

## 체크리스트 판정 기준

| 결과 | 조건 |
|------|------|
| PASS | Desktop + Mobile 모두 정상 렌더링 |
| PARTIAL | Desktop 정상, Mobile 레이아웃 이슈 (경미) |
| FAIL | Desktop 렌더링 실패 또는 Mobile 심각한 깨짐 |

## 제약사항

- Playwright CLI `screenshot` 명령은 정적 스크린샷만 지원 — 인터랙션(클릭, 스크롤) 검증 불가
- SPA 라우팅 검증은 각 라우트별 별도 스크린샷 필요
- CDN 기반 프로젝트는 네트워크 상태에 따라 결과 달라질 수 있음
