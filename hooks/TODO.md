# hooks/ - 이벤트 훅

## 역할
Claude Code 라이프사이클 이벤트에 반응하는 훅을 정의합니다.

## 개발 예정
- [ ] hooks.json 기본 구조 정의
- [ ] SessionStart 훅: 현재 여정 상태 표시
- [ ] Stop 훅: 여정 기록 자동 저장
- [ ] PreToolUse/PostToolUse 훅: 메모리 MCP 호출 로깅

## 참고
- bkit 6-Layer Hook System 참고 (특히 Layer 1, 5)
- v0.0.1에서는 Layer 1 (hooks.json) 수준만 구현
