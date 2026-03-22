# 검증 체크리스트 — sample1 (v0.0.4)

**검증일**: 2026-03-23
**프로젝트**: Portfolio Intro Page
**하네스 버전**: 0.0.4

---

## 1. 프로젝트 브라우저 렌더링

- **결과**: PASS
- **검증 방법**: HTML 구조 및 CDN 로드 경로 검증
- **상세**:
  - `index.html`: HTML5 doctype, UTF-8, viewport 메타 설정 정상
  - React 18 CDN (`unpkg.com/react@18`) 로드 경로 유효
  - ReactDOM 18 CDN 로드 경로 유효
  - Babel standalone CDN 로드 경로 유효
  - Tailwind CSS CDN (`cdn.tailwindcss.com`) 로드 경로 유효
  - Google Fonts (Cormorant Garamond, Inter) 로드 경로 유효
  - `<div id="root">` 마운트 포인트 존재
  - `app.js`에서 `ReactDOM.createRoot(document.getElementById('root'))` 정상 호출
- **주의사항**: `type="text/babel"` 외부 스크립트는 `file://` 프로토콜에서 CORS 제한 → `npx serve .` 권장

---

## 2. 디자인-코드 시각적 일관성

- **결과**: PASS
- **검증 방법**: Pencil MCP 스크린샷(`design/project1.pen`)과 코드(`app.js` + Tailwind config) 대조

### 색상 매칭

| 요소 | 디자인(.pen) | 코드(Tailwind config) | 일치 |
|------|------------|----------------------|------|
| 배경 | `#1A1A1C` | `canvas: '#1A1A1C'` | O |
| 카드 배경 | `#242426` | `surface: '#242426'` | O |
| 테두리 | `#3A3A3C` | `border: '#3A3A3C'` | O |
| 골드 액센트 | `#C9A962` | `gold.DEFAULT: '#C9A962'` | O |
| 골드 딥 | `#8B7845` | `gold.deep: '#8B7845'` | O |
| 기본 텍스트 | `#F5F5F0` | `cream: '#F5F5F0'` | O |
| 보조 텍스트 | `#6E6E70` | `muted: '#6E6E70'` | O |
| 비활성 텍스트 | `#4A4A4C` | `dim: '#4A4A4C'` | O |

### 타이포그래피 매칭

| 용도 | 디자인 | 코드 | 일치 |
|------|-------|------|------|
| Display | Cormorant Garamond 400 | `font-display: Cormorant Garamond` | O |
| Body | Inter 400/500/600 | `font-body: Inter` | O |
| 헤드라인 | 64px | `text-[64px]` | O |
| 섹션 타이틀 | 42px | `text-[42px]` | O |
| 카드 타이틀 | 22px | `text-[22px]` | O |

### 레이아웃 매칭

| 요소 | 디자인 | 코드 | 일치 |
|------|-------|------|------|
| 모서리 반경 | 20px | `rounded-pill: '20px'` | O |
| Hero 이미지 크기 | 500x500 | `w-[500px] h-[500px]` | O |
| 골드 그라데이션 | 135° #C9A962→#8B7845 | `bg-gradient-to-br from-gold to-gold-deep` | O |

---

## 3. harness-usage.md 3계층 활용 내역

- **결과**: PASS
- **검증 방법**: `projects/sample1/harness-usage.md` 내용 확인

| 항목 | 기록 여부 |
|------|----------|
| Layer 1: knowledge/ 활용 (6개 MCP 항목) | O |
| Layer 2: agents/ 역할 (3종 에이전트) | O |
| Layer 3: engine/ 상태 전이 (4개 Journey 상태) | O |
| MCP 도구 사용 내역 (memorizer + pencil) | O |
| 오케스트레이션 패턴 (Parallel + Chain) | O |
| 하네스 개선 관찰사항 (잘 된 점 4 + 개선점 5) | O |
| v0.0.4 개선 제안 (4건) | O |

---

## 4. 하네스 업그레이드 필수 4종 갱신

- **결과**: PASS

| 산출물 | 파일 | 상태 |
|--------|------|------|
| 버전 히스토리 | `docs/v0.0.4.md` | 생성 완료 (50줄) |
| README | `README.md` | v0.0.4 행 추가 + projects/ 디렉토리 추가 |
| 블루프린트 | `design/blueprint.pen` | v0.0.4 프레임 추가 (파이프라인+3계층+산출물) |
| 아키텍처 | `design/architecture.md` | mermaid 다이어그램 3개 추가 |
| 설정 | `harness.config.json` | version 0.0.4 + projects 경로 등록 |

---

## 요약

| # | 항목 | 결과 |
|---|------|------|
| 1 | 브라우저 렌더링 | PASS |
| 2 | 디자인-코드 일관성 | PASS |
| 3 | harness-usage.md 기록 | PASS |
| 4 | 업그레이드 4종 갱신 | PASS |
| **전체** | | **4/4 PASS** |
