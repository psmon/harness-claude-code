# harness-claude-code 아키텍처

## 전체 구조

```mermaid
graph LR
  UP[User Prompt] --> K[Layer 1: Knowledge<br/>메모리 MCP 기반 동적 지식]
  UP --> A[Layer 2: Agents<br/>경량 에이전트]
  UP --> E[Layer 3: Engine<br/>여정 상태 관리]

  K --> MM[memorizer MCP]
  A --> MM
  E --> DOC[docs/<br/>여정 기록]

  K --> PM[pencil MCP]
  A --> PM
  E --> PM
  PM --> BP[design/blueprint.pen]
```

## 여정(Journey) 상태 모델

bkit의 PDCA State Machine(20 transitions, 9 guards) 대신,
단순한 선형 여정 모델로 시작합니다.

```mermaid
stateDiagram-v2
  [*] --> idle
  idle --> prompted: 프롬프트 입력
  prompted --> planning: 플랜 수립
  planning --> building: 구현 시작
  building --> verifying: Playwright 검증
  verifying --> building: 검증 실패
  verifying --> recording: 검증 통과
  recording --> idle: 버전 발행
```

| 상태 | 설명 | 산출물 |
|------|------|--------|
| idle | 대기 | - |
| prompted | 프롬프트 입력됨 | `prompt/*.md` |
| planning | 설계 진행 중 | 플랜 파일 |
| building | 구현 진행 중 | 소스 코드, 설정 |
| verifying | Playwright 브라우저 검증 | `tc/screenshot-*.png`, 체크리스트 |
| recording | 여정 기록 중 | `docs/vX.Y.Z.md`, `design/` 갱신 |

## 디렉토리-계층 매핑

```mermaid
graph TD
  ROOT[harness-claude-code] --> L1[knowledge/<br/>Layer 1: Domain Knowledge]
  ROOT --> L2[agents/<br/>Layer 2: Behavioral Rules]
  ROOT --> L3[engine/<br/>Layer 3: State Management]
  ROOT --> HK[hooks/<br/>이벤트 훅]
  ROOT --> SC[scripts/<br/>실행 스크립트]
  ROOT --> SV[servers/<br/>MCP 연동]
  ROOT --> DS[design/<br/>블루프린트]
  ROOT --> DC[docs/<br/>여정 기록]
  ROOT --> PR[prompt/<br/>프롬프트 아카이브]
  ROOT --> TM[templates/<br/>템플릿]

  L1 -.->|동적 로딩| MEM[(memorizer MCP)]
  DS -.->|시각화| PEN[(pencil MCP)]
```

## bkit 대비 차별화

| 관점 | bkit | harness |
|------|------|---------|
| 지식 소스 | 정적 SKILL.md 36개 | 메모리 MCP 동적 검색 |
| 상태 모델 | PDCA (20 transitions, 9 guards) | Journey (4 states, 선형) |
| 시각화 | CLI 대시보드 (텍스트 기반) | Pencil MCP 블루프린트 (.pen) |
| 에이전트 | 31개 (opus 10 / sonnet 19 / haiku 2) | 최소 출발, 점진 성장 |
| 훅 시스템 | 6-Layer (18 이벤트) | Layer 1 (hooks.json) 중심 |
| 개발 기록 | PDCA docs + archive | 프롬프트 여정 중심 기록 |
| 설치 | 플러그인 마켓플레이스 | 독립 프로젝트 |

## 데이터 흐름

```mermaid
sequenceDiagram
  participant U as User
  participant H as Harness
  participant M as memorizer MCP
  participant P as pencil MCP

  U->>H: 프롬프트 입력
  H->>M: 관련 지식 검색
  M-->>H: 메모리 결과
  H->>H: 플랜 수립 & 구현
  H->>P: 블루프린트 갱신
  H->>H: docs/ 여정 기록
  H-->>U: 결과 + 버전 발행
```

---

## Agentic Loop ↔ Journey 통합 모델 (v0.0.3 추가)

> 출처: memorizer `aa36789f` (악분 - Claude Code 동작 원리 Part 1)

### Agentic Loop

```mermaid
flowchart LR
    User[사용자] --> GC[Gather Context<br/>맥락 수집]
    GC --> TA[Take Action<br/>행동]
    TA --> VR[Verify Results<br/>검증]
    VR -->|반복| GC
    VR -->|완료| Done[작업 완료]
```

### Journey ↔ Agentic Loop 매핑

