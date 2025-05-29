import { useCheckedCartList } from "./useCheckedCartList";
import { useGetCartItems, type Product } from "./useGetCartItems";

export function CartListSection() {
  const cartItems = useGetCartItems();
  const { checkedList, toggle, getIsChecked } = useCheckedCartList(
    cartItems.map((item) => item.id)
  );

  return (
    <div>
      <CartCount count={checkedList.length} />
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          product={item.product}
          checked={getIsChecked(item.id)}
          onClick={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

function CartCount({ count }: { count: number }) {
  return <h2>장바구니 개수: {count}</h2>;
}

function CartItem({
  product,
  checked,
  onClick,
}: {
  product: Product;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <>
      <input type="checkbox" checked={checked} onChange={onClick} />
      <div>{product.name}</div>
    </>
  );
}
