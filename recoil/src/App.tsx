import React from "react";
import CartItemCount from "./components/CartItemCount";
import AddToCartButton from "./components/AddToCartButton";
import RemoveFromCartButton from "./components/RemoveFromCartButton";
import "./App.css";

function App() {
  return (
    <div>
      <h1>장바구니</h1>
      <CartItemCount />
      <AddToCartButton />
      <RemoveFromCartButton />
    </div>
  );
}

export default App;
