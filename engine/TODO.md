# engine/ - 여정 엔진 (상태 관리)

## 역할
프롬프트 기반 개발 여정의 상태를 추적하고 관리합니다.
bkit의 PDCA State Machine 대신, Journey(여정) 기반 상태 모델을 사용합니다.

## 개발 예정
- [x] Journey 상태 모델 정의 (prompt -> plan -> build -> record) — v0.0.3 Agentic Loop 통합
- [x] Playwright 검증 워크플로우 (`playwright-verification.md`) — v0.0.5 추가
- [x] Journey에 `verifying` 상태 추가 (building → verifying → recording) — v0.0.5
- [ ] 버전 넘버링 자동화 (v0.0.x)
- [ ] 프롬프트-결과 매핑 추적
- [ ] 블루프린트 변경 이력 관리
- [ ] 여정 타임라인 생성기

### v0.0.3 추가 — Agentic Loop 통합 & 오케스트레이터 패턴
- [x] `agentic-loop-integration.md` — Journey ↔ Agentic Loop 매핑, 오케스트레이터 패턴 3종
- [x] 에이전트 실행 모드 선택 기준 정의 (팀 모드 vs 시니어 모드)

### v0.0.2 추가 — 워크플로우 & 오케스트레이션 (revfactory 참고)
- [ ] **워크플로우 엔진** (Phase 5): 에이전트 실행 흐름 정의 및 관리
- [ ] **오케스트레이터 패턴**: Chain · Verify · Parallel · Workflow 패턴 지원
- [ ] **검증 게이트** (Phase 6): 결과 검증 및 배포 판단
- [ ] Data Protocols 설계:
  - SendMessage (실시간 에이전트 간 통신)
  - TaskCreate/Update (작업 추적)
  - 파일 기록 (Workspace/Artifacts)

## 참고
- bkit lib/pdca/ 상태 머신 패턴 참고
- 단, PDCA의 복잡한 가드/트랜지션 대신 단순한 선형 여정 모델로 시작
- revfactory: 워크플로우(Phase 5), 검증 & 배포(Phase 6), Architecture Patterns
