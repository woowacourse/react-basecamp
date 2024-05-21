<<<<<<< HEAD
import { useCouponValidator } from "./useCouponValidator";
import { Coupon } from "../types/coupon";

describe("useCouponValidator", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-20"));
=======
import { useCouponValidator } from './useCouponValidator';
import { Coupon } from '../types/coupon';

describe('useCouponValidator', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-20'));
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  });

  afterAll(() => {
    jest.useRealTimers();
  });

<<<<<<< HEAD
  it("만료일이 지난 쿠폰은 유효하지 않다", () => {
    const expiredCoupon: Coupon = {
      id: 1,
      code: "EXPIRED_COUPON",
      description: "만료된 쿠폰",
      discountType: "fixed",
      expirationDate: "2024-05-01",
=======
  it('만료일이 지난 쿠폰은 유효하지 않다', () => {
    const expiredCoupon: Coupon = {
      id: 1,
      code: 'EXPIRED_COUPON',
      description: '만료된 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-01',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    };
    const { isCouponValid } = useCouponValidator();
    expect(isCouponValid(expiredCoupon)).toBe(false);
  });

<<<<<<< HEAD
  it("만료일이 지나지 않은 쿠폰은 유효하다", () => {
    const validCoupon: Coupon = {
      id: 2,
      code: "VALID_COUPON",
      description: "유효한 쿠폰",
      discountType: "fixed",
      expirationDate: "2024-05-21",
=======
  it('만료일이 지나지 않은 쿠폰은 유효하다', () => {
    const validCoupon: Coupon = {
      id: 2,
      code: 'VALID_COUPON',
      description: '유효한 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-21',
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    };
    const { isCouponValid } = useCouponValidator();
    expect(isCouponValid(validCoupon)).toBe(true);
  });
});
