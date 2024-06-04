import { useRecoilValue } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

function CartItemCount() {
  // 이 훅을 사용하여 Atom이나 Selector의 현재 값을 가져올 수 있음.
  const count = useRecoilValue(cartItemCountState);
  return <div>장바구니 상품 개수: {count}</div>;
}

export default CartItemCount;
