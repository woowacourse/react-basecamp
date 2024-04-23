# storybook basic

## 1. Storybook 설치

storybook 디렉터리로 이동한 다음, 아래 명령어를 실행하여 Storybook을 설치합니다.

```sh
npx sb init
```

## 2. Storybook 실행

다음 명령어를 실행하여 Storybook 개발 서버를 시작합니다

```sh
npm run storybook
```

## 3. 첫 번째 컴포넌트 스토리 작성

### Step 1: 숫자 표시 컴포넌트 구현

1. src 디렉토리에 components 폴더를 생성하고, 그 안에 `Display.tsx` 파일을 생성합니다.
2. `Display.tsx`에 다음 코드를 작성합니다.
   `

```tsx
export default function Display() {
  return <div>0</div>;
}
```

### step2: 스토리 파일 생성

1. src 디렉토리에 stories 폴더를 생성하고, `Display.stories.tsx` 파일을 생성합니다.

2. `Display.stories.tsx`에 다음 코드를 작성합니다.

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import Display from "../components/Display";

const meta = {
  title: "Display",
  component: Display,
} satisfies Meta<typeof Display>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```
