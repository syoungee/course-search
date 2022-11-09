<div align="center">
  
##  course search website

course search web-site in elice academy

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> 
  <img src="https://img.shields.io/badge/typescript-3178c6?style=flat&logo=typescript&logoColor=white"/>
  <br/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Javscript-F7DF1E?style=flat&logo=Javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/SASS-CC6699?style=flat&logo=SASS&logoColor=white"/>
</p>
</div>

## ⏳ 개발 기간

2022/11/02 ~ 2022/11/04 기능 구현
<br/>
2022/11/08 ~ 2022/11/09 refactor & ts
<br/>

## 📷 프로젝트 시연

<video width="80%" src="https://user-images.githubusercontent.com/22606199/199967641-1c07a151-6f26-4d22-87c5-a5440ff389ba.mp4"></video>

## 구현 기능

```
전체적인 UI 구현 - html markup 후 컴포넌트 분리

1) Layout
2) Search Area
3) Filter
4) Body
5) Couse Card
6) Pagination

```

## ✍🏻 프로젝트 설명

```
Frontend Team PA for Beginner
```

## 🌲 repo tree

```
src
 ┣ api
 ┃ ┗ apis.js
 ┣ common
 ┃ ┣ calendar.svg
 ┃ ┣ chart.svg
 ┃ ┣ laptop.svg
 ┃ ┗ search.svg
 ┣ components
 ┃ ┣ lagacy
 ┃ ┃ ┣ Category.js
 ┃ ┃ ┣ CourseBoard.js
 ┃ ┃ ┣ Pagination.js
 ┃ ┃ ┗ SearchBar.js
 ┃ ┣ Category.tsx
 ┃ ┣ CourseBoard.tsx
 ┃ ┣ Pagination.tsx
 ┃ ┗ SearchBar.tsx
 ┣ types
 ┃ ┗ index.ts
 ┣ App.scss
 ┣ App.test.js
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┗ shims.d.ts
```

## 실행 방법

```
npm install && npm start
```

## 추가적으로 필요한 구현사항

```
+) styled component로 변경
+) 프록시 서버 구현
```

## 회고

```
전체적인 UI를 markup하고 필요한 데이터들을 useState를 활용해 정리했다.
이후에 컴포넌트를 나누어서 분리했고 input text, 검색 필터, 페이지네이션 등의 값이 변경될 때 다시 렌더링되게 설계했다.
페이지네이션 부분의 경우 현재 페이지 index를 기준으로 -4, +4까지 보여주는데 1~20까지 숫자에 해당 시에 보여준다.
끝에 도달하면 '>' '<' 컬러가 변하는 것도 구현되어 있다.
여러 번의 테스팅을 통해 JSON값을 변경하여 param을 전달했음에도 불구하고 response가 계속 똑같았다.
JSON 형식의 데이터를 param으로 다뤄본 적이 없어서 시간이 조금 걸렸다. (JSON.Stringify(), JSON.parse()를 구현했는데도 정상적인 결과를 가지고 오지 않고 있어서 들어가고 있는 데이터를 찾는 작업을 했다. 비교 후 다른 점들을 수정해나가면서 API data 형식을 맞추었다.)
title에 들어가는 문자 %가 필요하다는 것도 뒤늦게 알게 되었다.
CORS error는 우선 브라우저 익스텐션을 통해 막아두었지만 proxy server 구현이 필요하다.
```
