// import { useRecoilValue, waitForAll } from "recoil";
// import { useCoupons } from "./hooks/useCoupons";
// import { couponValidityState } from "./recoil/selectors";

// function CartSummary() {
//     const totalAmount = useRecoilValue(totalAmountState);
//     const discountAmount = useRecoilValue(discountAmountState);

//     return (
//       <div>
//         <p>총 상품 금액: {totalAmount + discountAmount}원</p>
//         <p>할인 금액: {discountAmount}원</p>
//         <p>총 결제 예정 금액: {totalAmount}원</p>
//       </div>
//     );
//   }

//   function CouponList() {
//     const coupons = useCoupons();
//     const couponValidities = useRecoilValue(
//       waitForAll(coupons.map((coupon) => couponValidityState(coupon.id)))
//     );

//     return (
//       <ul>
//         {coupons.map((coupon, index) => (
//           <li key={coupon.id}>
//             {coupon.name}
//             {couponValidities[index] ? "(유효)" : "(만료)"}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   export default CartSummary
