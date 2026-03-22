# Board - Simple Bulletin Board

React 기반 간단한 웹게시판 (서버 불필요, localStorage 저장)

## 기술 스택

- React 18 (CDN via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (브라우저 JSX 변환)
- Google Fonts (Outfit + Inter)

## 기능

- 게시글 목록 (번호, 제목, 작성자, 날짜, 조회수)
- 게시글 작성 (제목, 작성자, 내용)
- 게시글 조회 (조회수 자동 증가)
- 게시글 삭제
- localStorage 기반 데이터 영속화

## 실행 방법

```
# CORS 이슈 방지를 위해 로컬 서버 사용
npx serve .
```

## 디자인

Monochrome Type 스타일 가이드 적용:
- 색상: Black (#000000) + White (#FFFFFF) + Zinc (#F4F4F5)
- 타이포: Outfit (Display, 900~300 weight contrast) + Inter (Body)
- 모바일 반응형 완전 대응
