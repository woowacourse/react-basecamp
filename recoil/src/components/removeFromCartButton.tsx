import React from "react";
import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function RemoveFromCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
}

export default RemoveFromCartButton;
