import { useSetRecoilState } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

<<<<<<< HEAD
const AddToCartButton = () => {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  return <button onClick={handleClick}>상품 추가</button>;
};
=======
function AddToCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>상품 추가</button>;
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default AddToCartButton;
