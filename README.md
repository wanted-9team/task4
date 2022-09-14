# 원티드 프리온보딩 6차 4차 과제

## 9팀 소개

| <img src="https://avatars.githubusercontent.com/u/92010078?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92101831?v=4"/> | <img src="https://avatars.githubusercontent.com/u/69101321?v=4"/> | <img src="https://avatars.githubusercontent.com/u/85508157?v=4"/> | <img src="https://avatars.githubusercontent.com/u/97271725?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/many-yun">[팀장] 김다윤</a>           | <a href="https://github.com/blcklamb">김채정</a>                  | <a href="https://github.com/jaehyeon74">박재현</a>                | <a href="https://github.com/sacultang">오영재</a>                 | <a href="https://github.com/jungdeokwoo">정덕우</a>              |

## 과제 설명

원티드 프리온보딩 프론트엔드 기업협업과제 - **깃허브 레파지토리 이슈 확인**

[👉 선발 과제 관련 링크](https://younuk.notion.site/27bf1cfefdce49f89d16bd14a9ff7f70)

- 수행 기간: 2022년 9월 13일 ~ 9월 15일

## 배포 URL

[👉 프로젝트 배포 링크](http://preonboarding-task4.s3-website.ap-northeast-2.amazonaws.com/)

## 실행 방법

```
$ git clone https://github.com/wanted-9team/task4
$ cd task4
$ npm install
$ npm start
```

## 라우팅

- `/`: homepage이자 issue 리스트 페이지
- `/:issue_number`: {issue_number}를 가진 이슈 상세 페이지

## 과제 달성 사항 및 해결 방법

- ### 필수 요구 사항

  - 이슈 목록 및 상세 화면 기능 구현

  - Context API를 활용한 API 연동

    [context/GithubContext.jsx](https://github.com/wanted-9team/task4/blob/master/src/context/GithubContext.jsx)

    요구사항에서 주어진 api 요청은 두 가지뿐이었기에, 최대한 간단하게 구성했습니다.
    각 요청에 대한 함수와 로딩에 관련된 상태를 context에 담아 활용했습니다.

    ```javascript
    export function IssueProvider({ children }) {
      const [loading, setLoading] = useState(false)
      const value = {
        organization: OWNER,
        repository: REPO,
        getIssueList,
        getIssueDetail,
        loading,
        setLoading,
      }

      return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
    }
    ```

  - 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

    [api/index.js](https://github.com/wanted-9team/task4/blob/master/src/api/index.js)

    issue 리스트를 가져오는 요청 때 params를 조정하여 정렬된 상태로 가져옵니다.

    ```javascript
    const getIssueList = async page => {
      const res = await Axios({
        url: '/issues',
        method: 'GET',
        params: {
          sort: 'comments',
          page,
        },
      })
      return res
    }
    ```

  - 데이터 요청 중 로딩 표시

    api를 실행하는 fetch 함수 내에서 loading 상태를 설정합니다.
    조건부렌더링으로 loading의 값에 따라 뿌리는 컴포넌트를 달리 합니다.

    [components/Loading.jsx](https://github.com/wanted-9team/task4/blob/master/src/components/Loading.jsx)

    [pages/home/Issue.jsx](https://github.com/wanted-9team/task4/blob/master/src/pages/home/Issue.jsx)

    ```javascript
    //...
    <LastElement ref={lastElRef}>
      {loading ? <Loading /> : <EmptyResult hasMore={hasMore} />}
    </LastElement>
    //...
    ```

  - UI는 데스크톱, 모바일에서 보았을 때 모두 읽기 편하게 구현

- ### Best Practice 도출 과정

  - Layout.jsx 컴포넌트의 필요성

    ```머지 후 보충해야 해요~~~~~~~
    [components/Layout.jsx]()

    필요한 이유: 웹페이지 전체를 감싸는 컨테이너 역할을 하는 태그를 만들어 중앙 정렬과 전체 너비를 지정할 수 있습니다.

    필요없는 이유: 해당 사항은 메인이 되는 컴포넌트 내의 스타일에서 관리할 수 있는데, 그 이유만으로 컴포넌트를 하나 더 생성하는 것은 불필요한 작업입니다.

    최종적으로 선택한 방향과 그 이유: Layout.jsx를 유지하기로 했고, 해당 컴포넌트 하나에서 전체 컨테이너에 대한 스타일을 지정할 수 있기때문에 유지보수 측면에서 더 합리적이라고 판단했습니다.

    ```

  - 이미지 url

    [pages/home/Issue.jsx](https://github.com/wanted-9team/task4/blob/master/src/pages/home/Issue.jsx)

    [논의 사항 참고](https://github.com/wanted-9team/task4/pull/1#discussion_r970520641)

    <이전 코드>

    ```javascript
    <AdImage
      src="https://younuk.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf0a0656-3146-4e9b-8739-7bca3d0d2cb4%2F%25E1%2584%2584%25E1%2585%25B5%25E1%2586%25BC%25E1%2584%2589%25E1%2585%25B3%25E1%2584%2591%25E1%2585%25B3%25E1%2586%25AF%25E1%2584%2585%25E1%2585%25A9%25E1%2584%258B%25E1%2585%25AE_%25E1%2584%2585%25E1%2585%25A9%25E1%2584%2580%25E1%2585%25A9_%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2587%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2592%25E1%2585%25A7%25E1%2586%25BC.png?table=block&id=23d7e96e-0dbc-4ba3-9e41-c0f22a5ba926&spaceId=72b256b1-ae08-4e70-bb6c-f9c3cad5a793&width=2000&userId=&cache=v2"
      alt="Ad Image"
    />
    ```

    개선 방향 1: 이미지 링크를 상수화 시킵니다.

    개선 방향 2: 이미지를 assets 폴더에 별도로 저장합니다.

    최종적으로 선택한 방향과 그 이유: 이미지를 assets 폴더에 저장합니다. 왜냐하면 이미지 링크가 직접 준비한 것이 아니라 이미지 주소 복사로 가져온 것이라면 언제 비활성화될 지 알 수 없기 때문에, 변하지 않는 데이터라면 애플리케이션 단에 직접 저장하는 것이 합리적입니다.

## 레포지토리 구조

### 기술 스택

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

- 선택 이유:
  - #### styled-component
  - 컴포넌트 이름을 가독성 좋게 구성할 수 있기 때문에 유지 보수에 좋습니다.
  - 컴포넌트 단위로 스타일을 지정해줄 수 있어 재사용성이 높습니다.
  - 컴포넌트의 props를 활용해서 경우에 따른 스타일을 적용시켜 줄 수 있습니다.
  - 클래스나, 태그 중복에 의한 스타일 에러를 막아주기 때문에 일반 css나 scss보다 유용합니다.
  - 기본적으로 scss와 비슷한 문법으로 사용법이 어렵지 않습니다.
  - css-in-js 라이브러리중 가장 널리 쓰이며, 참고할 수 있는 자료가 많습니다.

<details>
<summary style="font-size:17px">폴더 구조</summary>

```
|   App.js
|   index.js
|
+---api
|       index.js
|
+---assets
+---components
|       EmptyResult.jsx
|       Header.jsx
|       Layout.jsx
|       Loading.jsx
|
+---context
|       GithubContext.jsx
|
+---pages
|   +---home
|   |   |   Issue.jsx
|   |   |
|   |   ---hook
|   |           useInfiniteScroll.jsx
|   |
|   ---issueDetail
|       |   IssueDetail.jsx
|       |
|       ---components
|               Markdown.jsx
|               style.js
|
+---styles
|       GlobalStyle.js
|       Theme.js
|
---util
        transDate.js
```

</details>
