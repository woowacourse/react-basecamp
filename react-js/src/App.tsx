import { CartListSection } from "./cart/CartListSection";
import { Header } from "./cart/Header";
import { PaymentButton } from "./cart/PaymentButton";

function App() {
  return (
    <>
      <Header />
      <CartListSection />
      <PaymentButton />
    </>
  );
}

export default App;
