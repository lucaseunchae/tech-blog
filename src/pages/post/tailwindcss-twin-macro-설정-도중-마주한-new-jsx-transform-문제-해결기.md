---
templateKey: post
title: TailwindCSS + twin.macro 설정 도중 마주한 New JSX Transform 문제 해결기
description: tailwind, emotion, twin.macro 패키지를 설치하고 설정하는 과정에서 React17에서 도입된 New
  JSX Transform 방식으로 인해 겪은 문제점과 이를 해결하고 적용한 방식을 공유하는 글 입니다.
tags:
  - react
  - jsx-transform
date: 2024-07-31T11:43:06.702Z
updated: 2024-07-31T11:43:06.713Z
featuredimage: https://res.cloudinary.com/dyfdioouh/image/upload/f_auto,q_auto/c_auto,h_250,w_250/v1722428795/Y19wYWQsYXJfMTox_xjzwkl.png
---
새 프로젝트를 초기 세팅하기 위해 여러 라이브러리와 함께 TailwindCSS(이하 tailwind), twin.macro 설정을 진행하고 있었습니다.

```tsx
import tw from 'twin.macro'

const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && tw`hover:border-black`]} />
)
```

위의 코드처럼 twin.macro를 통해 조건부 스타일 적용을 위해 emotion의 `css` 속성을 사용해야 했습니다. tailwind, emotion, twin.macro 패키지를 설치하고 설정하는 과정에서 React17에서 도입된 New JSX Transform 방식으로 인해 겪은 문제점과 이를 해결하고 적용한 방식을 공유하고자 합니다.

**개발 환경**

| 이름             | 버전      |
| -------------- | ------- |
| react          | 18.3.1  |
| typescript     | 5.2.2   |
| tailwindcss    | 3.4.7   |
| @emotion/react | 11.13.0 |
| twin.macro     | 3.4.1   |
| Node           | 20.15.1 |
| Vite           | 5.3.4   |

<br/>

## TailwindCSS 설정

[Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite) 공식문서를 따라서 tailwind와 관련 패키지를 설치하고 관련 설정을 구성했습니다.

<br/>

## twin.macro 공식문서 설치 과정에서 겪은 문제점

twin.macro의 [vite-emotion-typescript 설치 가이드](https://github.com/ben-rogerson/twin.examples/tree/master/vite-emotion-typescript)를 따라서 twin.macro와 관련 패키지를 설치 했습니다.

```bash
yarn add @emotion/react @emotion/styled
yarn add twin.macro @emotion/babel-plugin-jsx-pragmatic @babel/plugin-transform-react-jsx babel-plugin-macros tailwindcss --dev
```

@emotion/react 패키지와 여러 babel 플러그인을 설치하고 관련 설정을 구성했고, 설정을 확인하기 위해 개발 서버를 실행해서 확인 해보니 `ReferenceError: React is not defined` 에러가 발생했습니다.

![](https://res.cloudinary.com/dyfdioouh/image/upload/v1722426467/Untitled_k6imua.png)

에러 콘솔을 확인해본 결과, `App.tsx` 내부에서 에러가 발생했고  

```tsx
// @emotion/react 패키지 내부의 jsx.js

import * as React from 'react'

export const jsx /*: typeof React.createElement */ = function (
  ...
  return React.createElement.apply(null, createElementArgArray)
}
```

`jsx.js`  패키지 내부에서  `creatElement` 가 사용되는것을 확인하고, 현재 설정으로는 이전 방식의 JSX Transform 방식이 적용되는것을 파악 했습니다.

*React17 버전부터 도입된 New JSX Transform에 관한 내용은 [해당 공식 문서 글](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)에서 참고할 수 있습니다.*

```tsx
import React from 'react';
import tw from "twin.macro";
import "./App.css";

function App() {
  return <h1 css={[tw`text-4xl font-bold underline`]}>Hello world!</h1>;
}

export default App;
```

물론 위와 같이 `React` 를 import하면 twin.macro와 emotion의 `css` 속성도 잘 작동했지만, 최신 버전의 리액트에서 `React` 를 항상 import 해야하는 문제점이 남아있었습니다.

<br/>

## New JSX Transform 방식에 맞게 설정 변경

우선 기존 twin.macro의 [vite-emotion-typescript 설치 가이드](https://github.com/ben-rogerson/twin.examples/tree/master/vite-emotion-typescript)에서 설치했던 babel 플러그인에 대해 살펴보겠습니다. 

emotion에서 JSX를 트랜스파일할 때 `css` 속성을 사용할 수 있도록 `@emotion/babel-plugin-jsx-pragmatic`**,** `@babel/plugin-transform-react-jsx` 두 플러그인을 사용 했습니다. 하지만 이 방식은 `React.createElement` 를 사용하는 이전 JSX Transform 방식이기 때문에 vite.config.ts의 설정과 패키지를 제거했습니다.

[emotion 공식문서](https://emotion.sh/docs/css-prop)에서 `css` 속성을 사용하는 방법에 대해서 다루고 있는데

* Babel Preset
* JSX Pragma

jsx(tsx) 파일의 상단에  `/** @jsx jsx */` 같은 주석을 작성하는 JSX Pragma이 아닌 Babel Preset 방식을 적용했습니다.

```tsx
// .babelrc

{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic", "importSource": "@emotion/react" }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

`@emotion/babel-plugin` 패키지 설치와 설정 파일을 작성하고

```tsx
  // vite.config.ts
  
export default defineConfig({
  ...
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      ...
    }),
  ],
});
```

`jsxImportSource` 설정을 추가함으로써 jsx(tsx) 파일 내에서 `React`  import 없이 `css`  속성을 사용할 수 있게 되었습니다.

<br/>

## 회고

- 디버깅 과정에서 JSX Transform에 대해서 찾아보며 학습하는 경험이 되었고, 라이브러리의 내부 코드를 직접 확인하고 원인을 파악하는 과정에서 많은 학습이 되었습니다.
- 메이저한 라이브러리가 아니면 공식 문서 업데이트가 제때 반영되지 않을 수 있음을 알게 되었습니다.
- JSX Transform 방식에 차이에 따라 초기 설정이 달라질 수 있음을 알게 되었고, 추후 다른 라이브러리를 적용하며 다시 발생할 수 있는 문제이기에 좋은 해결 경험을 얻었습니다.
- 글에는 나와있지 않지만 `babel-plugin-macros` 를 통해 플러그인을 import해 명시적으로 사용하는 방식에 대해서도 알게 되었습니다.

<br/>

## 참고 자료

* [emotion 공식 문서 - css 속성](https://emotion.sh/docs/css-prop)
* [vite-emotion-typescript 설치 가이드](https://github.com/ben-rogerson/twin.examples/tree/master/vite-emotion-typescript)
* [New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)