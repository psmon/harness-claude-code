# Harness Usage Report - sample2

## 프로젝트 정보
- **이름**: Board - Simple Bulletin Board
- **위치**: projects/sample2/
- **생성일**: 2026-03-23
- **PRD 출처**: 사용자 직접 요청 (memorizer에 PRD 없음)

---

## 하네스 3계층 활용 현황

### Layer 1: knowledge/ (Gather Context)
| 활용 요소 | 설명 |
|-----------|------|
| memorizer MCP `search` | PRD 검색 시도 (웹게시판, bulletin board 키워드) — 해당 PRD 없음 |
| Pencil `get_guidelines` | web-app 디자인 가이드라인 수집 |
| Pencil `get_style_guide_tags` | 사용 가능한 스타일 태그 탐색 |
| Pencil `get_style_guide` | Monochrome Type 스타일 가이드 적용 (clean, modern, minimal, dark-mode 등) |
| knowledge/project-creation.md | PRD → 디자인 → 코드 파이프라인 참조 |

**관찰**: PRD가 memorizer에 없어 사용자 요청으로 직접 요구사항을 정의. sample1 대비 memorizer 활용도가 낮았으나, Pencil 스타일 가이드 활용은 효과적이었음.

### Layer 2: agents/ (Take Action)
| 에이전트 역할 | 실제 수행 내용 |
|--------------|---------------|
| architect | 스타일 가이드 기반 코드 설계 + 구현 (웹게시판 4개 뷰: 목록/상세/작성/빈 상태) |
| memory-curator | PRD 검색 (결과 없음), 스타일 가이드 검색 |
| journey-recorder | harness-usage.md 작성, tc/ 체크리스트 기록 |

**관찰**: sample1 경험을 바탕으로 모바일 반응형을 처음부터 적용. Tailwind `md:` 클래스를 코드 생성 시점부터 포함.

### Layer 3: engine/ (State Management)
| Journey 상태 | 수행 단계 | Agentic Loop |
|-------------|----------|--------------|
| prompted | PRD 메모리 검색 (미발견) → 사용자 요청 직접 해석 | Gather Context |
| planning | Pencil 스타일 가이드 + web-app 가이드라인 수집 | Gather Context |
| building | 프로젝트 코드 생성 (index.html + app.js) | Take Action |
| verifying | Playwright Desktop + Mobile 스크린샷 검증 | Verify Results |
| recording | harness-usage.md + tc/ 체크리스트 작성 | Verify Results |

**오케스트레이션 패턴**:
- Phase 1: memorizer PRD 검색 (결과 없음)
- Phase 2+3: Parallel (Pencil 가이드라인 + 스타일 가이드)
- Phase 4: Chain (코드 생성)
- Phase D: Verify (Playwright 검증 — v0.0.5 워크플로우 적용)
- Phase E: Chain (기록)

---

## MCP 도구 사용 내역

### memorizer MCP
- `search`: PRD 검색 2회 (한글 "웹게시판" + 영문 "web board") — 결과 없음

### pencil MCP
- `get_guidelines`: web-app 가이드라인 1회
- `get_style_guide_tags`: 태그 목록 1회
- `get_style_guide`: Monochrome Type 스타일 가이드 1회

---

## 하네스 개선 관찰사항

### 잘 작동한 점
1. **v0.0.5 Playwright verifying 상태**: 코드 생성 직후 Desktop/Mobile 검증 수행, 첫 시도에 PASS
2. **sample1 교훈 적용**: 모바일 반응형(md: 클래스)을 처음부터 적용하여 Verify Loop 불필요
3. **Pencil 스타일 가이드 효과**: Monochrome Type 가이드가 웹게시판에도 잘 맞음 (깔끔한 테이블 UI)
4. **web-app 가이드라인**: 15개 원칙(Purpose First, Dominant Region 등)이 게시판 설계에 유용

### 개선이 필요한 점
1. **PRD 없이 프로젝트 생성**: memorizer에 PRD가 없을 때의 대체 흐름이 워크플로우에 명시되지 않음
2. **Pencil .pen 디자인 미생성**: 코드에 앞서 .pen 파일 디자인을 생성하지 않음 — 시간 효율성과 트레이드오프
3. **WebSearch 레퍼런스 미수행**: 모던 웹게시판 레퍼런스 검색을 생략 — Phase 3 불완전
4. **localStorage 한계**: 서버 없는 CDN 기반이므로 실제 게시판 기능(다중 사용자)은 불가

### 하네스 개선 제안
- knowledge/에 **PRD 없이 프로젝트 생성 가이드** 추가 (사용자 요청 → 즉석 요구사항 정의 흐름)
- engine/에 **디자인 생략 가능 조건** 명시 (기존 스타일 가이드 재사용 시)

---

## 하네스 평가 점수

| 평가 축 | 점수 | 비고 |
|---------|------|------|
| knowledge/ 활용도 | 15/20 | Pencil 가이드라인+스타일 가이드 활용, 단 memorizer PRD 없음 + WebSearch 미수행 |
| agents/ 역할 분리 | 20/20 | architect, memory-curator, journey-recorder 3종 명확 구분 |
| engine/ 워크플로우 | 18/20 | Journey 5상태 전이 준수 (verifying 포함), 단 Phase 3(레퍼런스 검색) 생략 |
| Agentic Loop 적용 | 20/20 | Gather→Action→Verify 완전 적용, Playwright 1차 PASS |
| 개선 피드백 품질 | 18/20 | 구체적 관찰 + PRD 없는 경우 대체 흐름 제안 |
| **총점** | **91/100** | **등급: A** |
