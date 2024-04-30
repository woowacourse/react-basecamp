import { act, renderHook } from "@testing-library/react";

import { ChangeEvent } from "react";
import useInput from "./useInput";

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
