import { useRecoilValue } from 'recoil';
import { cartTotalPriceState } from '../recoil/selectors';

<<<<<<< HEAD
const CartTotalPrice = () => {
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
};
=======
function CartTotalPrice() {
  const totalPrice = useRecoilValue(cartTotalPriceState);

  return <div>총 가격: {totalPrice}원</div>;
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default CartTotalPrice;
