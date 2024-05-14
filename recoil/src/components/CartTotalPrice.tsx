import { cartTotalPriceState } from "../recoil/selectors";
import { useRecoilValue } from "recoil";

function CartTotalPrice() {
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
}

export default CartTotalPrice;
