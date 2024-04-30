# 버튼 컴포넌트 스토리북 및 npm 배포

버튼 컴포넌트를 모듈로 배포하는 과정을 시작해보겠습니다.

## Step 1: 프로젝트 설정

프로젝트를 시작하기 전에, 우선 최신 코드를 받아와야 합니다. 이를 위해 `upstream` 저장소에서 최신 변경 사항을 가져옵니다.

```bash
git pull upstream main
cd modules
npm install
```

`git pull upstream main`: 이 명령어는 `upstream` 저장소의 `main` 브랜치에서 최신 변경 사항을 가져와 현재 로컬 저장소와 병합합니다. 이를 통해 프로젝트의 최신 코드를 받아올 수 있습니다.

## Step 2: 버튼 컴포넌트 작성

재사용 가능한 버튼 컴포넌트를 작성해보겠습니다. 컴포넌트는 props를 통해 데이터를 받아 렌더링하는 함수입니다. 프로젝트 내 `src/lib` 폴더에 `Button.tsx` 파일을 생성하고 컴포넌트 코드를 작성합니다.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

`label`은 버튼에 표시될 텍스트이며, `onClick`은 버튼 클릭 시 호출될 함수입니다.

## Step 3: 컴포넌트 스토리북 테스트

작성한 버튼 컴포넌트가 제대로 동작하는지 테스트해봅니다. `App.tsx` 파일에서 버튼 컴포넌트를 import하고 사용합니다.

```tsx
import React from "react";
import Button from "./lib/Button";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      <Button label="Click me" onClick={handleClick} />
    </div>
  );
}

export default App;
```

여기서는 `handleClick` 함수를 정의하여 버튼 클릭 시 동작을 지정하고, `Button` 컴포넌트에 `label`과 `onClick` 속성을 전달하여 사용합니다.

### 개발 서버 실행

개발 서버를 실행하여 훅의 동작을 확인합니다.

```bash
npm run dev
```

브라우저에서 버튼이 잘 동작하는지 확인합니다.

## Step 4: 버튼 컴포너트 스토리북 테스트

스토리북을 통해, 버튼 컴포넌트를 독립적으로 테스트하고 문서화할 수 있습니다. `src/stories` 폴더에 `Button.stories.ts` 파일을 생성하고 다음과 같이 스토리북을 작성합니다.

```ts
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../lib/Button";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click Me!",
    onClick: () => alert("Button clicked!"),
  },
};
```

`npm run storybook` 명령어를 통해 버튼 컴포너트가 잘 렌더링 되는지 확인합니다.

## Step 5: 버튼 컴포넌트 Export

버튼 컴포넌트를 외부에서 사용할 수 있도록 export 합니다. `src/lib/index.ts` 파일을 생성하고 버튼 컴포넌트를 export 합니다.

```tsx
export { default as Button } from "./Button";
```

이렇게 하면 다른 곳에서 버튼 컴포넌트를 import 할 때 `import { Button } from "./lib";`와 같은 방식으로 사용할 수 있습니다.

## Step 6: 빌드 및 배포

이제 버튼 컴포넌트를 npm에 배포할 준비가 되었습니다. npm에 배포하려면 `package.json` 파일을 수정하고, 필요한 설정을 추가해야 합니다.

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

## Step 7: 컴포넌트 사용

npm에 배포한 버튼 컴포넌트를 실제 프로젝트에서 사용해보겠습니다. npm을 통해 컴포넌트를 설치하고 import하여 사용할 수 있습니다.

### 컴포넌트 설치

먼저 npm에 배포한 버튼 컴포넌트를 설치합니다. 터미널에서 다음 명령어를 실행합니다.

```bash
npm install {배포한 패키지 이름}
```

### 컴포넌트 사용

설치한 버튼 컴포넌트를 프로젝트에서 사용하려면 다음과 같이 컴포넌트를 import하고 사용합니다. 현재 모듈 컴포넌트를 만든 `modules` 디렉터리에 있는 App 컴포넌트에서 사용해봅니다.

```tsx
import React from "react";
import { Button } from "button-component-xxx";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      <Button label="Click me" onClick={handleClick} />
    </div>
  );
}

export default App;
```

위와 같이 컴포넌트를 import하고 사용함으로써 npm에 배포한 `useInput` 훅을 다른 프로젝트에서도 사용할 수 있습니다.
