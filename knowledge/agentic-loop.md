# Agentic Loop - 하네스의 핵심 실행 모델

## 출처
- memorizer: `aa36789f-2207-4238-afc9-a8260c821ce2` (악분 - Claude Code 동작 원리 Part 1)

## 개요

Agentic Loop은 AI Agent가 작업을 수행하는 반복 실행 패턴이다.
사용자 요청 → 맥락 수집 → 행동 → 검증 → (반복 또는 완료)

```
Gather Context → Take Action → Verify Results → (반복)
```

## 3단계 상세

| 단계 | 설명 | harness 대응 |
|------|------|-------------|
| **Gather Context** | 파일 읽기, 코드 검색, 프로젝트 구조 파악 | knowledge/ 메모리 MCP 검색 |
| **Take Action** | 코드 수정, 명령어 실행 | agents/ 에이전트 행동 |
| **Verify Results** | 테스트 실행, 결과 확인 | engine/ 검증 게이트 |

## 핵심 인사이트

- 사용자도 이 loop의 일부 — 언제든 중간에 개입하여 방향 전환 가능
- AI 모델은 스스로 행동하지 못함. Harness가 도구 실행, 권한 관리, 상태 유지를 담당
- Loop의 각 단계에서 적절한 도구(Tool)를 선택하는 것이 핵심

## 분류
- **Type**: Workflow
- **태그**: agentic-loop, execution-model, core-concept
