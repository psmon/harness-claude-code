# 버전 넘버링 규칙

## 시맨틱 버전 (Semantic Versioning)

`MAJOR.MINOR.PATCH` 형식을 따릅니다.

| 레벨 | 변경 범위 | 예시 |
|------|-----------|------|
| **Patch** (0.0.x) | 하위 요소 추가, 문서 보강, 버그 수정 | 새 에이전트 1개 추가, TODO 갱신 |
| **Minor** (0.x.0) | 새 계층 기능, 워크플로우 추가, 주요 컴포넌트 | 오케스트레이터 구현, 도메인 분석 파이프라인 |
| **Major** (x.0.0) | 아키텍처 변경, 계층 구조 개편 | 3계층 → 4계층 전환, 엔진 재설계 |

## 갱신 대상 (4종 필수)

버전을 올릴 때마다 반드시 다음 4곳을 갱신합니다:

### 1. docs/vX.Y.Z.md
- 새 버전 히스토리 문서 생성
- 파일명: `docs/v{MAJOR}.{MINOR}.{PATCH}.md`
- 내용: templates/version-history.md 템플릿 참조

### 2. README.md
버전 히스토리 테이블에 행 추가:
```markdown
| vX.Y.Z | YYYY-MM-DD | 설명 |
```

필요 시 아키텍처 섹션, 프로젝트 구조, 참고 출처 테이블도 갱신.

### 3. harness.config.json
`version` 필드를 새 버전으로 갱신:
```json
{
  "version": "X.Y.Z"
}
```

### 4. design/blueprint.pen
Pencil MCP를 통해 블루프린트에 새 요소 반영:
1. `mcp__pencil__open_document` → blueprint.pen 열기
2. `mcp__pencil__snapshot_layout` → 현재 레이아웃 확인
3. `mcp__pencil__batch_design` → 변경사항 반영

### 5. design/architecture.md
mermaid 다이어그램에 변경사항 반영. 해당하는 다이어그램만 수정.

## 버전 히스토리 패턴

기존 패턴 (v0.0.1, v0.0.2에서 확립):

```
# vX.Y.Z - [한글 제목]

**날짜**: YYYY-MM-DD
**프롬프트**: `prompt/NN-[설명].md`

## 이 버전에서 한 일
- [변경 사항 목록]

## 핵심 설계 결정 (해당 시)
1. [결정 사항과 근거]

## 여정 기록
### 작업 과정
1. [단계별 기록]

### harness에 반영한 점
- [반영 내용]

## 다음 버전 예정
- [ ] [예정 항목]
```
