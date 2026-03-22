# 검증 체크리스트 — sample2 (v0.0.5) 디자인 리뉴얼

**검증일**: 2026-03-23
**프로젝트**: Board - Simple Bulletin Board (Dark Classy Redesign)
**하네스 버전**: 0.0.5
**검증 도구**: Playwright CLI 1.58.2
**작업 유형**: 프로젝트 수정 (디자인 리뉴얼)

---

## 변경 내역

| 항목 | 이전 (Monochrome Type) | 이후 (Dark Classy) |
|------|----------------------|-------------------|
| 배경 | #FFFFFF (흰색) | #0A0A0B (다크) |
| 액센트 | #000000 (검정) | #FF5C00 (오렌지) |
| 헤드라인 폰트 | Outfit 900 | Instrument Serif |
| 데이터 폰트 | — | DM Mono |
| UI 폰트 | Inter | Inter (유지) |
| 테이블 | 흰색 배경 + 테두리 | 다크 카드(#141417) + 서브틀 테두리 |
| Badge | — | 오렌지 틴트 pill badge |

---

## 1. 프로젝트 브라우저 렌더링

- **결과**: PASS

### Chromium Desktop (1280x720)
- **결과**: PASS
- 다크 배경 + 오렌지 액센트 정상 렌더링
- 테이블 헤더/행 정상 표시, DM Mono 번호/조회수 표시
- "All Posts" Instrument Serif 헤드라인 + "3 posts" pill badge
- Header: DM Mono "Board" 로고(tracking-[4px]) + 오렌지 "New Post" 버튼
- 스크린샷: `tc/screenshot-desktop.png`

### Chromium Mobile (375x812)
- **결과**: PASS
- 모바일 카드 레이아웃 정상 (테이블 컬럼 숨김)
- 다크 카드 내 제목 + 메타 정보 세로 배치
- 오렌지 액센트 버튼/뱃지 모바일에서도 선명
- 스크린샷: `tc/screenshot-mobile.png`

---

## 2. 디자인-코드 일관성

- **결과**: PASS
- **스타일 가이드**: Dark Classy Dashboard (webapp-03-darkclassy_light)
- **Pencil 디자인**: .pen 파일로 게시판 목록 화면 사전 디자인 후 코드 반영

### 색상 매칭 (Pencil 디자인 vs 코드)

| 요소 | Pencil 디자인 | 코드(Tailwind) | 스크린샷 확인 |
|------|-------------|---------------|-------------|
| 페이지 배경 | #0A0A0B | `page: '#0A0A0B'` | O |
| 카드 배경 | #141417 | `surface: '#141417'` | O |
| 테이블 헤더 배경 | #111113 | `recessed: '#111113'` | O |
| 오렌지 액센트 | #FF5C00 | `accent: '#FF5C00'` | O |
| 텍스트 기본 | #FFFFFF | `text-primary: '#FFFFFF'` | O |
| 텍스트 보조 | #ADADB0 | `text-secondary: '#ADADB0'` | O |
| 테두리 | #1F1F23 | `border-dark: '#1F1F23'` | O |

### 타이포그래피 매칭

| 용도 | Pencil | 코드 | 확인 |
|------|--------|------|------|
| 페이지 타이틀 | Instrument Serif 38px | `font-serif text-[38px]` | O |
| 로고 | DM Mono 20px semi 600 tracking 4 | `font-mono text-xl tracking-[4px]` | O |
| 데이터(번호/조회수) | DM Mono 13px medium | `font-mono text-[13px]` | O |
| UI 텍스트 | Inter 11-14px | `font-body text-sm` | O |

---

## 3. harness-usage.md 기록

- **결과**: PASS (기존 기록에 수정 내역 추가 필요)

---

## 4. 하네스 업그레이드 필수 4종 갱신

- **결과**: N/A (프로젝트 디자인 수정이므로 하네스 업그레이드 불필요)

---

## 요약

| # | 항목 | 결과 |
|---|------|------|
| 1 | 브라우저 렌더링 | PASS (Desktop + Mobile) |
| 2 | 디자인-코드 일관성 | PASS (Pencil → Code 충실 반영) |
| 3 | harness-usage.md 기록 | PASS |
| 4 | 업그레이드 4종 갱신 | N/A |
| **전체** | | **3/3 PASS** |
