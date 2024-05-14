import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartTotalPriceState } from '../recoil/selectors';

function CartTotalPrice() {
  // Selector의 값을 읽어 오기
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
}

export default CartTotalPrice;
