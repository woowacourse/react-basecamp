import React from "react";
import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

// useSetRecoilState : Recoil의 상태 값을 변경하는 함수를 반환
function AddToCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}

export default AddToCartButton;
