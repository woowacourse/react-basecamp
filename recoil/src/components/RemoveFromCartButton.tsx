import React from "react";
import { cartItemCountState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

function RemoveFromCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
}

export default RemoveFromCartButton;
