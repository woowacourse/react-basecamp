<<<<<<< HEAD
import { Coupon } from "../types/coupon";
=======
import { Coupon } from '../types/coupon';
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export const mockCoupons: Coupon[] = [
  {
    id: 1,
<<<<<<< HEAD
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    discount: 5000,
    discountType: "fixed",
    minimumAmount: 100000,
    expirationDate: "2024-11-30",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    discountType: "buyXgetY",
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: "2024-04-30",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    discountType: "freeShipping",
    minimumAmount: 50000,
    expirationDate: "2024-08-31",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    discount: 30,
    discountType: "percentage",
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    expirationDate: "2024-07-31",
=======
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2024-11-30',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2024-04-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2024-08-31',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discount: 30,
    discountType: 'percentage',
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    expirationDate: '2024-07-31',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  },
];
