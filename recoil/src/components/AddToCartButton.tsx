import React from "react";
import { cartItemCountState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

function AddToCartButton() {
  // 이 훅을 사용하여 컴포넌트에서 Atom의 값을 업데이트할 수 있습니다.
  // useSetRecoilState는 상태 값을 직접 변경하는 것이 아니라, 상태 값을 업데이트하는 함수를 제공합니다.
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}

export default AddToCartButton;
