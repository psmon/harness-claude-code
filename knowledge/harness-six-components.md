# 하네스 6대 구성요소

## 출처
- memorizer: `aa36789f-2207-4238-afc9-a8260c821ce2` (악분 - Claude Code 동작 원리 Part 1)

## 개요

Claude Code(Harness)는 AI 모델을 감싸서 실제로 일할 수 있게 만드는 시스템이다.
6가지 구성요소로 이루어져 있으며, 이 하네스 프로젝트의 디렉토리와 1:1 매핑된다.

## 6대 구성요소 → 하네스 매핑

| # | 구성요소 | 설명 | harness 디렉토리 | 구현 상태 |
|---|----------|------|------------------|-----------|
| 1 | **도구 (Tools)** | Bash, 파일 읽기/수정, 웹 검색, MCP | `servers/` | TODO |
| 2 | **권한/안전 (Permission)** | 도구별 권한 설정, 사용자 승인 게이트 | `hooks/` | TODO |
| 3 | **샌드박스 (Sandbox)** | 격리된 실행 환경 | `scripts/` | TODO |
| 4 | **세션 (Session)** | 사용자와의 연결 단위, 세션 저장/불러오기 | `engine/` | TODO |
| 5 | **Context (Memory 포함)** | 대화 맥락 유지, CLAUDE.md, Context Window | `knowledge/` | 진행중 |
| 6 | **확장 (Extensibility)** | MCP, Skills, Hooks | `.claude/skills/` | 진행중 |

## 핵심 관계식

```
AI Agent = AI 모델(추론) + Harness(실행 환경)
```

- AI 모델: 다음 토큰을 예측하여 텍스트 생성 (추론만 가능)
- Harness: 도구 실행, 권한 관리, 상태 유지, 컨텍스트 관리 (행동 가능하게 함)

## 분류
- **Type**: Capability
- **태그**: harness, components, architecture, core-concept
