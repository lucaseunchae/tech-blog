---
templateKey: post
title: 커밋 단계에 lint, 타입 체크 자동화 하기(Husky, lint-staged)
description: 사이드 프로젝트 진행 중 문제점을 겪고 lint, 타입 체크를 자동화한 과정에 대해 공유하는 글 입니다.
tags:
  - Husky
  - lint-staged
date: 2024-10-09T12:59:30.886Z
updated: 2024-10-09T12:59:30.897Z
featuredimage: https://res.cloudinary.com/dyfdioouh/image/upload/f_auto,q_auto/c_auto,h_250,w_250/v1728478928/%EA%B7%B8%EB%A6%BC2_xatx1u.png
---
사이드 프로젝트 진행 중 문제점을 겪고 lint, 타입 체크를 자동화한 과정에 대해 공유하려고 합니다.

<br/>

## 타입 오류가 존재하는 상태로 push를 해버리다

![](https://res.cloudinary.com/dyfdioouh/image/upload/f_auto,q_auto/v1728478916/%EA%B7%B8%EB%A6%BC1_j8mpod.png)

PR을 올리거나 master 브랜치에 push 되는 CI 과정에 타입 체크와 lint가 존재했습니다. 개인 프로젝트라 master 브랜치 직접 push를 막아두지 않았고, 급하게 코드를 수정할 일이 있어 PR을 merge 하는 게 아닌 master 브랜치에 직접 push를 진행했습니다.

![](https://res.cloudinary.com/dyfdioouh/image/upload/f_auto,q_auto/v1728478928/%EA%B7%B8%EB%A6%BC2_xatx1u.png)

이때 타입 오류가 발생했고 추가 commit을 push 하는 번거로운 작업을 하는 문제점이 발생했습니다. 작업 브랜치에서 PR을 올릴 때에도 뒤늦게 타입 오류나 lint 오류를 발견하고 추가 commit 하는 일이 잦았습니다.

<br/>

## 자동화에 대한 고민, Husky와 lint-staged 도입

매번 push를 하기 전에 lint와 타입 체크를 하는 번거로움을 해결하기 위해 찾아보던 도중 Husky의 pre-commit 기능을 발견하게 되었습니다.

```bash
# .husky/pre-commit

pnpm type-check
pnpm lint-staged
```

husky 설정을 통해 commit 이전에 타입 체크와 staged된 파일만 lint 하도록 하고,

```json
// package.json
{
  ...
  
  "lint-staged": {
    "*.{ts,tsx}": "eslint --report-unused-disable-directives --max-warnings 0"
  },
  
  ...
}
```

lint-staged 설정에 ESLint 관련 커맨드를 간단하게 적용해 주었습니다.

<br/>

## 결과

매번 commit 혹은 push 과정에서 타입 체크와 lint 과정을 하는 번거로움이 줄어들었고, 혹시 모를 실수를 대비할 수 있어 더욱 안정성 높은 프로젝트를 구축할 수 있게 되었습니다.

<br/>

## 참고 자료

* [Husky 공식 문서](https://typicode.github.io/husky/)
* [lint-staged Github](https://github.com/lint-staged/lint-staged)