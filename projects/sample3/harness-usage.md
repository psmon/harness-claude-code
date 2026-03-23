# 하네스 활용 보고서 — sample3

## 프로젝트 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | sample3 |
| 위치 | projects/sample3/ |
| 생성일 | 2026-03-23 |
| 최종 수정일 | 2026-03-23 |
| PRD 출처 | 사용자 직접 요청 |
| 기술 스택 | .NET 10, ASP.NET Core, Akka.NET 1.5.62, Akka.Hosting, Vanilla JS |

## 수정 이력

| 날짜 | 내용 |
|------|------|
| 2026-03-23 | 초기 생성: ASP.NET Core + Akka.NET 핑퐁 예제 |
| 2026-03-23 | .NET .gitignore 추가 |
| 2026-03-23 | 액터 이벤트 시각화: EventCollectorActor + 시퀀스 다이어그램 UI |
| 2026-03-23 | 버그 수정: `.Result` 데드락 → PipeTo 패턴, rounds 상한 100 추가 |
| 2026-03-23 | Playwright 브라우저 검증: Desktop PASS, Mobile PARTIAL (다이어그램 오버플로우) |

---

## Layer 1: knowledge/ 활용

| 도구/자원 | 활용 내역 |
|-----------|----------|
| dotnet-akka-net 스킬 | ReceiveActor, Akka.Hosting, Ask 패턴, **PipeTo 패턴** 참조 |
| SSE + PipeTo 패턴 | 스킬 섹션 10의 PipeTo 패턴을 데드락 수정에 직접 적용 |
| 코드 생성 규칙 | record 불변 메시지, Props.Create(() => new Actor(args)), Context.GetLogger() |

---

## Layer 2: agents/ 역할

| 역할 | 수행 내용 |
|------|----------|
| architect | 3액터 설계 (Ping/Pong/EventCollector), PipeTo 패턴으로 데드락 해소 |
| memory-curator | dotnet-akka-net 스킬에서 PipeTo 패턴 검색 및 적용 |
| journey-recorder | 체크리스트, 이 보고서, README 작성 |

---

## Layer 3: engine/ 활용

| 상태 전이 | 내용 |
|-----------|------|
| prompted | "액터이벤트에 반응해 시각화 작성" + "핑퐁이 무한대 아님 체크" |
| planning | EventCollectorActor 도입, JSON 응답 방식 선택 |
| building | EventCollectorActor 신규, PipeTo 패턴 적용, 시각화 HTML, 경계값 검증 |
| verifying | dotnet build PASS, API 3라운드 정상, 경계값 차단 확인 |
| verifying (Playwright) | Desktop/Mobile 스크린샷 캡처 + 시각 검증, 다이어그램 인터랙션 테스트 |
| recording | 체크리스트 + harness-usage.md + README 갱신 |

---

## MCP 도구 사용 내역

| MCP 도구 | 사용 여부 | 비고 |
|----------|----------|------|
| memorizer | 미사용 | 사용자 직접 요구사항 |
| pencil | 미사용 | 디자인 파일 없이 다크 테마 직접 구현 |

---

## 하네스 개선 관찰사항

### 잘 된 점
- dotnet-akka-net 스킬의 PipeTo 패턴이 데드락 버그 수정에 즉각 적용됨 — 스킬이 단순 코드 생성 뿐 아니라 디버깅/리팩토링에도 유용
- Verify Loop 패턴 실현: 첫 구현 → 사용자 피드백(무한대 체크) → 수정 → 재검증
- 경계값 검증(rounds 0, 101)으로 API 안정성 확보

### 잘 된 점 (Playwright 검증 추가)
- Playwright 1.58.2로 Desktop/Mobile 4종 스크린샷 캡처 성공 — 이전 권한 이슈 해결됨
- 버튼 클릭 인터랙션 테스트로 시퀀스 다이어그램 렌더링 검증 완료
- engine/playwright-verification.md 워크플로우를 ASP.NET Core 백엔드에 적용 — `npx serve` 대신 `dotnet run` 사용

### 개선 필요점
- 백엔드 프로젝트의 "잠재적 데드락" 같은 동시성 이슈는 정적 분석으로 발견 어려움 → 액터 모델용 린트/검증 도구 고려
- EventCollectorActor가 요청 종료 후에도 남아있을 수 있음 → 라이프사이클 관리 개선 가능
- **Mobile 반응형 이슈**: 시퀀스 다이어그램 `min-width: 500px` + colWidth 고정 계산으로 375px 뷰포트에서 오버플로우 → 모바일 전용 레이아웃 또는 스케일 축소 필요
- engine/playwright-verification.md가 `npx serve` 기반 정적 사이트만 가정 → ASP.NET Core 등 백엔드 서버 프로젝트용 가이드 추가 필요

---

## 하네스 평가 점수 (Playwright 검증 포함 갱신)

| 평가 축 | 점수 | 근거 |
|---------|------|------|
| knowledge/ 활용도 | 17/20 | PipeTo 패턴까지 스킬 심층 활용, memorizer 미사용 감점 |
| agents/ 역할 분리 | 17/20 | 3역할 모두 수행 + Playwright 검증으로 architect 역할 확장 |
| engine/ 워크플로우 준수 | 19/20 | 5단계 전이 + Playwright verifying 단계 추가, engine/playwright-verification.md 준수 |
| Agentic Loop 적용 | 19/20 | Gather→Action→Verify(Playwright)→Record 완전 순환, Mobile PARTIAL 발견 |
| 개선 피드백 품질 | 17/20 | 구체적 개선점 5건, Mobile 반응형 이슈 + 워크플로우 확장 제안 포함 |
| **총점** | **89/100** | **우수** — Playwright 검증으로 Mobile 렌더링 이슈 발견, Verify Loop 실증 |
