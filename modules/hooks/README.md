# 커스텀 훅 테스트 및 npm 배포

커스텀 훅을 모듈로 배포하는 과정을 시작해보겠습니다.

## Step 1: 프로젝트 설정

프로젝트를 시작하기 전에, 우선 최신 코드를 받아와야 합니다. 이를 위해 `upstream` 저장소에서 최신 변경 사항을 가져옵니다.

```bash
git pull upstream main
cd modules
npm install
```

`git pull upstream main`: 이 명령어는 `upstream` 저장소의 `main` 브랜치에서 최신 변경 사항을 가져와 현재 로컬 저장소와 병합합니다. 이를 통해 프로젝트의 최신 코드를 받아올 수 있습니다.

## Step 2: useInput 훅 작성

`src/lib` 폴더에 `useInput.ts` 파일을 생성하고 다음과 같이 코드를 작성합니다.

```ts
import { useState, ChangeEvent } from "react";

function useInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}

export default useInput;
```

## Step 3: useInput 훅 동작 테스트

작성한 `useInput` 훅이 의도한 대로 동작하는지 테스트해봅니다. 컴포넌트에서 훅을 사용하고 입력 값이 변경되었을 때 상태가 업데이트되는지 확인합니다.

`App.tsx` 파일에서 `useInput` 훅을 import하고 다음과 같이 사용합니다.

```tsx
import React from "react";
import useInput from "./lib/useInput";
import "./App.css";

function App() {
  const { value, onChange } = useInput("");

  return (
    <div>
      <h1>useInput Example</h1>
      <input type="text" value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </div>
  );
}

export default App;
```

여기서는 `useInput` 훅을 사용하여 입력 값과 변경 이벤트 핸들러를 받아옵니다. 입력 필드의 값과 변경 이벤트를 `useInput` 훅에서 반환받은 값과 함수에 바인딩합니다.

### 개발 서버 실행

개발 서버를 실행하여 훅의 동작을 확인합니다.

```bash
npm run dev
```

브라우저에서 애플리케이션이 열리면, 입력 필드에 값을 입력하고 변경했을 때 입력 값이 실시간으로 업데이트되는지 확인합니다.

## Step 4: useInput 훅 RTL 테스트

`useInput` 훅의 동작을 검증하기 위해 React Testing Library(RTL)를 사용하여 테스트 코드를 작성합니다. RTL은 실제 사용자 관점에서 컴포넌트와 훅을 테스트할 수 있는 도구입니다.

### 테스트 코드 작성

`src/lib` 폴더 내에 `useInput.test.ts` 파일을 생성하고 다음과 같이 테스트 코드를 작성합니다.

```tsx
import { renderHook, act } from "@testing-library/react";
import useInput from "./useInput";
import { ChangeEvent } from "react";

describe("useInput", () => {
  it("초기값이 정확히 설정되어야 한다.", () => {
    const initialValue = "Initial Value";
    const { result } = renderHook(() => useInput(initialValue));

    expect(result.current.value).toBe(initialValue);
  });

  it("입력값이 정확히 업데이트 되어야 한다.", () => {
    const userInput = "Hello";
    const { result } = renderHook(() => useInput(""));

    act(() => {
      result.current.onChange({
        target: { value: userInput },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe(userInput);
  });
});
```

- `renderHook`은 RTL에서 제공하는 함수로, 훅을 렌더링하고 해당 훅의 결과를 반환합니다.
- `act`는 RTL에서 제공하는 함수로, 훅의 상태를 변경하는 작업을 래핑합니다. 이를 통해 훅의 상태 변경이 완료된 후에 테스트 검증을 수행할 수 있습니다.
- 첫 번째 테스트 케이스에서는 초기값으로 빈 문자열을 전달하고, `renderHook`을 사용하여 `useInput` 훅을 렌더링합니다. 그리고 `result.current.value`를 통해 현재 입력 값이 빈 문자열인지 검증합니다.
- 이후 `act` 함수를 사용하여 `onChange` 함수를 호출하고, 입력 값을 "Hello"로 변경합니다. 그리고 `result.current.value`를 통해 변경된 입력 값이 "Hello"인지 검증합니다.

### RTL

