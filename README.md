# 💸 10WONMOA (10원모아)

<h2 align="center">

<img src="https://static.vecteezy.com/system/resources/previews/000/331/094/large_2x/vector-coins-icon.jpg" width="200"/>

    10원모아 : 나만의 가계부 서비스

</h2>

## 🏠 서비스 주소

> [10원모아 사이트](team-10jo-10wonmoa-fe.vercel.app)

## 프로젝트 소개

> 현재 많은 가계부 서비스들은 재테크에 관심이 없다면 애플리케이션에서 제공하는 기능을 이해하고 사용하기가 어렵다고 느꼈습니다. 10원모아 서비스는 가계부에 필요한 핵심 서비스를 최소한으로 제공함으로써 복잡한 가계부 서비스를 쉽게 사용할 수 있도록 기획하였습니다.

## 🛠 기술 스택

<div align="center">
<br/>
  <img src="https://img.shields.io/badge/React-v18-61dafb?logo=React"/>
  <img src="https://img.shields.io/badge/Typescript-v4-3178c6?logo=typescript"/>
  <img src="https://img.shields.io/badge/ReactQuery-v3-FF4154?logo=ReactQuery"/>
  <img src="https://img.shields.io/badge/axios-v0.27-671CDE"/>
  <img src="https://img.shields.io/badge/ReactRouterDom-v6-CA4245?logo=ReactRouter"/>
  <img src="https://img.shields.io/badge/msw-v0.44-671CDA?"/>
  <img src="https://img.shields.io/badge/Prettier-v2.7-F7B93E?logo=Prettier"/>
  <img src="https://img.shields.io/badge/Eslint-v2.7-4B32C3?logo=Eslint"/>
  <img src="https://img.shields.io/badge/GitHub Actions- -2088FF?logo=GitHub Actions"/>
  <br/>
</div>

## 🗂 폴더 구조

```
├── README.md
├── craco.config.js
├── package.json
├── src
│   ├── App.tsx
│   ├── api : 리액트 쿼리,axios
│   ├── assets : 이미지
│   ├── components : 공통 컴포넌트
│   ├── constants : 상수
│   ├── hooks : 커스텀 훅
│   ├── index.tsx
│   ├── mocks : msw 모킹 핸들러
│   ├── pages : 페이지 컴포넌트
│   ├── router : 라우터
│   ├── styles : css 관련
│   ├── types : type, interface
│   └── utils : 유틸 함수들
├── tsconfig.json
├── tsconfig.paths.json
└── yarn.lock
```

## 📖 DOCS

- [Moscow](https://backend-devcourse.notion.site/MoSCoW-f0c60e20dd014d02ac5410477fb73952)
- [회의록](https://www.notion.so/backend-devcourse/362964f521f94c81a78b13cc7e0c695c)
- [개발 일정](https://backend-devcourse.notion.site/9b6985903d314afcb28a7cac38b29377)

## 기능

## 📅 개발 일정 (7/22 ~ 8/16)

### Flow 1 (7/22 ~ 8/3)

- 로그인 페이지
- 회원가입 페이지
- 수입/지출 등록 페이지
- 가계부(일일) 페이지
- 예산 페이지

### Flow 2 (8/4 ~ 8/9 )

- 공통 컴포넌트(상단바, 하단 Nav바, 뒤로가기 버튼)
- 로딩 컴포넌트(스피너) 구현
- 통계 페이지(통계 + 예산)
- 가계부(월별)
- 검색 페이지
- API 에러메시지 UI 처리

### Flow 3 (8/10 ~ 8/15)

- env(Oauth 클라이언트 ID)
- refreshToken 처리
- 기타 UI

## 기능

| 가계부 검색                                                                                                                                         | 로그인                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/50866506/184688146-663b9e26-4aa6-4d82-a4fd-a93cf259d718.gif" height=300/></p> | <p align="center"><img src="https://user-images.githubusercontent.com/50866506/184686469-b7e97e46-a943-4972-8341-bd125afcfc6f.gif" height=300/></p> |
| <li>카테고리별, 기간별 검색 가능</li> <li>금액 최소, 최대에 따른 검색</li>                                                                          | <li>이메일 로그인</li> <li>구글 로그인</li>                                                                                                         |

| 가계부 등록                                                                                                                                         | 가계부 조회                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/50866506/184686599-c31c1183-397c-4bee-873a-3c7bca671bc1.gif" height=300/></p> | <img src="https://user-images.githubusercontent.com/50866506/184686827-a95e3f9e-b162-4049-85d2-24ed6b22bce7.gif" height=300/> |
| <li>수입, 지출 등록</li> <li>카테고리별 등록</li>                                                                                                   | <li>월별, 년별 조회</li> <li>무한 스크롤 구현</li>                                                                            |

| 예산 페이지                                                                                                                                         | 통계 페이지                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://user-images.githubusercontent.com/50866506/184687744-503eb349-8a29-4339-8d1f-1e23f7059d04.gif" height=300/></p> | <p align="center"><img src="https://user-images.githubusercontent.com/50866506/184687106-5b5fe708-cab6-4931-8298-0c79df5635d2.gif" height=300/></p> |
| <li>예산 등록, 조회</li><li>애니메이션으로 로딩 깜빡임 문제해결 </li> <li>debounce로 예산등록</li>                                                  | <li>d3.js를 사용해 차트 구현</li><li>드롭다운 월별, 년별 조회</li>                                                                                  |

## CI/CD

<img width="842" alt="스크린샷 2022-08-15 오후 6 03 53" src="https://user-images.githubusercontent.com/50866506/184607625-4f0ee63d-1080-4626-862e-29b71eeb439d.png">

## 🎨와이어 프레임

<img width="840" alt="스크린샷 2022-08-15 오후 11 00 32" src="https://user-images.githubusercontent.com/50866506/184649782-d6d8748e-d90c-4ae7-8981-4cb1181bbc92.png">

[피그마 구경하러 가기](https://www.figma.com/file/IBDPDMU1UD5gUtXOEm1YCe/10%EC%9B%90%EB%AA%A8%EC%95%8410%EC%A1%B0-%EA%B0%80%EA%B3%84%EB%B6%80---WireFrame?node-id=50%3A1962)

## 👨‍👨‍👧‍👧 팀원

|  Name  |                                     Profile                                      |                   GitHub                   |                Role                |
| :----: | :------------------------------------------------------------------------------: | :----------------------------------------: | :--------------------------------: |
| 조승희 | <img src="https://avatars.githubusercontent.com/u/50866506?v=4" width = "200px"> |   [💸 click](https://github.com/sa02045)   | CI/CD, 예산페이지, msw, 에러핸들링 |
| 신다혜 | <img src="https://avatars.githubusercontent.com/u/64780560?v=4" width = "200px"> |  [💸 click](https://github.com/dahye1013)  |             Developer              |
| 정현진 | <img src="https://avatars.githubusercontent.com/u/95457808?v=4" width = "200px"> | [💸 click](https://github.com/hyunjin0910) |             Developer              |
| 임재현 | <img src="https://avatars.githubusercontent.com/u/24430239?v=4" width = "200px"> | [💸 click](https://github.com/violet9503)  |             Developer              |
