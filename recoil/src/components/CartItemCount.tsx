import { useRecoilValue } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

<<<<<<< HEAD
const CartItemCount = () => {
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
};
=======
function CartItemCount() {
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default CartItemCount;