- RTL은 사용자 관점에서 컴포넌트와 훅을 테스트하는 데 초점을 맞춥니다. 내부 구현 세부사항보다는 실제 사용자 경험에 기반한 테스트를 작성하는 것이 좋습니다.
- `renderHook` 함수는 훅을 독립적으로 테스트할 수 있도록 해줍니다. 훅은 컴포넌트 내에서 사용되지만, `renderHook`을 사용하면 컴포넌트와 분리하여 훅만 테스트할 수 있습니다.
- `act` 함수는 훅의 상태 변경이 완료될 때까지 기다린 후에 테스트 검증을 수행합니다. 이를 통해 비동기적인 상태 변경도 안정적으로 테스트할 수 있습니다.

### 테스트 실행

터미널에서 다음 명령어를 실행하여 테스트를 실행합니다.

```bash
npm test
```

명령어 외에도 [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) 와 같은 익스텐션을 사용하면 하나씩 실행해볼 수 있으니 참고해주세요.

## Step 5: useInput 훅 Export

이후 `src/lib/index.ts` 파일에서 동일하게 export해줍니다.

```tsx
export { default as useInput } from "./useInput";
```

이렇게 하면 다른 곳에서 버튼 컴포넌트를 import 할 때 `import { useInput } from "./lib";`와 같은 방식으로 사용할 수 있습니다.

## Step 6: 빌드 및 배포

이제 useInput 훅을 npm에 배포할 준비가 되었습니다. npm에 배포하려면 `package.json` 파일을 수정하고, 필요한 설정을 추가해야 합니다.

### 빌드 실행

설정이 완료되었으면 터미널에서 다음 명령어를 입력하여 컴포넌트를 빌드합니다.

```bash
npm run build
```

빌드가 성공적으로 완료되면 `dist` 폴더에 컴포넌트의 번들링된 파일과 타입 선언 파일이 생성됩니다.

### package.json 파일 수정

npm에 배포하기 위해 `package.json` 파일을 다음과 같이 수정합니다.

```json
{
  "name": "{고유한 네이밍}",
  "version": "0.0.0",
  "description": "description"
}
```

- `name`: 패키지의 이름을 지정합니다. npm에 배포할 때는 **고유한** 이름을 사용해야 합니다. 일반적으로 `@사용자명/패키지명` 형식을 사용합니다.
- `version`: 패키지의 버전을 지정합니다. 시맨틱 버전닝(Semantic Versioning) 규칙을 따르는 것이 좋습니다.
  - 시맨틱 버전닝은 버전 번호를 `메이저.마이너.패치` 형식으로 표기하는 것입니다.
  - 메이저 버전은 기존 버전과 호환되지 않는 변경사항이 있을 때, 마이너 버전은 기능 추가나 개선이 있을 때, 패치 버전은 버그 수정이 있을 때 증가시킵니다.
- `description`: 패키지에 대한 간단한 설명을 작성합니다.

### npm 로그인 및 배포

터미널에서 다음 명령어를 실행하여 npm에 로그인하고 패키지를 배포합니다.

```bash
npm login
npm publish
```

### 버전 업데이트 및 재배포

만약 한번이라도 배포를 했다면, npm에는 동일한 버전을 다시 배포할 수 없습니다. 그럴 때는 이미 배포한 패키지의 버전을 업데이트하고 다시 배포하려면 다음 명령어를 사용합니다.

```bash
npm version patch
npm publish
```

- `npm version patch`: 패키지의 패치 버전을 증가시킵니다. `minor`나 `major` 옵션을 사용하여 마이너 버전이나 메이저 버전을 증가시킬 수도 있습니다.
- `npm publish`: 업데이트된 버전의 패키지를 다시 배포합니다.

## Step 7: 훅 사용

npm에 배포한 `useInput` 훅을 다른 프로젝트에서 설치하고 사용해봅니다. 훅을 import하여 컴포넌트에서 활용할 수 있습니다.

### 훅 설치

프로젝트에서 터미널을 열고 다음 명령어를 실행하여 `useInput`이 추가된 버전으로 재설치합니다.

```bash
npm uninstall {패키지 이름}
npm install {패키지 이름}
```

### 훅 사용

설치한 `useInput` 훅을 사용하려면 다음과 같이 import하고 사용합니다.

```tsx
import React from "react";
import { useInput } from "{패키지이름}";

function App() {
  const { value, onChange } = useInput("");

  return (
    <div>
      <h1>useInput Example</h1>
      <input type="text" value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </div>
  );
}

export default App;
```

위와 같이 컴포넌트를 import하고 사용함으로써 npm에 배포한 `useInput` 훅을 다른 프로젝트에서도 사용할 수 있습니다.
