# PingPong Actor Visualizer - ASP.NET Core + Akka.NET

Akka.NET 기반 Ping-Pong 액터 예제 + 이벤트 시퀀스 다이어그램 시각화

## 기술 스택

- .NET 10 + ASP.NET Core
- Akka.NET 1.5.62 + Akka.Hosting (DI 통합)
- Vanilla JS + CSS (시각화 프론트엔드)

## 아키텍처

```
Browser (index.html)
   │  fetch /api/pingpong/N
   ▼
ASP.NET Core ──► EventCollectorActor (이벤트 수집)
   │
   ├──► PingActor ◄──► PongActor
   │       │  Ping(1) →    │
   │       │  ← Pong(1)    │
   │       │  Ping(2) →    │
   │       │  ← Pong(2)    │
   │       │  ...           │
   │
   ▼
JSON Response (events[]) → 시퀀스 다이어그램 렌더링
```

### 액터 구성

| 액터 | 역할 |
|------|------|
| **PingActor** | 게임 오케스트레이터. PongActor 생성, 라운드 관리, 결과 반환 |
| **PongActor** | Ping 수신 → Pong 즉시 응답 |
| **EventCollectorActor** | 모든 액터 이벤트를 수집하여 시각화 데이터 생성 |

## API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/health` | 헬스체크 |
| GET | `/api/pingpong/{rounds}` | 핑퐁 실행 + 이벤트 수집 결과 반환 |
| GET | `/` | 시각화 페이지 (시퀀스 다이어그램) |

## 실행

```bash
dotnet run
# 브라우저에서 http://localhost:5200 접속
# 또는 API 직접 호출
curl http://localhost:5200/api/pingpong/5
```

## 시각화

- **Terminal Minimal** 다크 테마 (Pencil MCP 스타일 가이드 기반)
- JetBrains Mono + IBM Plex Mono 듀얼 모노스페이스 폰트
- 터미널 구문 UI: `>` 프롬프트, `$` 명령 접두사, `//` 주석, `[brackets]`, snake_case
- 0px border-radius, #10B981 그린 액센트
- API → PingActor → PongActor 간 메시지 교환을 화살표로 표시
- 라운드 마커, 메시지 라벨, 방향별 컬러 (blue/green/rose)
- 상태 도트 시스템 (online → executing → completed)
- 모바일 반응형 지원 (375px까지)
