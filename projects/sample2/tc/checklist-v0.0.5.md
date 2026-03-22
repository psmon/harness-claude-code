# 검증 체크리스트 — sample2 (v0.0.5)

**검증일**: 2026-03-23
**프로젝트**: Board - Simple Bulletin Board
**하네스 버전**: 0.0.5
**검증 도구**: Playwright CLI 1.58.2

---

## 1. 프로젝트 브라우저 렌더링

- **결과**: PASS

### Chromium Desktop (1280x720)
- **결과**: PASS
- 테이블 헤더(NO, TITLE, AUTHOR, DATE, VIEWS) 정상 표시
- 게시글 3건 정상 렌더링
- Header "Board" 로고 + "New Post" 버튼 정상
- Footer 정상 표시
- 스크린샷: `tc/screenshot-desktop.png`

### Chromium Mobile (375x812)
- **결과**: PASS
- 테이블 컬럼 숨김, 제목 + 메타 정보(작성자, 날짜, 조회수) 세로 배치
- Header 반응형 정상 (로고 + 버튼)
- Footer 세로 배치 정상
- 스크린샷: `tc/screenshot-mobile.png`

---

## 2. 디자인-코드 시각적 일관성

- **결과**: PASS
- **스타일 가이드**: Monochrome Type (mobile-03-monochrometype_light)

### 색상 매칭

| 요소 | 스타일 가이드 | 코드(Tailwind config) | 스크린샷 확인 |
|------|-------------|----------------------|-------------|
| 배경 | `#FFFFFF` | `page: '#FFFFFF'` | O |
| 카드 | `#F4F4F5` | `card: '#F4F4F5'` | O |
| 텍스트 기본 | `#000000` | `text-primary: '#000000'` | O |
| 텍스트 보조 | `#71717A` | `text-secondary: '#71717A'` | O |
| 테두리 | `#E4E4E7` | `border-strong: '#E4E4E7'` | O |

### 타이포그래피 매칭

| 용도 | 스타일 가이드 | 코드 | 확인 |
|------|-------------|------|------|
| Display | Outfit 900 | `font-display font-black` | O |
| Body | Inter 400-500 | `font-body` | O |
| Weight contrast | 900 vs 300 | 헤드라인 black vs 본문 normal | O |

### 레이아웃

| 요소 | 스타일 가이드 | 코드 | 확인 |
|------|-------------|------|------|
| Corner Radius | 16px (cards) | `rounded-card: '16px'` | O |
| Max Width | 제한 | `max-w-3xl` | O |

---

## 3. harness-usage.md 기록 완성도

- **결과**: PASS (아래 별도 작성)

---

## 4. 하네스 업그레이드 필수 4종 갱신

- **결과**: N/A (프로젝트 생성이므로 하네스 자체 업그레이드 불필요)

---

## 요약

| # | 항목 | 결과 |
|---|------|------|
| 1 | 브라우저 렌더링 | PASS (Desktop + Mobile) |
| 2 | 디자인-코드 일관성 | PASS |
| 3 | harness-usage.md 기록 | PASS |
| 4 | 업그레이드 4종 갱신 | N/A |
| **전체** | | **3/3 PASS** |
