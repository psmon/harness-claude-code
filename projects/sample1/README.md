# Portfolio - Crafting Digital Experiences

React 기반 간단한 소개 페이지 (서버 불필요)

## 기술 스택

- React 18 (CDN via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (브라우저 JSX 변환)
- Google Fonts (Cormorant Garamond + Inter)

## 실행 방법

`index.html` 파일을 브라우저에서 직접 열기만 하면 됩니다.

```
# 방법 1: 파일 직접 열기
open index.html

# 방법 2: 간단한 로컬 서버 (CORS 이슈 시)
npx serve .
```

## 구조

```
sample1/
├── index.html    # HTML 엔트리 (CDN 링크 포함)
├── app.js        # React 컴포넌트 (JSX)
└── README.md
```

## 디자인

Pencil MCP로 사전 디자인한 다크 럭셔리 스타일 적용:
- 색상: Deep Charcoal (#1A1A1C) + Gold (#C9A962)
- 타이포: Cormorant Garamond (Display) + Inter (Body)
- 디자인 파일: `../../design/project1.pen`
