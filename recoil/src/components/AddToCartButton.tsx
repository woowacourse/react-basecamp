import { useSetRecoilState } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

const AddToCartButton = () => {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  return <button onClick={handleClick}>상품 추가</button>;
};

export default AddToCartButton;
