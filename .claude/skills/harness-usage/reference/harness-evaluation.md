# 하네스 평가 기준표

> 프로젝트 생성/수정 후 하네스가 얼마나 잘 활용되었는지 평가합니다.
> 이 평가는 하네스 자체의 성숙도를 추적하고 개선 방향을 도출하는 데 사용됩니다.

## 5개 평가 축 (총 100점)

### 1. knowledge/ 활용도 (20점)

| 점수 | 기준 |
|------|------|
| 20 | memorizer PRD 조회 + Pencil 가이드라인 + WebSearch 레퍼런스 모두 활용 |
| 15 | memorizer + Pencil 또는 memorizer + WebSearch 조합 활용 |
| 10 | memorizer PRD 조회만 수행 |
| 5 | 가이드라인/레퍼런스 참조만 수행 (memorizer 미사용) |
| 0 | knowledge/ 계층 미활용 |

**확인 포인트:**
- memorizer MCP (search, get) 호출 여부
- Pencil get_guidelines, get_style_guide 호출 여부
- WebSearch 레퍼런스 검색 여부
- knowledge/*.md 문서 참조 여부

### 2. agents/ 역할 분리 (20점)

| 점수 | 기준 |
|------|------|
| 20 | 3종 에이전트(architect, memory-curator, journey-recorder) 역할이 명확히 구분 |
| 15 | 2종 에이전트 역할 구분 |
| 10 | architect 역할만 식별 가능 |
| 5 | 에이전트 역할 구분 없이 단일 흐름 |
| 0 | agents/ 계층 인식 없음 |

**확인 포인트:**
- architect: 디자인 + 코드 생성 주도
- memory-curator: PRD 조회 + 레퍼런스 검색
- journey-recorder: harness-usage.md + tc/ 작성

### 3. engine/ 워크플로우 준수 (20점)

| 점수 | 기준 |
|------|------|
| 20 | Journey 4상태 전이 완전 준수 (prompted→planning→building→recording) |
| 15 | 3상태 이상 전이 식별 가능 |
| 10 | planning→building 전이만 식별 |
| 5 | 상태 전이 인식 있으나 불완전 |
| 0 | engine/ 워크플로우 미참조 |

**확인 포인트:**
- project-creation-workflow.md 참조 여부
- Phase A~E 순서 준수 여부
- 오케스트레이션 패턴 (Parallel, Chain) 적용 여부

### 4. Agentic Loop 적용 (20점)

| 점수 | 기준 |
|------|------|
| 20 | Gather→Action→Verify 3단계가 명확히 반복 적용됨 |
| 15 | 3단계 구조이나 반복(루프) 없음 |
| 10 | Gather + Action만 수행 (Verify 미흡) |
| 5 | 단일 단계에 집중 |
| 0 | Agentic Loop 패턴 미인식 |

**확인 포인트:**
- Gather Context: memorizer 검색, 파일 읽기, 디자인 가이드라인
- Take Action: 코드 생성, 파일 수정, 디자인 작업
- Verify Results: 스크린샷 검증, 체크리스트, 코드 리뷰

### 5. 개선 피드백 품질 (20점)

| 점수 | 기준 |
|------|------|
| 20 | 구체적 관찰 + 실행 가능한 제안 + harness-create 연계 방안 포함 |
| 15 | 구체적 관찰 + 실행 가능한 제안 |
| 10 | 일반적 관찰사항 기록 |
| 5 | "잘 되었다" 수준의 피상적 기록 |
| 0 | 개선 피드백 미작성 |

**확인 포인트:**
- harness-usage.md "개선 관찰사항" 섹션 존재
- "잘 작동한 점" + "개선이 필요한 점" 분리
- 하네스 다음 버전 제안 구체성
- harness-create 스킬 연계 가능성

---

## 총점 해석

| 점수 범위 | 등급 | 의미 | 권장 액션 |
|----------|------|------|----------|
| 80-100 | A | 하네스 활용 우수 | 패턴을 베스트 프랙티스로 기록, docs/에 사례 추가 |
| 60-79 | B | 양호 | 부족한 축 1~2개 개선 권장 |
| 40-59 | C | 미흡 | harness-create로 해당 계층 보강 필요 |
| 0-39 | D | 미활용 | 하네스 구조 재검토, knowledge/ 보강 우선 |

---

## 평가 결과 기록 양식

harness-usage.md 하단에 추가:

```markdown
## 하네스 평가 점수

| 평가 축 | 점수 | 비고 |
|---------|------|------|
| knowledge/ 활용도 | /20 | |
| agents/ 역할 분리 | /20 | |
| engine/ 워크플로우 | /20 | |
| Agentic Loop 적용 | /20 | |
| 개선 피드백 품질 | /20 | |
| **총점** | **/100** | **등급: _** |
```