```mermaid
graph TB
    subgraph Journey["Journey 상태 모델"]
        idle --> prompted --> planning --> building --> recording --> idle
    end
    subgraph AgenticLoop["Agentic Loop"]
        GC[Gather Context] --> TA[Take Action] --> VR[Verify Results]
        VR -.->|반복| GC
    end
    planning -.-> GC
    building -.-> TA
    recording -.-> VR
```

### 하네스 6대 구성요소 → 디렉토리 매핑

```mermaid
graph LR
    subgraph Harness["AI Agent = AI 모델 + Harness"]
        T[1. Tools] --> SV[servers/]
        P[2. Permission] --> HK[hooks/]
        SB[3. Sandbox] --> SC[scripts/]
        SE[4. Session] --> EN[engine/]
        CTX[5. Context/Memory] --> KN[knowledge/]
        EXT[6. Extensibility] --> SK[.claude/skills/]
    end
```

### 에이전트 3종과 Agentic Loop

```mermaid
graph TD
    subgraph AgenticLoop["Agentic Loop"]
        GC[Gather Context]
        TA[Take Action]
        VR[Verify Results]
        GC --> TA --> VR
        VR -.->|반복| GC
    end

    ARC[architect] -->|주도| GC
    ARC -->|주도| TA
    MC[memory-curator] -->|지원| GC
    JR[journey-recorder] -->|주도| VR
```

### 오케스트레이터 패턴

```mermaid
graph LR
    subgraph Chain["Chain (기본)"]
        C1[architect<br/>planning] --> C2[architect<br/>building] --> C3[journey-recorder<br/>recording]
    end
    subgraph Parallel["Parallel (지식 보강)"]
        P1[architect<br/>planning] --> P3[architect<br/>building]
        P2[memory-curator<br/>search] --> P3
    end
    subgraph Verify["Verify (검증 실패)"]
        V1[building] --> V2[recording] --> V3{검증?}
        V3 -->|실패| V4[planning 복귀]
        V3 -->|성공| V5[완료]
    end
```

---

## revfactory 하네스: Agent Team & Skill Architect (v0.0.2 추가)

