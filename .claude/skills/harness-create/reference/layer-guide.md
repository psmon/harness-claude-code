# 3계층 디렉토리 가이드

## 계층 구조 개요

```
User Prompt
├── Layer 1: knowledge/    메모리 MCP 기반 동적 지식
├── Layer 2: agents/       경량 에이전트 (메모리 기반 동적 구성)
└── Layer 3: engine/       여정(Journey) 기반 상태 추적
```

---

## Layer 1: knowledge/ — 도메인 지식

**역할**: 메모리 MCP에 축적된 지식을 구조화된 스킬로 변환

**핵심 특성**:
- bkit의 36개 정적 Skills를 메모리 MCP 동적 검색으로 대체
- 세 가지 지식 분류: Workflow, Capability, Hybrid
- revfactory Phase 4(스킬 설계)의 영향

**파일 작성 규칙**:
- 스킬 정의: `knowledge/[스킬명].md` 또는 `knowledge/[카테고리]/[스킬명].md`
- TODO 관리: `knowledge/TODO.md` 갱신 필수

**MCP 연동**:
- `mcp__memorizer__search`: 키워드 기반 지식 검색
- `mcp__memorizer__get`: 특정 메모리 조회
- `mcp__memorizer__get_many`: 다수 메모리 일괄 조회

---

## Layer 2: agents/ — 행동 규칙

**역할**: 메모리 MCP 지식 위에서 동작하는 경량 에이전트 정의

**핵심 특성**:
- 최소 에이전트로 시작, 점진적 성장 (bkit 31개 대비)
- 메모리 MCP에서 동적으로 컨텍스트 로딩
- 계획된 핵심 에이전트: architect, journey-recorder, memory-curator

**파일 작성 규칙**:
- 에이전트 정의: `agents/[에이전트명].md`
- 팀 구성: `agents/teams/[팀명].md` (팀 단위 시)
- TODO 관리: `agents/TODO.md` 갱신 필수

**에이전트 스펙 포함사항**:
- 이름, 역할, 설명
- 사용 도구 목록 (MCP 포함)
- 트리거 조건
- 입/출력 정의
- 다른 에이전트와의 관계

---

## Layer 3: engine/ — 상태 관리

**역할**: 프롬프트 주도 개발의 여정(Journey) 상태를 추적 관리

**Journey 상태 모델**:
```
idle → prompted → planning → building → recording → idle
```

| 상태 | 설명 | 산출물 |
|------|------|--------|
| idle | 대기 | — |
| prompted | 프롬프트 입력됨 | `prompt/*.md` |
| planning | 설계 진행 중 | 플랜 파일 |
| building | 구현 진행 중 | 소스 코드, 설정 |
| recording | 여정 기록 중 | `docs/vX.Y.Z.md`, `design/` 갱신 |

**파일 작성 규칙**:
- 워크플로우 정의: `engine/[워크플로우명].md`
- 상태 모델: `engine/states/[상태모델명].md`
- TODO 관리: `engine/TODO.md` 갱신 필수

---

## 지원 디렉토리

### hooks/ — 이벤트 훅
Claude Code 라이프사이클 이벤트 훅
- SessionStart: 현재 여정 상태 표시
- Stop: 여정 기록 자동 저장
- PreToolUse/PostToolUse: 메모리 MCP 호출 로깅

### scripts/ — 실행 스크립트
훅 및 자동화 스크립트
- 훅 런타임 (Node.js 또는 Shell)
- 메모리 MCP 자동 검색 스크립트
- 여정 기록 자동화

### servers/ — MCP 서버 연동
필수 MCP 서버 설정:
1. **memorizer** — 지식 저장, 검색, 그래프 탐색
2. **pencil** — 블루프린트 시각화 (.pen 파일)

### templates/ — 문서 템플릿
표준 템플릿:
- 버전 히스토리 (`docs/vX.Y.Z.md`)
- TODO.md 형식
- 여정 기록
- 블루프린트 변경 로그

---

## 디렉토리 선택 가이드

새 요소를 추가할 때 어디에 배치할지 결정하는 기준:

| 질문 | Yes → | No → |
|------|-------|------|
| 도메인 지식이나 스킬인가? | `knowledge/` | 다음 질문 |
| 행동 규칙이나 에이전트인가? | `agents/` | 다음 질문 |
| 상태/워크플로우 관련인가? | `engine/` | 다음 질문 |
| 이벤트 반응인가? | `hooks/` | 다음 질문 |
| 자동화 스크립트인가? | `scripts/` | 다음 질문 |
| MCP 서버 설정인가? | `servers/` | 다음 질문 |
| 재사용 가능한 문서 틀인가? | `templates/` | 다음 질문 |
| 시각적 설계인가? | `design/` | `docs/` or `prompt/` |

---

## MCP 연동 요약

### memorizer MCP (Layer 1, 2 핵심)
```
검색: mcp__memorizer__search — 키워드 기반
조회: mcp__memorizer__get — ID 기반 단건
일괄: mcp__memorizer__get_many — ID 기반 다건
그래프: mcp__memorizer__search_graph — 관계 탐색
```

### pencil MCP (design/ 핵심)
```
열기: mcp__pencil__open_document — .pen 파일 열기
조회: mcp__pencil__batch_get — 노드 검색/읽기
수정: mcp__pencil__batch_design — 노드 삽입/수정/삭제
스냅샷: mcp__pencil__snapshot_layout — 레이아웃 확인
스크린샷: mcp__pencil__get_screenshot — 시각적 검증
```

> **주의**: `.pen` 파일은 암호화되어 있으므로 **반드시 Pencil MCP 도구로만** 접근합니다. Read, Grep 등 일반 도구로는 내용을 읽을 수 없습니다.
