# 프로젝트 생성 스킬 (Project Creation)

> 카테고리: Workflow
> 출처: projects/sample1 생성 여정 (2026-03-23)

## 역할

memorizer MCP의 PRD 메모리를 기반으로 프로젝트를 생성하는 파이프라인 지식.
하네스 3계층을 실제 프로젝트 생성에 활용하는 방법을 정의한다.

## PRD → 프로젝트 생성 파이프라인

```
1. PRD 메모리 조회 (memorizer get)
   ↓
2. 디자인 (Pencil MCP)
   - get_guidelines → get_style_guide → batch_design → get_screenshot
   ↓
3. 레퍼런스 검색 (WebSearch + memorizer store)
   ↓
4. 프로젝트 코드 생성 (Write)
   - 디자인 파일의 색상/타이포/레이아웃을 코드에 반영
   ↓
5. 하네스 사용 기록 (harness-usage.md)
   ↓
6. 하네스 업그레이드 (harness-create 스킬)
```

## 3계층 활용 패턴

| 단계 | Layer | Agentic Loop | Agent |
|------|-------|-------------|-------|
| PRD 조회 | knowledge | Gather Context | memory-curator |
| 디자인 | knowledge | Gather Context | architect |
| 레퍼런스 검색 | knowledge | Gather Context | memory-curator |
| 코드 생성 | agents | Take Action | architect |
| 사용 기록 | engine | Verify Results | journey-recorder |
| 하네스 업그레이드 | engine | new cycle | architect + journey-recorder |

## 오케스트레이션

- **단계 1+2+3**: Parallel (디자인과 검색을 병렬 수행)
- **단계 4→5→6**: Chain (순차 실행)

## 프로젝트 산출물 구조

```
projects/[프로젝트명]/
├── index.html       # 엔트리 포인트
├── app.js           # 애플리케이션 코드
├── README.md        # 프로젝트 설명
└── harness-usage.md # 하네스 활용 기록
```

## MCP 도구 사용 매핑

| 파이프라인 단계 | MCP 도구 |
|----------------|---------|
| PRD 조회 | `memorizer.get` |
| 레퍼런스 검색 | `memorizer.search`, WebSearch |
| 디자인 | `pencil.get_guidelines`, `pencil.get_style_guide`, `pencil.batch_design`, `pencil.get_screenshot` |
| 지식 저장 | `memorizer.store` |
