import { useRecoilState } from 'recoil';
import { itemQuantityState } from '../recoil/atoms';

interface CartItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
}

<<<<<<< HEAD
const CartItem = ({ item }: CartItemProps) => {
=======
function CartItem({ item }: CartItemProps) {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
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
<<<<<<< HEAD
};
=======
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default CartItem;
