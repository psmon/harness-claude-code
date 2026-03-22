# Agentic Loop ↔ Journey 상태 모델 통합

## 개요

기존 Journey 상태 모델(idle → prompted → planning → building → recording)에
Agentic Loop(Gather Context → Take Action → Verify Results)를 통합한다.

## 통합 모델

```
Journey 상태:  idle → prompted → planning → building → recording → idle
                                    ↕           ↕          ↕
Agentic Loop:              Gather Context → Take Action → Verify Results
                                    ↑                          ↓
                                    └──────── 반복 ────────────┘
```

### 매핑

| Journey 상태 | Agentic Loop 단계 | 주요 활동 | 담당 에이전트 |
|-------------|-------------------|-----------|-------------|
| prompted | — | 프롬프트 수신, 작업 시작 | — |
| planning | Gather Context | 메모리 검색, 구조 파악, 설계 수립 | architect, memory-curator |
| building | Take Action | 구현, 코드/문서 생성, 블루프린트 갱신 | architect |
| recording | Verify Results | 결과 검증, 여정 기록, 버전 발행 | journey-recorder |

## 오케스트레이터 패턴

### 기본 흐름: Chain
```
architect(planning) → architect(building) → journey-recorder(recording)
```

### 지식 보강 시: Parallel
```
architect(planning) ──┐
                      ├─→ architect(building) → journey-recorder(recording)
memory-curator(search)┘
```

### 검증 실패 시: Verify
```
architect(building) → journey-recorder(recording) → [검증 실패] → architect(planning)으로 복귀
```

## 에이전트 실행 모드 선택 기준

| 상황 | 권장 모드 | 이유 |
|------|-----------|------|
| 하네스 업그레이드 | 시니어 에이전트 모드 | architect가 전체 조율, 긴밀한 컨텍스트 공유 필요 |
| 새 오픈소스 학습 | 에이전트 팀 모드 | memory-curator가 독립적으로 지식 수집 가능 |
| 복잡한 다계층 변경 | 에이전트 팀 모드 | 병렬 작업으로 효율 극대화 |
| 단순 요소 추가 | 시니어 에이전트 모드 | 오버헤드 최소화 |
