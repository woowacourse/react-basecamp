// import { useRecoilValue, waitForAll } from "recoil";
// import { useCoupons } from "./hooks/useCoupons";
// import { couponValidityState } from "./recoil/atoms";

// function CouponList() {
//   const coupons = useCoupons();
//   const couponValidities = useRecoilValue(
//     waitForAll(coupons.map((coupon) => couponValidityState(coupon.id)))
//   );

//   return (
//     <ul>
//       {coupons.map((coupon, index) => (
//         <li key={coupon.id}>
//           {coupon.name}
//           {couponValidities[index] ? "(유효)" : "(만료)"}
//         </li>
//       ))}
//     </ul>
//   );
// }
// export default CouponList;
