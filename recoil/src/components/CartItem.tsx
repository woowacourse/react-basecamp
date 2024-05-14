import React from "react";
import { useRecoilState } from "recoil";
import { itemQuantityState } from "../recoil/atoms";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState(item.id));

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  return (
    <div>
      <span>{item.title}</span>
      <span>수량: {quantity}</span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}

export default CartItem;
