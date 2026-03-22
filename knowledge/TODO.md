# knowledge/ - 도메인 지식 (메모리 MCP 기반)

## 역할
메모리 MCP에 축적된 지식을 구조화된 스킬로 변환합니다.
bkit의 Skills 계층에 해당하지만, 정적 마크다운이 아닌
메모리 MCP 검색을 통한 동적 지식 로딩이 핵심 차별점입니다.

## 개발 예정
- [ ] 메모리 MCP 연동 패턴 정의 (search, get, get_many)
- [ ] 지식 카테고리 분류 체계 설계
- [ ] 스킬 정의 포맷 (SKILL.md frontmatter 표준)
- [ ] 메모리 -> 스킬 변환 파이프라인 설계
- [ ] 지식 그래프 시각화 (Pencil MCP 연동)

### v0.0.2 추가 — 도메인 분석 기반 (revfactory 참고)
- [ ] **도메인 분석 워크플로우** (Phase 1): 문제 영역을 먼저 분석하는 진입점 역할
- [ ] 도메인별 스킬 매핑 (Phase 4): 에이전트에 부여할 스킬을 도메인 분석 결과로부터 도출
- [ ] SharedMemory 패턴: 에이전트 간 지식 공유 구조

## 참고
- bkit skills/ 패턴 참고 (Workflow/Capability/Hybrid 분류)
- memorizer MCP의 search_graph, search_graph_by_cypher 활용 검토
- revfactory: 도메인 분석이 선행되는 6-Phase 구조, 스킬 설계(Phase 4)
