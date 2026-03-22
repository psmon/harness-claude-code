# agents/ - 행동 규칙 에이전트

## 역할
메모리 MCP 지식을 기반으로 동작하는 경량 에이전트를 정의합니다.
bkit의 31개 에이전트와 달리, 메모리에서 동적으로 컨텍스트를 로드하는
최소한의 에이전트만 유지합니다.

## 개발 예정
- [x] architect agent: 설계 검토 및 블루프린트 갱신 담당 — v0.0.3 정의 완료
- [x] journey-recorder agent: 개발 여정 자동 기록 담당 — v0.0.3 정의 완료
- [x] memory-curator agent: 메모리 MCP 지식 정리/연결 담당 — v0.0.3 정의 완료
- [ ] 에이전트 frontmatter 표준 포맷 정의

### v0.0.3 추가 — 첫 에이전트 3종 정의
- [x] `architect.md` — 설계 검토, 블루프린트 갱신, Agentic Loop Gather Context 핵심
- [x] `journey-recorder.md` — 여정 기록, 버전 발행, Verify Results 담당
- [x] `memory-curator.md` — 메모리 정리/연결, 지식 기반 강화

### v0.0.2 추가 — Agent Team & Skill Architect (revfactory 참고)
- [ ] **팀 디자인 패턴** (Phase 2): 도메인 분석 결과에 따라 에이전트 팀 구성
- [ ] **에이전트 정의 스펙** (Phase 3): 개별 에이전트 역할/능력/스킬 명세
- [ ] **오케스트레이터**: 에이전트들을 조율하는 중앙 컨트롤러 개념 설계
- [ ] Two Execution Modes 선택 기준:
  - 에이전트 팀 모드 (SpawnManager + TaskCreate)
  - 시니어 에이전트 모드 (메인 Agent 중심 조율)

## 참고
- bkit agents/ 패턴 참고 (모델별 분류: opus/sonnet/haiku)
- 메모리 MCP 검색 결과를 에이전트 컨텍스트로 주입하는 방식 설계 필요
- revfactory: Agent Team 구성, 오케스트레이터, Two Execution Modes
