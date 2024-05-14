import React from "react";
import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function AddToCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}

export default AddToCartButton;
