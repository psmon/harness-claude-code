---
name: harness-usage
description: >
  하네스를 이용해 프로젝트를 안전하게 생성 및 수정합니다.
  프로젝트 생성/수정 후 검증(tc/)과 하네스 활용 평가(harness-usage.md)를 포함합니다.
  "하네스를 이용해 프로젝트를 생성하려 합니다", "프로젝트를 수정하려 합니다" 등의 요청에 사용합니다.
  Safely create and modify projects using the harness framework with verification and evaluation.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Write
  - Edit
  - Bash(git *)
  - mcp__memorizer__search
  - mcp__memorizer__get
  - mcp__memorizer__get_many
  - mcp__memorizer__store
  - mcp__pencil__batch_design
  - mcp__pencil__batch_get
  - mcp__pencil__get_editor_state
  - mcp__pencil__open_document
  - mcp__pencil__get_screenshot
  - mcp__pencil__get_guidelines
  - mcp__pencil__get_style_guide_tags
  - mcp__pencil__get_style_guide
  - mcp__pencil__snapshot_layout
  - mcp__pencil__find_empty_space_on_canvas
  - WebSearch
---

# 하네스 활용 — 프로젝트 생성/수정 가이드

## 현재 하네스 상태

- 설정: harness.config.json을 Read 도구로 읽기
- 최신 버전 기록: Glob으로 `docs/v*.md` 검색 후 최신 파일을 Read 도구로 읽기
- 최근 변경: !`git log --oneline -5`

---

## 작업 유형 판별

$ARGUMENTS 를 분석하여 적절한 워크플로우를 선택합니다:

### A. 프로젝트 생성 (New Project)
새 프로젝트를 하네스를 활용하여 생성할 때
→ **프로젝트 생성 워크플로우** 적용

### B. 프로젝트 수정 (Modify Project)
기존 프로젝트를 수정할 때
→ **프로젝트 수정 워크플로우** 적용

### C. 프로젝트 검증만 (Verify Only)
기존 프로젝트의 검증과 하네스 평가만 수행할 때
→ **검증 & 평가 워크플로우**만 적용

---

## A. 프로젝트 생성 워크플로우

하네스 3계층(knowledge/agents/engine)을 활용하여 프로젝트를 생성합니다.
참조: `knowledge/project-creation.md`, `engine/project-creation-workflow.md`

### Phase 1: PRD 확인 (Gather Context)
- memorizer MCP에서 PRD 메모리 검색 (`mcp__memorizer__search`, `mcp__memorizer__get`)
- PRD가 없으면 사용자에게 요구사항 직접 확인
- 프로젝트 이름과 `projects/[이름]/` 경로 결정

### Phase 2: 디자인 (Gather Context, 병렬 가능)
- `mcp__pencil__get_guidelines` — 프로젝트 유형에 맞는 가이드라인 (landing-page, web-app, mobile-app 등)
- `mcp__pencil__get_style_guide_tags` → `mcp__pencil__get_style_guide` — 스타일 가이드
- `mcp__pencil__open_document("new")` — 새 .pen 파일 생성
- `mcp__pencil__batch_design` — 섹션별 디자인 (최대 25 ops/call)
- `mcp__pencil__get_screenshot` — 디자인 시각적 검증
- 결과물: `design/[프로젝트명].pen`

### Phase 3: 레퍼런스 검색 (Gather Context, Phase 2와 병렬)
- WebSearch로 기술 스택 관련 모던 레퍼런스 검색
- 유용한 패턴 발견 시 memorizer에 저장 (`mcp__memorizer__store`)

### Phase 4: 코드 생성 (Take Action)
- `projects/[이름]/` 하위에 프로젝트 파일 생성
- 디자인 파일의 색상/타이포/레이아웃을 코드에 충실히 반영
- 표준 산출물 구조: [reference/project-structure.md](reference/project-structure.md) 참조

### Phase 5: 검증 & 하네스 평가 (Verify Results)
→ **반드시 섹션 C를 수행**

---

## B. 프로젝트 수정 워크플로우

### Phase 1: 현재 상태 파악 (Gather Context)
- `projects/[이름]/` 하위 파일 모두 읽기
- 기존 `harness-usage.md` 확인 (이전 하네스 활용 내역)
- 기존 `tc/` 디렉토리에서 이전 체크리스트 확인
- 관련 디자인 파일(.pen) 확인

### Phase 2: 수정 설계 (Gather Context)
- 수정 범위와 영향도 분석
- 필요 시 memorizer에서 관련 지식 검색
- 디자인 변경이 필요한 경우 Pencil MCP로 .pen 파일 업데이트

### Phase 3: 수정 적용 (Take Action)
- Edit 도구로 기존 파일 수정 (Write보다 Edit 선호)
- 새 파일 추가 시 Write 도구 사용
- README.md 업데이트 (변경사항 반영)

### Phase 4: 검증 & 하네스 평가 (Verify Results)
→ **반드시 섹션 C를 수행** (수정 시에도 새 체크리스트 작성)

---

## C. 검증 & 하네스 평가

프로젝트 생성/수정 후 **반드시** 수행합니다.

