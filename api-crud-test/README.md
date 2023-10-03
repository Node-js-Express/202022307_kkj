![img.png](img.png)
# 주의사항
**controllers와 test, utils에 대한 파일 구조를 수정하지마세요**

jest로 작성된 test code에 대해서 문제가 생길 가능성이 높습니다. 로직에 대한 코드 작성은 `controllers/tasks.js`에서 작성해주시길 바랍니다.

로직에 대한 코드를 작성하실 때도, 해당 함수명에 대해서 수정하지 말아주시길 바랍니다.
테스트를 돌릴 때 문제가 발생할 수 있습니다.

# 기본적인 실행
먼저 파일을 다운 받고 기본적인 모듈을 다운 받아줍니다.
```
git clone https://github.com/jalju0804/Pokemon-CRUD-Express.git
npm i
```
`npm i`은 `npm install`과 동일합니다.

```
npm start
```
위의 명령어를 루트 폴더에서 입력하시면, nodemon app.js가 실행되고 파일이 업로드 되는 것이 바로바로 적용됩니다. 개발 시 유용하게 사용하실 수 있습니다.

# 테스트

```
npm test
또는
npx jest
```
위의 명령어를 입력하면 명령어를 입력한 폴더의 하위 폴더에서 *.test.js라고 이름 붙여진 파일들을 실행합니다. 즉 뒤에 .test.js라고 붙은 테스트 파일들을 실행해줍니다.

