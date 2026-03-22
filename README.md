# harness-claude-code

![하네서 디벨롭 컨셉](/design/concept.png)

> 다양한 하네스 오픈소스를 개념을 학습하고, 메모리 MCP 지식 + Pencil MCP 시각화로 나만의 Claude Code 하네스를 조립해 나가는 프로젝트 Pencial의 블루프린트로부터 시작해 완성해 나가는 여정을 공유합니다.

## 이 프로젝트는

기존에 공개된 우수한 하네스 오픈소스들을 **참고하고 학습**하여, Claude Code 위에서 동작하는 나만의 하네스를 만들어 가는 프로젝트입니다.

직접 코드를 작성하기보다, 메모리 MCP에 축적한 지식을 기반으로 설계하고 Pencil MCP로 블루프린트를 그리며, 그 여정 자체를 기록하는 데 초점을 둡니다.

### 핵심 특성

| 특성 | 설명 |
|------|------|
| **Memory-Driven** | 메모리 MCP에 축적된 지식이 하네스의 두뇌. 코드 작성 전에 메모리에서 관련 지식을 검색하고 활용 |
| **Blueprint-Visual** | Pencil MCP를 통해 아키텍처와 설계를 시각적 블루프린트(.pen)로 관리 |
| **Journey-Recorded** | 프롬프트 기반 개발의 모든 여정을 기록하고 추적. 결과보다 과정에 집중 |

## 참고한 오픈소스 & 출처

이 프로젝트는 아래 오픈소스들의 아키텍처와 설계 철학을 참고합니다.
각 프로젝트의 라이선스를 존중하며, 직접적인 코드 복제가 아닌 **구조와 개념의 학습 및 재해석**을 목적으로 합니다.

| 프로젝트                                                                    | 참고 내용                                                                                  | 라이선스 |
|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------|----------|
| [moemorizer](https://github.com/psmon/memorizer-v1)                     | 셀프구축가능 자체제작 메모라이저 활용                                                                   | Apache 2.0 |
| [bkit-claude-code](https://github.com/popup-studio-ai/bkit-claude-code) | Context Engineering 3계층 아키텍처, PDCA 방법론, Hook 시스템, Agent/Skill 구조                       | Apache 2.0 |
| [revfactory](https://github.com/revfactory) 하네스 설계                      | 도메인 분석 기반 6-Phase 워크플로우, Agent Team & Skill Architect, 오케스트레이터 패턴, Two Execution Modes | - |



> 향후 학습하는 하네스 오픈소스가 추가되면 이 테이블을 갱신합니다.

## 아키텍처 (3계층)

bkit-claude-code의 Context Engineering 3계층을 이 프로젝트에 맞게 재해석했습니다.

```
User Prompt
    ├── Layer 1: knowledge/   메모리 MCP 기반 동적 지식
    ├── Layer 2: agents/      경량 에이전트 (메모리 기반 동적 구성)
    └── Layer 3: engine/      여정(Journey) 기반 상태 추적
```

| 계층 | 원본 (bkit) | 재해석 (harness) |
|------|-------------|------------------|
| Domain Knowledge | 36 정적 Skills | 메모리 MCP 동적 검색 |
| Behavioral Rules | 31 Agents | 최소 에이전트, 점진 성장 |
| State Management | PDCA (20 transitions) | Journey (4 states, 선형) |

## 프로젝트 구조

```
harness-claude-code/
├── agents/          # Layer 2: 경량 에이전트
├── knowledge/       # Layer 1: 메모리 MCP 기반 동적 지식
├── engine/          # Layer 3: 여정 상태 관리
├── hooks/           # 이벤트 훅
├── scripts/         # 훅 실행 스크립트
├── templates/       # 문서/출력 템플릿
├── servers/         # MCP 서버 연동 설정
├── design/          # 시각적 설계 자산 (blueprint.pen, architecture.md)
├── docs/            # 버전 히스토리 & 여정 기록
├── prompt/          # 프롬프트 아카이브
├── README.md
└── harness.config.json
```

## MCP 의존성

| MCP | 역할 |
|-----|------|
| **memorizer** | 지식 저장, 검색, 그래프 탐색 |
| **pencil** | 블루프린트 시각화 (.pen 파일) |

## 개발 방식

이 프로젝트는 **프롬프트 주도 개발(Prompt-Driven Development)** 을 따릅니다.

1. 프롬프트로 요구사항을 정의 (`prompt/`)
2. 플랜 모드로 설계를 수립
3. 메모리 MCP에서 관련 지식을 검색하여 구현
4. Pencil MCP로 블루프린트를 갱신 (`design/blueprint.pen`)
5. 버전 히스토리에 여정을 기록 (`docs/`)

## 버전 히스토리

| 버전 | 날짜 | 설명 |
|------|------|------|
| v0.0.1 | 2026-03-22 | 초기 디렉토리 구조 설계 |
| v0.0.2 | 2026-03-22 | revfactory 하네스 학습 & 레이아웃 보강 |

## 라이선스 & 고지

- 이 프로젝트 자체는 학습 및 개인 활용 목적입니다.
- 참고한 오픈소스의 코드를 직접 포함하지 않으며, 구조와 개념을 학습하여 독자적으로 재구성합니다.
- 각 참고 프로젝트의 원본 라이선스와 저작자를 위 출처 테이블에 명시합니다.
- Fork후 자신만의 하네스 학습용으로 디벨롭 가능합니다. 