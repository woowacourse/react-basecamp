import { useSetRecoilState } from "recoil";
import { cartItemCountState } from "../recoil/atom";

function RemoveFromCartButton() {
  const setCount = useSetRecoilState(cartItemCountState);

  const handleClick = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return <button onClick={handleClick}>상품 제거</button>;
}

export default RemoveFromCartButton;