> 출처: [revfactory](https://github.com/revfactory) — 도메인 분석 기반 하네스 설계

### 6-Phase 워크플로우

도메인 분석에서 출발하여 검증/배포까지 이르는 6단계 구조가 핵심입니다.

```mermaid
graph LR
  P1[1. 도메인 분석<br/>Domain Analysis] --> P2[2. 팀 디자인<br/>Team Design]
  P2 --> P3[3. 에이전트 정의<br/>Agent Definition]
  P3 --> P4[4. 스킬 설계<br/>Skill Design]
  P4 --> P5[5. 워크플로우<br/>Workflow Setup]
  P5 --> P6[6. 검증 & 배포<br/>Verify & Deploy]
```

| Phase | 설명 | harness 대응 |
|-------|------|-------------|
| 1. 도메인 분석 | 문제 영역을 먼저 분석 | `knowledge/` 메모리 기반 도메인 탐색 |
| 2. 팀 디자인 | 에이전트 팀 구성 설계 | `agents/` 팀 구조 정의 |
| 3. 에이전트 정의 | 개별 에이전트 역할/능력 | `agents/` 에이전트 스펙 |
| 4. 스킬 설계 | 에이전트별 스킬 부여 | `knowledge/` 스킬 매핑 |
| 5. 워크플로우 | 실행 흐름 구성 | `engine/` 워크플로우 정의 |
| 6. 검증 & 배포 | 결과 검증 및 배포 | `engine/` 검증 게이트 |

### Core Components

```mermaid
graph TD
  ORCH[오케스트레이터<br/>Orchestrator] --> AA[에이전트 A]
  ORCH --> AB[에이전트 B]
  ORCH --> AC[에이전트 C]
  AA --> S1[스킬 1]
  AA --> S2[스킬 2]
  AB --> S3[스킬 3]
  AC --> SN[스킬 N]
  ORCH -.->|SharedMemory| SM[(공유 메모리)]
  ORCH -.->|ContextWindow| CW[(컨텍스트)]
```

### Two Execution Modes

```mermaid
graph LR
  subgraph "에이전트 팀 모드 (기본)"
    SM1[SpawnManager] --> A1[Agent A]
    SM1 --> A2[Agent B]
    TC1[TaskCreate] --> A1
    TC1 --> A2
  end
  subgraph "시니어 에이전트 모드 (메인)"
    MA[Main Agent] --> SA1[Agent A]
    MA --> SA2[Agent B]
    MA --> SA3[Agent C]
    GC[글로벌 컨텍스트] -.-> MA
  end
```

| 모드 | 특징 | 통신 방식 |
|------|------|-----------|
| 에이전트 팀 | SpawnManager가 Agent 생성, TaskCreate로 작업 배분 | TaskCreate/Update |
| 시니어 에이전트 | 메인 Agent가 전체 조율, 글로벌 컨텍스트 공유 | SendMessage (실시간) |

### Architecture Patterns & Data Protocols

**패턴**: Chain · Verify · Parallel · Workflow

**프로토콜**:
| 프로토콜 | 용도 |
|----------|------|
| SendMessage | 실시간 에이전트 간 통신 |
| TaskCreate/Update | 작업 추적 |
| 파일 기록 | Workspace/Artifacts 영속화 |

---

## 프로젝트 생성 워크플로우 (v0.0.4 추가)

> 출처: projects/sample1 생성 여정 (2026-03-23)

### PRD → 프로젝트 생성 파이프라인

```mermaid
flowchart LR
    PRD[PRD 메모리<br/>memorizer] --> D[Phase A<br/>디자인<br/>Pencil MCP]
    PRD --> S[Phase B<br/>레퍼런스 검색<br/>WebSearch]
    D --> C[Phase C<br/>코드 생성<br/>Write]
    S --> C
    C --> R[Phase D<br/>하네스 기록<br/>harness-usage.md]
    R --> U[Phase E<br/>하네스 업그레이드<br/>harness-create]
    U -.->|피드백 루프| PRD
```

### 프로젝트 생성 시 3계층 활용

```mermaid
graph TD
    subgraph "Layer 1: knowledge/"
        K1[project-creation.md<br/>파이프라인 지식]
        K2[memorizer PRD<br/>요구사항]
        K3[Pencil 디자인<br/>가이드라인]
    end
    subgraph "Layer 2: agents/"
        A1[architect<br/>디자인 + 코드]
        A2[memory-curator<br/>PRD + 검색]
        A3[journey-recorder<br/>기록]
    end
    subgraph "Layer 3: engine/"
        E1[project-creation-workflow.md<br/>5단계 워크플로우]
    end
    subgraph "산출물"
        P1[projects/sample1/]
        P2[harness-usage.md]
        P3[design/project1.pen]
    end

    K1 --> A1
    K2 --> A2
    K3 --> A1
    A1 --> P1
    A1 --> P3
    A2 --> A1
    A3 --> P2
    E1 -.->|상태 관리| A1
    E1 -.->|상태 관리| A3
```

### 디렉토리 구조 (projects/ 추가)

```mermaid
graph TD
    ROOT[harness-claude-code] --> L1[knowledge/<br/>Layer 1]
    ROOT --> L2[agents/<br/>Layer 2]
    ROOT --> L3[engine/<br/>Layer 3]
    ROOT --> PJ[projects/<br/>하네스 활용 프로젝트]
    ROOT --> DS[design/<br/>블루프린트 + 프로젝트 디자인]
    ROOT --> DC[docs/<br/>여정 기록]

    PJ --> S1[sample1/<br/>React 소개 페이지]
    DS --> BP[blueprint.pen<br/>하네스 블루프린트]
    DS --> P1[project1.pen<br/>sample1 디자인]

    L1 -.->|PRD 파이프라인| PJ
    L2 -.->|에이전트 실행| PJ
    L3 -.->|워크플로우 관리| PJ
```

---

## Playwright 검증 워크플로우 (v0.0.5 추가)

> 출처: projects/sample1 Playwright CLI 검증 여정 (2026-03-23)

### 검증 흐름

```mermaid
flowchart LR
    B[building<br/>코드 생성] --> SV[로컬 서버<br/>npx serve]
    SV --> DT[Chromium Desktop<br/>1280x720]
    SV --> MB[Chromium Mobile<br/>375x812]
    DT --> CHK{스크린샷<br/>검증}
    MB --> CHK
    CHK -->|PASS| R[recording<br/>하네스 기록]
    CHK -->|FAIL| B
```

### Journey 상태 전이 (verifying 추가)

```mermaid
stateDiagram-v2
    [*] --> idle
    idle --> prompted: PRD 확인
    prompted --> planning: 디자인 + 검색
    planning --> building: 코드 생성
    building --> verifying: Playwright 검증
    verifying --> building: FAIL → 수정
    verifying --> recording: PASS
    recording --> idle: 완료

    note right of verifying: Chromium Desktop + Mobile
```
