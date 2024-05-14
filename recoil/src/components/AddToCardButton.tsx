import { useSetRecoilState } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

function AddToCartButton() {
  // atom의 값을 변경하는 함수 가져오기
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}

export default AddToCartButton;
