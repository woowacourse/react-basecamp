import React from "react";

import { useRecoilValue } from "recoil";
import { cartItemCountState } from "../recoil/atoms";

function CartItemCount() {
  const count = useRecoilValue(cartItemCountState); // read only
  return <div>장바구니 상품 개수: {count}</div>;
}

export default CartItemCount;
