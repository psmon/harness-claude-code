# 검증 체크리스트 — sample1 (v0.0.4) Playwright 검증

**검증일**: 2026-03-23
**프로젝트**: Portfolio Intro Page
**하네스 버전**: 0.0.4
**검증 도구**: Playwright CLI 1.58.2

---

## 1. 프로젝트 브라우저 렌더링

- **결과**: FAIL (부분 통과)
- **검증 방법**: Playwright CLI로 실제 브라우저 렌더링 + 스크린샷 캡처

### Chromium Desktop (1280x720)
- **결과**: PASS
- React 18 CDN 로딩 정상
- Babel JSX 변환 정상
- Tailwind CSS 적용 정상
- Google Fonts 로딩 정상
- 모든 섹션 렌더링: Navbar, Hero, Features, Footer
- 스크린샷: `tc/screenshot-browser.png`

### Firefox Desktop (1280x720)
- **결과**: FAIL
- **문제**: 모든 텍스트가 렌더링되지 않음
- 레이아웃 구조(버튼, 카드, 히어로 이미지)는 표시됨
- 원인 추정: `type="text/babel"` 외부 스크립트 로딩 또는 폰트 렌더링 이슈
- 스크린샷: `tc/screenshot-firefox.png`

### Chromium Mobile (375x812)
- **결과**: FAIL (기능적 렌더링은 되나 레이아웃 깨짐)
- **문제 1**: 네비게이션 아이템들이 한 줄에 밀착 — 햄버거 메뉴 필요
- **문제 2**: 히어로 섹션 이미지(500x500)가 뷰포트 밖으로 밀림
- **문제 3**: Feature 카드 3개가 flex-row로 유지되어 너무 좁음 — 세로 스택 필요
- **문제 4**: 푸터 텍스트 겹침
- 스크린샷: `tc/screenshot-mobile.png`

---

## 2. 디자인-코드 시각적 일관성

- **결과**: PASS (Chromium 기준)
- **검증 방법**: Playwright 스크린샷과 코드 내 Tailwind config 대조

### 색상 매칭 (Chromium 스크린샷 기준)

| 요소 | 디자인(.pen) | 코드(Tailwind config) | 스크린샷 확인 |
|------|------------|----------------------|-------------|
| 배경 | `#1A1A1C` | `canvas: '#1A1A1C'` | O - 다크 배경 확인 |
| 카드 배경 | `#242426` | `surface: '#242426'` | O - 미세 밝기 차이 확인 |
| 골드 액센트 | `#C9A962` | `gold.DEFAULT: '#C9A962'` | O - 버튼, 텍스트 골드 확인 |
| 기본 텍스트 | `#F5F5F0` | `cream: '#F5F5F0'` | O - 크림색 텍스트 확인 |

### 타이포그래피 매칭

| 용도 | 디자인 | 코드 | 스크린샷 확인 |
|------|-------|------|-------------|
| Display | Cormorant Garamond | `font-display` | O - 세리프 헤드라인 확인 |
| Body | Inter | `font-body` | O - 산세리프 본문 확인 |
| 헤드라인 크기 | 64px | `text-[64px]` | O - 대형 헤드라인 확인 |

### 레이아웃 매칭

| 요소 | 디자인 | 코드 | 스크린샷 확인 |
|------|-------|------|-------------|
| 모서리 반경 | 20px | `rounded-pill: '20px'` | O - 둥근 버튼/카드 확인 |
| Hero 이미지 | 500x500 | `w-[500px] h-[500px]` | O - 정사각형 확인 |
| 애니메이션 원 | 회전 | `animate-spin` | O - 회전 요소 확인 |

---

## 3. harness-usage.md 기록 완성도

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

---

## 4. 하네스 업그레이드 필수 4종 갱신

- **결과**: PASS (이전 검증에서 확인됨)

| 산출물 | 파일 | 상태 |
|--------|------|------|
| 버전 히스토리 | `docs/v0.0.4.md` | 생성 완료 |
| README | `README.md` | v0.0.4 갱신 완료 |
| 블루프린트 | `design/blueprint.pen` | 갱신 완료 |
| 아키텍처 | `design/architecture.md` | 갱신 완료 |

---

## Playwright 검증에서 발견된 이슈

### ISSUE-1: Firefox 텍스트 미렌더링 (Critical)
- **심각도**: Critical
- **설명**: Firefox에서 모든 텍스트 콘텐츠가 표시되지 않음
- **원인 추정**: Babel standalone의 `type="text/babel"` 외부 스크립트 처리 차이
- **권장 수정**: Babel 변환을 인라인으로 처리하거나, 빌드 도구(Vite 등) 도입

### ISSUE-2: 모바일 반응형 레이아웃 미지원 (Major)
- **심각도**: Major
- **설명**: 375px 뷰포트에서 레이아웃 전면 깨짐
- **세부사항**:
  - 네비게이션: 반응형 미적용 (햄버거 메뉴 없음)
  - 히어로: `flex-row` 고정으로 이미지 밀림
  - 카드: `flex-row` 고정으로 세로 스택 없음
  - 푸터: 텍스트 겹침
- **권장 수정**: Tailwind `md:` / `lg:` 반응형 클래스 추가

---

## 요약

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | 브라우저 렌더링 | **FAIL** | Chromium PASS / Firefox FAIL / Mobile FAIL |
| 2 | 디자인-코드 일관성 | PASS | Chromium 기준 색상·타이포·레이아웃 일치 |
| 3 | harness-usage.md 기록 | PASS | 3계층 활용 내역 완비 |
| 4 | 업그레이드 4종 갱신 | PASS | 이전 검증 결과 유지 |
| **전체** | | **3/4 PASS** | Firefox·모바일 이슈 수정 필요 |

---

## 이전 검증 대비 변경점

| 항목 | 이전 (정적 분석) | 현재 (Playwright) |
|------|----------------|-------------------|
| 브라우저 렌더링 | PASS (CDN 경로 확인) | FAIL (실제 렌더링 검증) |
| 검증 깊이 | HTML 구조 분석 | 3개 브라우저/뷰포트 실제 스크린샷 |
| 발견 이슈 | 0건 | 2건 (Firefox, Mobile) |

> **결론**: 정적 분석만으로는 발견할 수 없는 크로스 브라우저·반응형 이슈가 Playwright 검증으로 드러남. 향후 프로젝트 검증 시 Playwright CLI 활용이 필수적임.
