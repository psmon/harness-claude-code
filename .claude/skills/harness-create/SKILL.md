---
name: harness-create
description: >
  하네스 하위 요소 생성 및 하네스 자체 업그레이드를 가이드합니다.
  하네스를 개선하거나 새 컴포넌트(agents, knowledge, engine)를 추가할 때,
  또는 "하네스를 추가 개선 하고자 합니다"와 같은 요청에 사용합니다.
  Guides harness sub-element creation and upgrades using project rules.
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
  - mcp__pencil__batch_design
  - mcp__pencil__batch_get
  - mcp__pencil__get_editor_state
  - mcp__pencil__open_document
  - mcp__pencil__get_screenshot
  - mcp__pencil__snapshot_layout
  - mcp__pencil__find_empty_space_on_canvas
---

# 하네스 생성/업그레이드 가이드

## 현재 하네스 상태

- 설정: harness.config.json을 Read 도구로 읽기
- 최신 버전 기록: Glob으로 `docs/v*.md` 검색 후 최신 파일을 Read 도구로 읽기
- 최근 변경: !`git log --oneline -5`

---

## 작업 유형 판별

$ARGUMENTS 를 분석하여 적절한 워크플로우를 선택합니다:

### A. 하네스 하위 요소 생성 (New Sub-Element)
새 에이전트, 지식 스킬, 엔진 컴포넌트를 추가할 때
→ **6-Phase 워크플로우** 적용
→ 상세: [reference/six-phase-workflow.md](reference/six-phase-workflow.md) 읽기

### B. 하네스 자체 업그레이드 (Harness Upgrade)
프로젝트 구조, 설정, 컨셉을 개선할 때
→ **업그레이드 워크플로우** 적용

### C. 기존 요소 설명 (Describe Existing)
현재 하네스 구성을 파악하고 설명할 때
→ 3계층 가이드 참조 후 현황 보고

---

## A. 6-Phase 워크플로우 (신규 요소 생성)

revfactory의 도메인 분석 기반 6단계를 이 프로젝트에 맞게 적용합니다.
전체 Phase 상세는 [reference/six-phase-workflow.md](reference/six-phase-workflow.md) 참조.

1. **도메인 분석** — memorizer MCP에서 관련 지식 검색 (`mcp__memorizer__search`)
2. **팀 디자인** — 기존 `agents/` 구조 확인, 새 요소의 위치 결정
3. **에이전트 정의** — 역할/능력 스펙 작성
4. **스킬 설계** — `knowledge/`에 스킬 매핑 정의
5. **워크플로우** — `engine/`에 워크플로우 통합
6. **검증** — 생성된 요소가 3계층에 올바르게 배치되었는지 확인

> 단순 요소 추가(문서만)인 경우 Phase 1, 6만 수행해도 됨.

---

## B. 업그레이드 워크플로우 (하네스 자체 개선)

### Step 1: 현황 파악
- 3계층 디렉토리 현황 확인 (`knowledge/`, `agents/`, `engine/`)
- `harness.config.json` 설정 확인
- 최신 `docs/vX.Y.Z.md`의 "다음 버전 예정" 항목 확인

### Step 2: 개선 계획 수립
- Plan 모드에서 변경 사항 설계
- memorizer MCP에서 관련 지식 검색

### Step 3: 구현
- 변경 사항 적용
- 3계층 가이드에 따라 올바른 디렉토리에 배치: [reference/layer-guide.md](reference/layer-guide.md)

### Step 4: 필수 산출물 갱신
- 아래 체크리스트 **4종 모두** 갱신 필수

---

## 필수 산출물 체크리스트

하네스가 개선될 때마다 **반드시** 다음 4가지를 갱신합니다:

- [ ] **docs/vX.Y.Z.md** — 새 버전 히스토리 생성
  - 템플릿: [templates/version-history.md](templates/version-history.md) 참조
  - 버전 규칙: [reference/version-convention.md](reference/version-convention.md) 참조
- [ ] **README.md** — 버전 히스토리 테이블에 행 추가, 적용된 개념 갱신
- [ ] **design/blueprint.pen** — Pencil MCP로 블루프린트 갱신
  - `mcp__pencil__open_document`로 열기 → `mcp__pencil__batch_design`으로 수정
- [ ] **design/architecture.md** — mermaid 다이어그램에 변경사항 반영

### 버전 넘버링 규칙 (요약)
- **Patch** (0.0.x): 하위 요소 추가, 문서 보강
- **Minor** (0.x.0): 새 계층 기능, 워크플로우 추가
- **Major** (x.0.0): 아키텍처 변경
- `harness.config.json`의 `version` 필드도 함께 갱신

---

## 3계층 빠른 참조

| 계층 | 디렉토리 | 용도 | 핵심 MCP |
|------|----------|------|----------|
| Layer 1 | `knowledge/` | 도메인 지식, 스킬 매핑 | memorizer |
| Layer 2 | `agents/` | 경량 에이전트 정의 | memorizer |
| Layer 3 | `engine/` | 여정 상태, 워크플로우 | — |
| 지원 | `hooks/`, `scripts/`, `servers/`, `templates/` | 인프라 | — |
| 설계 | `design/` | 블루프린트, 아키텍처 | pencil |
| 기록 | `docs/`, `prompt/` | 여정 히스토리 | — |

상세 가이드: [reference/layer-guide.md](reference/layer-guide.md)

---

## 여정 기록 규칙

이 프로젝트는 **결과보다 과정**에 집중합니다.

1. **프롬프트 아카이브**: 작업에 사용된 프롬프트를 `prompt/NN-[설명].md`로 저장
2. **버전 히스토리**: `docs/vX.Y.Z.md`에 반드시 포함할 섹션:
   - 이 버전에서 한 일
   - 핵심 설계 결정
   - 여정 기록 (작업 과정, 참고한 메모리, harness에 반영한 점)
   - 다음 버전 예정
3. **블루프린트 갱신**: Pencil MCP로 시각적 설계 업데이트

---

## 주의사항

- `design/blueprint.pen`은 **반드시 Pencil MCP 도구로만** 접근 (Read/Grep 사용 금지)
- memorizer MCP 검색 시 한글/영문 키워드 모두 시도
- 새 디렉토리 생성 시 해당 디렉토리의 `TODO.md`도 함께 갱신
