# **프로젝트 설명**

트러블 슈팅, 기술에 대한 고민, 동작 원리들에 대한 글을 모아둔 기술 블로그입니다. 백엔드 서버 없이 Netlify 호스팅을 통해 웹 에디터 내에서 게시글을 작성할 수 있습니다. [(블로그 링크)](https://lucaseunchae.site/)

![image](https://github.com/user-attachments/assets/4a3d6980-31d2-4472-bb62-26c32681d1f3)

<p align="center">"/admin" URL 내부 웹 에디터에서 게시글을 작성하는 이미지</p>

# **프로젝트 구조**

- **Gatsby**는 마크다운 파일을 통해 정적 컨텐츠를 제공합니다.
- **DecapCMS**를 통해 “/admin”에서 웹 에디터(WYSIWIG)로 게시글을 작성할 수 있습니다.
- “/admin” 접근 시 **Netlify Identify**를 통해 인증 절차가 진행됩니다.
- “/admin”의 웹 에디터에서 게시글을 작성하면 **Netlify의 Git Gateway**를 통해 Github Repo에 마크다운 파일이 Push 됩니다.

![Group 51](https://github.com/user-attachments/assets/08bfd430-15f7-4888-bcec-c8889173d535)

# **프로젝트 기획 동기**

- Jeykll(with Ruby)로 개발된 이전 기술 블로그는 핫 리로딩이 너무 느렸습니다(체감 5초).
- HTML/CSS/JS가 아닌 React를 이용해 유지 보수, 코드 재사용에 용이한 기술 블로그를 만들고 싶었습니다.
- 로컬 환경에서 마크다운을 작성 > Commit > Push하는 과정이 번거로웠습니다.

# **프로젝트가 해결하는 문제**

- 핫 리로딩이 빠릅니다(체감 1초 내)
- React를 이용해 모던한 기술 블로그를 구현할 수 있습니다.
- HeadlessCMS이지만 백엔드 서버를 호스팅하지 않아도 됩니다(Netlify 대체).
- Nelify + DecapCMS + Gatsby를 통해 Push 하는 과정 없이 게시글을 작성할 수 있습니다.

# **프로젝트를 통해 배운 점**

- 국내에 자료가 많지 않았지만 여러 문서들을 읽고 디버깅해가며 원했던 서버 호스팅 없는 HeadlessCMS를 구축할 수 있었습니다.
- Gatsby를 통해 정적 컨텐츠를 제공할 때 GraphQL를 가볍게 경험할 수 있었습니다.
