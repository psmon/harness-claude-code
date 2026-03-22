# 프로젝트 산출물 표준 구조

## 디렉토리 레이아웃

```
projects/[프로젝트명]/
├── index.html          # 엔트리 포인트 (HTML)
├── app.js              # 애플리케이션 코드
├── styles.css          # 커스텀 스타일 (선택)
├── README.md           # 프로젝트 설명, 실행 방법, 기술 스택
├── harness-usage.md    # 하네스 활용 보고서 (3계층 + MCP + 평가)
└── tc/                 # 검증 체크리스트 디렉토리
    └── checklist-vX.Y.Z.md  # 버전별 상세 검증 결과
```

## 디자인 파일 위치

프로젝트별 디자인 파일은 하네스 `design/` 디렉토리에 저장:
```
design/[프로젝트명].pen    # Pencil MCP 디자인 파일
```

## 필수 파일

| 파일 | 필수 | 설명 |
|------|------|------|
| index.html | O | 브라우저에서 직접 열 수 있는 엔트리 |
| app.js | O | 애플리케이션 로직 |
| README.md | O | 프로젝트 설명 + 실행 방법 |
| harness-usage.md | O | 하네스 활용 보고서 |
| tc/checklist-*.md | O | 검증 체크리스트 (생성/수정 시마다) |
| styles.css | - | Tailwind 외 추가 스타일 필요 시 |

## 기술 스택 기본값 (CDN 방식)

```html
<!-- React 18 -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Babel Standalone (브라우저 JSX 변환) -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
```

> 서버 불필요 — `index.html` 직접 열기 또는 `npx serve .`
