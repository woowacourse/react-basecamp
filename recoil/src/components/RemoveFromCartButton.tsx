import { useSetRecoilState } from 'recoil';
import { cartItemCountState } from '../recoil/atoms';

<<<<<<< HEAD
const RemoveFromCartButton = () => {
=======
function RemoveFromCartButton() {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
<<<<<<< HEAD
};
=======
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default RemoveFromCartButton;
