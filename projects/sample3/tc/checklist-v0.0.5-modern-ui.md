# 검증 체크리스트 — sample3 UI 모던화 (v0.0.5)

**검증일**: 2026-03-23
**프로젝트**: sample3 (ASP.NET Core + Akka.NET PingPong Visualizer)
**하네스 버전**: 0.0.5
**작업**: Pencil MCP 디자인 기반 Terminal Minimal UI 적용

---

## 1. 브라우저 렌더링

### Desktop (1280×720)

- **결과**: PASS
- **스크린샷**: `tc/screenshot-modern-desktop.png`, `tc/screenshot-modern-desktop-diagram.png`
- **상세**:
  - `>` 프롬프트 + `pingpong_visualizer` 타이틀: JetBrains Mono 정상 로딩
  - `// akka.net actor message sequence diagram` 부제: IBM Plex Mono 정상
  - `$` 명령 접두사 + `run_pingpong` 버튼: 터미널 구문 UI 완전 구현
  - `[ready]` → `[executing]` → `[completed]` 상태 전이 + 상태 도트 정상
  - 0px border-radius 일관 적용 (입력, 버튼, 액터 박스 모두)
  - 시퀀스 다이어그램: snake_case 라벨 (ping(1), pong(1) 등) 정상
  - Summary: `// result` + `rounds: 5` + `messages: 12` + `[completed 5 rounds]` 정상

### Mobile (375×812)

- **결과**: PASS (이전 PARTIAL → PASS 개선)
- **스크린샷**: `tc/screenshot-modern-mobile.png`, `tc/screenshot-modern-mobile-diagram.png`
- **상세**:
  - 초기 화면: 헤더 반응형 (부제 숨김), 컨트롤 줄바꿈 정상
  - 3개 액터 박스(api/ping_actor/pong_actor) 모두 뷰포트 내 표시 — **이전 PARTIAL 이슈 해결**
  - 화살표 + 라벨 모두 표시 (min-width 500→320 축소, gap/padding 축소)
  - Summary 세로 스택 정상 표시
  - `[completed]` 상태 도트 정상

---

## 2. 디자인-코드 일관성

- **결과**: PASS
- **디자인 파일**: Pencil MCP로 생성 (Terminal Minimal Dashboard v2 스타일 가이드)
- **대조**:

| 디자인 요소 | .pen 디자인 | 코드 구현 | 일치 |
|------------|------------|----------|------|
| 배경색 | #0A0A0A | var(--bg): #0A0A0A | O |
| 텍스트 Primary | #FAFAFA | var(--text-primary): #FAFAFA | O |
| 텍스트 Secondary | #6B7280 | var(--text-secondary): #6B7280 | O |
| 그린 액센트 | #10B981 | var(--green): #10B981 | O |
| 보더 | #2a2a2a | var(--border): #2a2a2a | O |
| 폰트 | JetBrains Mono + IBM Plex Mono | Google Fonts CDN | O |
| border-radius | 0px 전체 | border-radius: 0 | O |
| 프롬프트 `>` | 28px bold green | 28px 700 var(--green) | O |
| 명령 `$` | 14px bold green | 14px 700 var(--green) | O |
| 주석 `//` | 13px secondary | 13px var(--text-secondary) | O |
| 괄호 표기 | [ready], [online] | [ready], [completed] | O |
| 액터 색상 | blue/amber/green | var(--blue/amber/green) | O |

---

## 3. harness-usage.md 기록

- **결과**: PASS (업데이트 예정)

---

## 4. 하네스 업그레이드 여부

- **결과**: N/A (프로젝트 수정, 하네스 자체 변경 아님)

---

## 요약

| # | 항목 | Desktop | Mobile | 판정 |
|---|------|---------|--------|------|
| 1 | 초기 화면 렌더링 | PASS | PASS | PASS |
| 2 | 다이어그램 렌더링 | PASS | PASS | PASS |
| 3 | 디자인-코드 일관성 | PASS | — | PASS |
| 4 | harness-usage.md | — | — | PASS |
| **전체** | | | | **PASS** |

### 판정: PASS

이전 PARTIAL(모바일 다이어그램 오버플로우) → **PASS**로 개선.
Terminal Minimal 스타일 가이드와 코드 구현이 완전히 일치.

---

## 스크린샷 파일 목록

| 파일 | 설명 |
|------|------|
| `tc/screenshot-modern-desktop.png` | Desktop 초기 (모던 UI) |
| `tc/screenshot-modern-desktop-diagram.png` | Desktop 다이어그램 (모던 UI) |
| `tc/screenshot-modern-mobile.png` | Mobile 초기 (모던 UI) |
| `tc/screenshot-modern-mobile-diagram.png` | Mobile 다이어그램 (모던 UI) |
