import { useRecoilValue } from "recoil";
import { cartState } from "../recoil/atoms";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartState);

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return {
    calculateCartTotal,
  };
};
