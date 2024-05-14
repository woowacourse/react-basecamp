import { useRecoilValue } from "recoil";
import { cartTotalPriceState } from "../selectors";

function CartTotalPrice() {
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
}

export default CartTotalPrice;
