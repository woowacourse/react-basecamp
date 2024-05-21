export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
