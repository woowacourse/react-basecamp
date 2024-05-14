import { useSetRecoilState } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

function RemoveFromCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    // Math.max 를 사용해 상품 개수가 음수가 되지 않도록 한다.
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
}

export default RemoveFromCartButton;