### Step 1: 프로젝트 검증 체크리스트

`projects/[이름]/tc/checklist-vX.Y.Z.md` 에 상세 검증 결과를 기록합니다.
템플릿: [reference/checklist-template.md](reference/checklist-template.md)

**4대 검증 항목:**

| # | 항목 | 검증 방법 |
|---|------|----------|
| 1 | 브라우저 렌더링 | HTML 구조, CDN 경로, 마운트 포인트 검증 |
| 2 | 디자인-코드 일관성 | .pen 스크린샷과 코드의 색상/타이포/레이아웃 대조 |
| 3 | harness-usage.md 기록 | 3계층 활용 내역 완성도 확인 |
| 4 | 하네스 업그레이드 여부 | 필수 4종 산출물 갱신 필요성 판단 |

각 항목에 **PASS/FAIL** + 상세 근거를 기록합니다.

### Step 2: 하네스 활용 보고서

`projects/[이름]/harness-usage.md` 에 하네스 활용 내역을 기록합니다.

**필수 포함 섹션:**
1. 프로젝트 정보 (이름, 위치, 날짜, PRD 출처)
2. Layer 1: knowledge/ 활용 (MCP 도구, 가이드라인, 레퍼런스)
3. Layer 2: agents/ 활용 (에이전트 역할 매핑)
4. Layer 3: engine/ 활용 (Journey 상태 전이, 오케스트레이션)
5. MCP 도구 사용 내역
6. 하네스 개선 관찰사항 (잘 된 점 + 개선 필요점)

### Step 3: 하네스 평가 점수

하네스 활용도를 5개 축으로 평가합니다.
평가 기준: [reference/harness-evaluation.md](reference/harness-evaluation.md)

| 평가 축 | 배점 | 기준 |
|---------|------|------|
| knowledge/ 활용도 | /20 | memorizer PRD 조회, Pencil 가이드라인, WebSearch 참조 |
| agents/ 역할 분리 | /20 | architect(설계+구현), memory-curator(지식), journey-recorder(기록) |
| engine/ 워크플로우 준수 | /20 | Journey 상태 전이(prompted→planning→building→recording) |
| Agentic Loop 적용 | /20 | Gather Context → Take Action → Verify Results 순환 |
| 개선 피드백 품질 | /20 | 관찰사항 구체성, 제안의 실행 가능성 |

**총점 해석:**
- 80-100: 하네스 활용 우수 — 패턴을 베스트 프랙티스로 기록
- 60-79: 양호 — 부족한 축 개선 권장
- 40-59: 미흡 — harness-create로 해당 계층 보강 필요
- 0-39: 하네스 미활용 — 구조 재검토 필요

### Step 4: 하네스 업그레이드 연계 판단

평가 점수 기반으로 다음을 결정합니다:

- **개선사항 발견 시**: `harness-create` 스킬 호출을 안내
  - "이 프로젝트에서 [engine/ 워크플로우가 부족]했습니다. `/harness-create` 로 개선할 수 있습니다."
- **필수 4종 산출물 갱신 필요 시**: 갱신 대상 목록 제시
  - docs/vX.Y.Z.md, README.md, design/blueprint.pen, design/architecture.md

---

## 3계층 빠른 참조

| 계층 | 디렉토리 | 이 스킬에서의 역할 |
|------|----------|-------------------|
| Layer 1 | `knowledge/` | PRD 조회, 디자인 가이드라인, 프로젝트 패턴 |
| Layer 2 | `agents/` | architect(설계+코드), memory-curator(검색), journey-recorder(기록) |
| Layer 3 | `engine/` | project-creation-workflow.md 워크플로우 준수 |
| 검증 | `projects/[이름]/tc/` | 체크리스트 기록 (생성/수정마다) |
| 평가 | `projects/[이름]/harness-usage.md` | 3계층 활용 보고서 + 점수 |

---

## 오케스트레이션 패턴

### 프로젝트 생성 시
```
Phase 2 + Phase 3 (Parallel) — 디자인 + 검색
     ↓
Phase 4 (Chain) — 코드 생성
     ↓
Phase 5 (Chain) — 검증 & 평가
     ↓
(선택) harness-create — 하네스 업그레이드
```

### 프로젝트 수정 시
```
Phase 1 (Chain) — 현재 상태 파악
     ↓
Phase 2 + Phase 3 (Chain) — 설계 + 적용
     ↓
Phase 4 (Chain) — 검증 & 평가
```

---

## 주의사항

- `design/*.pen` 파일은 **반드시 Pencil MCP 도구로만** 접근 (Read/Grep 사용 금지)
- memorizer MCP 검색 시 한글/영문 키워드 모두 시도
- 프로젝트 생성 시 `projects/` 하위에만 생성 (하네스 루트 디렉토리 오염 방지)
- 검증 체크리스트는 **생성뿐 아니라 수정 시에도** 새로 작성
- harness-usage.md의 "개선 관찰사항"이 하네스 발전의 핵심 피드백 — 구체적으로 작성
- 이 스킬은 프로젝트 관리용이며, 하네스 자체 개선은 `harness-create` 스킬 담당
