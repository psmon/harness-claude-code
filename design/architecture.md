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
  building --> recording: 결과 기록
  recording --> idle: 버전 발행
```

| 상태 | 설명 | 산출물 |
|------|------|--------|
| idle | 대기 | - |
| prompted | 프롬프트 입력됨 | `prompt/*.md` |
| planning | 설계 진행 중 | 플랜 파일 |
| building | 구현 진행 중 | 소스 코드, 설정 |
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
