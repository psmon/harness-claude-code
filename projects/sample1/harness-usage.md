# Harness Usage Report - sample1

## 프로젝트 정보
- **이름**: Portfolio Intro Page
- **위치**: projects/sample1/
- **생성일**: 2026-03-23
- **PRD 출처**: memorizer MCP (c8f7f8e4-76b7-4f7d-bf3d-952a07391b7a)

---

## 하네스 3계층 활용 현황

### Layer 1: knowledge/ (Gather Context)
| 활용 요소 | 설명 |
|-----------|------|
| memorizer MCP `get` | PRD 메모리 조회 (c8f7f8e4) — 프로젝트 요구사항 확인 |
| memorizer MCP `search` | React, landing page 관련 지식 검색 |
| WebSearch | 모던 React 랜딩 페이지 레퍼런스 검색 |
| Pencil `get_guidelines` | landing-page 디자인 가이드라인 수집 |
| Pencil `get_style_guide_tags` | 사용 가능한 스타일 태그 탐색 |
| Pencil `get_style_guide` | modern, minimal, elegant, dark-mode 스타일 가이드 적용 |

**관찰**: knowledge/ 레이어의 agentic-loop.md 패턴(Gather Context → Take Action → Verify Results)이 자연스럽게 적용됨. memorizer에서 PRD를 가져오는 것이 프로젝트 시작의 핵심 트리거가 됨.

### Layer 2: agents/ (Take Action)
| 에이전트 역할 | 실제 수행 내용 |
|--------------|---------------|
| architect | 디자인 리드 (Pencil MCP로 UI 설계), 구현 리드 (React 코드 작성) |
| memory-curator | PRD 메모리 조회, 레퍼런스 검색 (병렬 수행) |
| journey-recorder | 이 harness-usage.md 작성, 프로젝트 여정 기록 |

**관찰**: architect 에이전트가 planning(디자인)과 building(코드) 두 상태 모두에서 주도적으로 활동함. Senior Agent Mode(tight context sharing)가 적합했음.

### Layer 3: engine/ (State Management)
| Journey 상태 | 수행 단계 | Agentic Loop |
|-------------|----------|--------------|
| prompted | PRD 메모리 확인 | Gather Context |
| planning | Pencil 디자인 + 레퍼런스 검색 | Gather Context |
| building | React 프로젝트 코드 생성 | Take Action |
| recording | harness-usage.md 작성 | Verify Results |

**오케스트레이션 패턴**:
- Phase A+B: Parallel (디자인 + 검색 병렬 수행)
- Phase C→D: Chain (architect → journey-recorder 순차)

---

## MCP 도구 사용 내역

### memorizer MCP
- `get`: PRD 메모리 1회 조회

### pencil MCP
- `open_document`: 새 .pen 파일 생성
- `get_guidelines`: landing-page 가이드라인 1회
- `get_style_guide_tags`: 태그 목록 1회
- `get_style_guide`: 스타일 가이드 1회
- `batch_design`: 6회 호출 (페이지 프레임 → 헤더 → 히어로 텍스트 → 히어로 이미지 → 피처섹션 → 푸터)
- `get_screenshot`: 디자인 검증 1회
- `get_editor_state`: 에디터 상태 확인 2회

---

## 하네스 개선 관찰사항

### 잘 작동한 점
1. **memorizer PRD → 프로젝트 생성 흐름**: PRD를 메모리에 저장하고 조회하는 패턴이 효과적
2. **Pencil 디자인 → 코드 변환**: 디자인의 색상/타이포/레이아웃을 코드에 반영하는 과정이 자연스러움
3. **3계층 역할 분리**: knowledge(수집) → agents(실행) → engine(상태관리) 흐름이 명확
4. **Agentic Loop 적용**: 각 Phase가 자연스럽게 Gather→Action→Verify에 매핑됨

### 개선이 필요한 점
1. **프로젝트 생성 워크플로우 부재**: engine/에 "프로젝트 생성" 관련 워크플로우가 없음
2. **templates/ 활용 미비**: 프로젝트 스캐폴딩 템플릿이 없어 매번 처음부터 작성
3. **디자인 → 코드 자동화 갭**: Pencil 디자인에서 코드로의 변환이 수동적
4. **PRD 형식 미표준화**: memorizer에 저장되는 PRD 형식에 대한 가이드 없음
5. **projects/ 디렉토리 미인식**: harness.config.json에 projects/ 관련 설정 없음

### v0.0.4 개선 제안
- engine/에 `project-creation-workflow.md` 추가
- templates/에 프로젝트 스캐폴딩 템플릿 추가
- harness.config.json에 projects 경로 등록
- knowledge/에 `project-creation.md` 스킬 추가 (PRD → 디자인 → 코드 파이프라인)
