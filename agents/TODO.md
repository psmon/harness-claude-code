# agents/ - 행동 규칙 에이전트

## 역할
메모리 MCP 지식을 기반으로 동작하는 경량 에이전트를 정의합니다.
bkit의 31개 에이전트와 달리, 메모리에서 동적으로 컨텍스트를 로드하는
최소한의 에이전트만 유지합니다.

## 개발 예정
- [ ] architect agent: 설계 검토 및 블루프린트 갱신 담당
- [ ] journey-recorder agent: 개발 여정 자동 기록 담당
- [ ] memory-curator agent: 메모리 MCP 지식 정리/연결 담당
- [ ] 에이전트 frontmatter 표준 포맷 정의

## 참고
- bkit agents/ 패턴 참고 (모델별 분류: opus/sonnet/haiku)
- 메모리 MCP 검색 결과를 에이전트 컨텍스트로 주입하는 방식 설계 필요
