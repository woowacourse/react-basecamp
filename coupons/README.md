# 쿠폰 적용 실습 가이드

이 가이드는 TDD적인 접근 방식으로 복잡한 문제를 풀어나가고, 핵심 로직을 파악하기 위한 실습입니다. 테스트 코드 작성과 구현을 위한 코드에 대한 안내는 있지만, 리팩터링에 대한 내용은 직접 제시하지는 않았습니다.

실습 가이드를 진행하면서 시도해볼 수 있는 리팩터링이 있다면 적극적으로 적용해보세요. 이번 실습의 목표는 단순히 마지막 스텝까지 마무리 하는 것이 아니라, 복잡한 요구사항을 정리하고, 작은 단위로 나누어서 점진적으로 정복해 나가는 것입니다.

이번 실습을 통해 그 과정을 차근차근 경험해 봅시다!

# Step 0. TDD 사고 방식으로 문제 분석하기

## 1단계: TDD 제 1원칙. 결국 우리가 뭐하려고 하는 거지?

### 학습 목표

- 쿠폰 적용 기능의 핵심 로직을 테스트 가능하게 구현한다.

## 2단계: 핵심 기능을 1줄로 정의해보기

쿠폰 적용 기능의 핵심을 한 문장으로 정의해봅시다.

> 쿠폰 코드를 받아 유효성을 확인하고, 적용 조건을 만족하는 경우 할인 금액을 계산하여 반환한다.

## 3단계: 동작 가능한 가장 작은 버전부터 시뮬레이션 해보기

1개의 쿠폰 적용 로직을 동작 가능한 작은 버전으로 만드는 과정을 상상해봅시다.

1. 쿠폰 코드로 쿠폰 찾기
2. 쿠폰 유효성 확인(존재 여부, 만료일 체크)
3. 쿠폰 적용 조건 확인(최소 주문 금액, 사용 가능 시간)
4. 할인 유형별 할인 금액 계산
5. 계산된 할인 금액 반환

## 4단계: 핵심과 가까우면서 쉽게 할 수 있는 적절한 것 선택하기

쿠폰 코드로 쿠폰을 찾는 것부터 시작해보겠습니다. 이를 위해 먼저 쿠폰 데이터를 정의하고, 쿠폰 목록을 가져오는 기능을 구현해야 합니다.

## 5단계: **결과를 만드는데 필요한 과정을 구체화하고 최대한 진짜처럼 시뮬레이션 해보기**

1. 쿠폰 데이터 인터페이스 정의하기
2. 쿠폰 목록 가져오기
3. 쿠폰 코드로 쿠폰 찾기
4. 쿠폰 유효성 확인하기
5. 쿠폰 적용 조건 확인하기
6. 할인 유형별 할인 금액 계산하기
7. 계산된 할인 금액 반환하기

## 6단계 : 동작 가능한 코드 작성 및 확인

# Step 1: 프로젝트 구조 파악하기

### 학습 목표

- 프로젝트의 전체적인 구조를 파악하기

먼저 프로젝트 구조를 살펴보겠습니다. 아래와 같은 구조로 되어 있습니다.

```
src/
├── recoil/
│   ├── atoms.ts
│   └── selectors.ts
├── hooks/
│   ├── useCoupons.ts
│   ├── useCouponFinder.ts
│   ├── useCouponValidator.ts
│   ├── useCouponApplicabilityChecker.ts
│   └── useDiscountCalculator.ts
├── types/
│   ├── coupon.ts
│   └── cart.ts
├── App.tsx
└── index.tsx
```

# Step 2: 쿠폰 데이터 모델링하기

## 학습 목표

- TypeScript 인터페이스를 사용하여 쿠폰 데이터 모델링하기
- 쿠폰의 속성과 할인 유형 이해하기

## 가이드

1. `src/types/coupon.ts` 파일을 생성하고 다음과 같이 `Coupon` 인터페이스를 정의합니다. 할인 유형별로 필요한 속성이 무엇인지 생각해 봅시다.

   ```tsx
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
   }
   ```

# Step 3: Recoil을 사용하여 쿠폰 상태 관리하기

## 학습 목표

- Recoil의 atom을 사용하여 쿠폰 상태를 정의하고 관리하기
- Recoil의 selector를 사용하여 파생 상태를 계산하기

## 가이드

### 1. 쿠폰 목록 atom 정의하기

`src/recoil/atoms.ts` 파일을 생성하고 `couponsState` atom을 정의합니다.

```tsx
import { atom } from "recoil";
import { Coupon } from "../types/coupon";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
```

이 atom은 쿠폰 목록을 저장하는 상태입니다. 초기값은 빈 배열로 설정하였습니다.

### 2. 쿠폰 목록 가져오기 selector 정의하기

`src/recoil/selectors.ts` 파일을 생성하고 `couponListSelector`를 정의합니다.

```tsx
import { selector } from "recoil";
import { couponsState } from "./atoms";

export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});
```

이 selector는 `couponsState` atom의 값을 그대로 반환합니다. 현재는 단순히 값을 전달하는 역할만 하지만, 향후 쿠폰 목록에 대한 복잡한 로직이 추가될 수 있습니다.

# Step 3: Recoil을 사용하여 쿠폰 상태 관리하기

## 학습 목표

- Recoil의 atom을 사용하여 쿠폰 상태를 정의하고 관리하기
- Recoil의 selector를 사용하여 파생 상태를 계산하기

## 가이드

### 1. 쿠폰 목록 가져오기 테스트 작성하기

`useCoupons` 훅을 사용하여 쿠폰 목록을 가져오는 테스트 케이스를 작성해 보겠습니다. 이 테스트는 `useCoupons` 훅이 `couponListSelector`를 통해 쿠폰 목록을 제대로 가져오는지 확인합니다.

먼저 `src/hooks/useCoupons.test.tsx` 파일을 열고 다음과 같이 테스트 케이스를 작성합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCoupons } from "./useCoupons";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCoupons", () => {
  it("쿠폰 목록을 반환한다", () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.coupons).toBeDefined();
    expect(result.current.coupons.length).toBe(4);
  });
});
```

이 테스트에서는 `RecoilRoot`의 `initializeState` 프로퍼티를 사용하여 `couponsState`의 초기값을 `mockCoupons`로 설정합니다. 그리고 `useCoupons` 훅이 반환하는 `coupons` 를 확인합니다.

이제 `src/mocks/coupons.ts` 파일을 생성하고 `mockCoupons` 데이터를 다음과 같이 정의합니다.

```tsx
import { Coupon } from "../types/coupon";

export const mockCoupons: Coupon[] = [
  {
    id: 1,
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
  },
];
```

### 2. 테스트 실패 확인하기

현재 `useCoupons` 훅과 필요한 atom, selector가 없기 때문에 테스트는 실패할 것입니다. 다음 단계에서 이를 구현해 보겠습니다.

### 3. 쿠폰 목록 atom 정의하기

`src/recoil/atoms.ts` 파일을 생성하고 `couponsState` atom을 정의합니다.

```tsx
import { atom } from "recoil";
import { Coupon } from "../types/coupon";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
```

이 atom은 쿠폰 목록을 저장하는 상태입니다. 초기값은 빈 배열로 설정하였습니다.

### 4. 쿠폰 목록 가져오기 selector 정의하기

`src/recoil/selectors.ts` 파일을 생성하고 `couponListSelector`를 정의합니다.

```tsx
import { selector } from "recoil";
import { couponsState } from "./atoms";

export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});
```

이 selector는 `couponsState` atom의 값을 그대로 반환합니다. 현재는 단순히 값을 전달하는 역할만 하지만, 향후 쿠폰 목록에 대한 복잡한 로직이 추가될 수 있습니다.

### 5. 쿠폰 목록 가져오기 구현하기

이번에는 `useCoupons` 훅에서 `couponListSelector`를 사용하여 쿠폰 목록을 가져오도록 구현해 보겠습니다.

`src/hooks/useCoupons.ts` 파일을 열고 다음과 같이 `useCoupons` 훅을 구현합니다.

```tsx
import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);

  return {
    coupons,
  };
};
```

`useRecoilValue` 훅을 사용하여 `couponListSelector`의 값을 가져오고, 이를 `useCoupons` 훅에서 반환합니다.

### 6. 테스트 통과 확인하기

이제 `useCoupons` 훅과 필요한 atom, selector를 구현했으니 테스트를 다시 실행해봅시다. 테스트 케이스가 통과하는 것을 확인할 수 있습니다.

# Step 4: 쿠폰 유효성 확인하기

## 학습 목표

- 쿠폰 유효성 확인 로직을 TDD 방식으로 구현하기
- Jest의 FakeTimers를 사용하여 시간 의존적인 테스트를 처리하는 방법 학습하기

## 가이드

쿠폰 적용 로직을 구현하기에 앞서, 전체 흐름을 먼저 살펴보겠습니다. 쿠폰을 적용하기 위해서는 다음과 같은 단계를 거칩니다.

1. 쿠폰 찾기
2. 쿠폰 유효성 확인 - 존재 여부, 만료일 체크
3. 쿠폰 적용 조건 확인 - 최소 주문 금액, 사용 가능 시간
4. 할인 유형별 할인 금액 계산

각 단계는 별도의 훅으로 분리하여 구현할 예정입니다.

- `useCouponFinder`: 쿠폰 코드로 쿠폰을 찾는 역할을 합니다.
- `useCouponValidator`: 쿠폰의 유효성(만료일)을 검사하는 역할을 합니다.
- `useCouponApplicabilityChecker`: 쿠폰 적용 조건(최소 주문 금액, 사용 가능 시간)을 확인하는 역할을 합니다.
- `useDiscountCalculator`: 쿠폰의 할인 유형에 따라 할인 금액을 계산하는 역할을 합니다.

이제 본격적으로 각 훅을 TDD 방식으로 구현해 보겠습니다.

### 1. 쿠폰 존재 여부 확인하기

먼저, 쿠폰 코드를 받아 해당 쿠폰이 존재하는지 확인하는 함수를 작성해 보겠습니다.

### 실패하는 테스트 작성

`src/hooks/useCouponFinder.test.tsx` 파일을 생성하고 다음과 같이 테스트 케이스를 작성합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCouponFinder } from "./useCouponFinder";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCouponFinder", () => {
  it("존재하는 쿠폰 코드로 쿠폰을 찾을 수 있다", () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode("FIXED5000")).toBe(mockCoupons[0]);
  });

  it("존재하지 않는 쿠폰 코드로 쿠폰을 찾으면 undefined를 반환한다", () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode("INVALID_CODE")).toBeUndefined();
  });
});
```

이 테스트는 `useCouponFinder` 훅의 `findCouponByCode` 함수를 검증합니다.

- 첫 번째 테스트는 존재하는 쿠폰 코드로 쿠폰을 찾을 수 있는지 확인합니다.
- 두 번째 테스트는 존재하지 않는 쿠폰 코드로 쿠폰을 찾을 때 `undefined`를 반환하는지 확인합니다.

### 테스트를 통과하는 코드 작성

`src/hooks/useCouponFinder.ts` 파일에 다음과 같이 `findCouponByCode` 함수를 구현합니다.

```tsx
import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
```

`findCouponByCode` 함수는 `Array.find` 메서드를 사용하여 전달된 `code`와 일치하는 쿠폰을 찾아 반환합니다. 일치하는 쿠폰이 없으면 `undefined`를 반환합니다.

### 2. 쿠폰 만료 여부 확인하기

다음으로, 쿠폰의 만료 여부를 확인하는 함수를 작성해 보겠습니다.

### 실패하는 테스트 작성

`src/hooks/useCouponValidator.test.ts` 파일을 생성하고 다음과 같이 테스트 케이스를 작성합니다.

```tsx
import { useCouponValidator } from "./useCouponValidator";
import { Coupon } from "../types/coupon";

describe("useCouponValidator", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-20"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("만료일이 지난 쿠폰은 유효하지 않다", () => {
    const expiredCoupon: Coupon = {
      id: 1,
      code: "EXPIRED_COUPON",
      description: "만료된 쿠폰",
      discountType: "fixed",
      expirationDate: "2024-05-01",
    };
    const { isCouponValid } = useCouponValidator();
    expect(isCouponValid(expiredCoupon)).toBe(false);
  });

  it("만료일이 지나지 않은 쿠폰은 유효하다", () => {
    const validCoupon: Coupon = {
      id: 2,
      code: "VALID_COUPON",
      description: "유효한 쿠폰",
      discountType: "fixed",
      expirationDate: "2024-05-21",
    };
    const { isCouponValid } = useCouponValidator();
    expect(isCouponValid(validCoupon)).toBe(true);
  });
});
```

이 테스트는 `useCouponValidator` 훅의 `isCouponValid` 함수를 검증합니다.

- `beforeAll` 훅에서 Jest의 FakeTimers를 사용하여 현재 시간을 고정합니다. 이렇게 하면 테스트 실행 시점과 관계없이 일관된 결과를 얻을 수 있습니다.
- 첫 번째 테스트는 만료일이 지난 쿠폰이 유효하지 않은 것으로 판단되는지 확인합니다.
- 두 번째 테스트는 만료일이 지나지 않은 쿠폰이 유효한 것으로 판단되는지 확인합니다.
- `afterAll` 훅에서 실제 타이머를 복원합니다.

### 테스트를 통과하는 코드 작성

`src/hooks/useCouponValidator.ts` 파일에 다음과 같이 `isCouponValid` 함수를 구현합니다.

```tsx
import { Coupon } from "../types/coupon";

export const useCouponValidator = () => {
  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  return {
    isCouponValid,
  };
};
```

`isCouponExpired` 함수는 쿠폰의 만료일을 현재 날짜와 비교하여 만료 여부를 판단합니다.

`isCouponValid` 함수는 `isCouponExpired` 함수를 사용하여 쿠폰의 유효성을 판단합니다. 쿠폰이 만료되지 않았다면 `true`를, 만료되었다면 `false`를 반환합니다.

### 정리

이번 단계에서는 쿠폰의 유효성을 확인하는 로직을 TDD 방식으로 구현해 보았습니다. 쿠폰의 존재 여부와 만료 여부를 확인하는 함수를 작성하고, 해당 함수를 테스트하는 코드를 먼저 작성한 후 실제 구현을 진행했습니다.

시간에 의존하는 테스트의 경우 Jest의 가짜 타이머를 사용하여 현재 시간을 고정함으로써 일관된 결과를 얻을 수 있었습니다.

# Step 5: 쿠폰 적용 조건 확인하기

## 학습 목표

- 쿠폰의 적용 조건 확인 로직을 TDD 방식으로 구현하기
- 최소 주문 금액과 사용 가능 시간 조건 처리 방법 학습하기

## 가이드

이번 단계에서는 쿠폰의 최소 주문 금액 조건과 사용 가능 시간 조건을 확인하는 로직을 TDD 방식으로 구현해 보겠습니다.

### 1. 최소 주문 금액 조건 확인하기

먼저, 쿠폰의 최소 주문 금액 조건을 확인하는 로직을 구현해 보겠습니다.

### 실패하는 테스트 작성

`src/hooks/useCouponApplicabilityChecker.test.tsx` 파일을 생성하고 다음과 같이 테스트 케이스를 작성합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCouponApplicabilityChecker", () => {
  it("주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[0], 50000)).toBe(
      false
    );
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[2], 60000)).toBe(true);
  });
});
```

이 테스트는 `useCouponApplicabilityChecker` 훅의 `isCouponApplicable` 함수를 검증합니다.

- 첫 번째 테스트는 주문 금액이 최소 주문 금액 미만일 때 쿠폰이 적용되지 않는지 확인합니다.
- 두 번째 테스트는 주문 금액이 최소 주문 금액 이상일 때 쿠폰이 적용되는지 확인합니다.

### 테스트를 통과하는 코드 작성

`src/hooks/useCouponApplicabilityChecker.ts` 파일에 다음과 같이 `isCouponApplicable` 함수를 구현합니다.

```tsx
import { useCouponFinder } from "./useCouponFinder";
import { useCouponValidator } from "./useCouponValidator";
import { Coupon } from "../types/coupon";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
```

`isCouponApplicable` 함수는 쿠폰 객체와 총 주문 금액을 매개변수로 받아 해당 쿠폰의 적용 가능 여부를 반환합니다.

1. `findCouponByCode`로 쿠폰을 찾고, 쿠폰이 존재하지 않거나 유효하지 않으면 `false`를 반환합니다.
2. 쿠폰에 `minimumAmount` 속성이 있고, 총 주문 금액이 이 값보다 작으면 `false`를 반환합니다.
3. 위 조건을 모두 통과하면 `true`를 반환합니다.

### 2. 사용 가능 시간 조건 확인하기

다음으로, 쿠폰의 사용 가능 시간 조건을 확인하는 로직을 구현해 보겠습니다.

### 실패하는 테스트 작성

`src/hooks/useCouponApplicabilityChecker.test.ts` 파일에 다음과 같은 테스트 케이스를 추가합니다.

```tsx
describe("쿠폰 사용 가능 시간 확인", () => {
  it("사용 가능 시간 외에는 쿠폰 적용 불가", () => {
    const testTime = new Date("2023-05-01T08:00:00");

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(mockCoupons[3], 100000, testTime)
    ).toBe(false);
  });

  it("사용 가능 시간 내에는 쿠폰 적용 가능", () => {
    const testTime = new Date("2023-05-01T07:00:00");
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(
      result.current.isCouponApplicable(mockCoupons[3], 100000, testTime)
    ).toBe(true);
  });
});
```

- 첫 번째 테스트에서는 현재 시간을 사용 가능 시간 외로 설정하고, `MIRACLESALE` 쿠폰이 적용되지 않는지 확인합니다.
- 두 번째 테스트에서는 현재 시간을 사용 가능 시간 내로 설정하고, `MIRACLESALE` 쿠폰이 적용되는지 확인합니다.

### 테스트를 통과하는 코드 작성

`src/hooks/useCouponApplicabilityChecker.ts` 파일의 `isCouponApplicable` 함수에 사용 가능 시간 조건을 추가합니다.

```tsx
import { useCouponFinder } from "./useCouponFinder";
import { useCouponValidator } from "./useCouponValidator";
import { Coupon } from "../types/coupon";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date()
  ) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] =
        targetCoupon.availableTime.start.split(":").map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end
        .split(":")
        .map(Number);

      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond
      );

      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute,
        endSecond
      );

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
```

사용 가능 시간 조건을 확인하는 로직은 다음과 같습니다.

1. 쿠폰에 `availableTime` 속성이 있는 경우에만 실행됩니다.
2. `coupon.availableTime.start`와 `coupon.availableTime.end`를 `split`과 `map`을 사용해 시, 분, 초로 분리하고 숫자로 변환합니다.
3. 현재 날짜와 사용 가능 시간을 조합하여 `startTime`과 `endTime` Date 객체를 생성합니다.
4. 현재 시간(`now`)이 `startTime`보다 이르거나 `endTime`보다 늦으면 `false`를 반환합니다.
5. 모든 조건을 통과하면 `true`를 반환합니다.

### 정리

이번 단계에서는 쿠폰의 적용 조건 중 최소 주문 금액과 사용 가능 시간을 확인하는 로직을 TDD 방식으로 구현해 보았습니다.

최소 주문 금액 조건은 쿠폰의 `minimumAmount` 속성과 실제 주문 금액을 비교하여 처리하였고, 사용 가능 시간 조건은 쿠폰의 `availableTime` 속성을 기준으로 현재 시간이 사용 가능 시간 범위 내에 있는지 확인하였습니다.

# Step 6: 할인 유형별 할인 금액 계산하기

## 학습 목표

- 각 할인 유형별 할인 금액 계산 로직을 TDD 방식으로 구현하기
- 고정 금액 할인, 비율 할인 등 할인 계산 방법 학습하기
- 쿠폰 적용 조건을 고려하여 할인 금액 계산하기

## 가이드

이번 단계에서는 고정 금액 할인, 비율 할인 등 다양한 할인 유형에 따른 할인 금액 계산 로직을 TDD 방식으로 구현해 보겠습니다. 또한, 이전 단계에서 구현한 쿠폰 적용 조건 확인 로직을 활용하여 할인 금액을 계산하는 방법도 함께 다루어 보겠습니다.

### 1. CartItem 타입 선언하기

할인 금액 계산에 필요한 장바구니 아이템의 타입을 선언해 보겠습니다.

`src/types/cart.ts` 파일을 생성하고 다음과 같이 `CartItem` 타입을 선언합니다.

```tsx
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
```

이 타입은 장바구니 아이템의 기본적인 속성을 정의했습니다. 실제 프로젝트에서는 필요에 따라 추가 속성을 포함할 수 있습니다.

### 2. 할인 금액 계산 로직 테스트 작성하기

할인 금액 계산 로직의 테스트 코드를 작성해 보겠습니다. 테스트 코드를 먼저 작성하면 로직의 요구사항을 명확히 할 수 있고, 구현 후에는 안정적인 기능 동작을 보장할 수 있습니다.

`src/hooks/useDiscountCalculator.test.tsx` 파일을 생성하고 각 할인 유형별 테스트 케이스를 작성합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useDiscountCalculator", () => {
  describe("고정 금액 할인", () => {
    it("고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(
        result.current.calculateDiscountAmount(mockCoupons[0], 120000)
      ).toBe(5000);
    });

    it("주문 금액이 최소 주문 금액 미만일 때는 고정 금액 할인이 적용되지 않는다", () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(
        result.current.calculateDiscountAmount(mockCoupons[0], 50000)
      ).toBe(0);
    });
  });

  describe("비율 할인", () => {
    // ... 비율 할인 테스트 케이스
  });

  describe("Buy X Get Y 할인", () => {
    // ... Buy X Get Y 할인 테스트 케이스
  });
});
```

위 테스트 코드에서는 고정 금액 할인에 대한 테스트 케이스를 작성하였습니다. 비율 할인과 Buy X Get Y 할인에 대한 테스트 케이스도 유사한 방식으로 작성할 수 있습니다.

### 3. 할인 금액 계산 로직 구현하기

테스트 코드를 작성했으니 이제 실제 할인 금액 계산 로직을 구현해 보겠습니다.

`src/hooks/useDiscountCalculator.ts` 파일을 생성하고 다음과 같이 할인 금액 계산 로직을 구현합니다.

```tsx
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";
import { Coupon } from "../types/coupon";

export const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateDiscountAmount = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date()
  ) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
        return calculatePercentageDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
```

위 코드에서는 `calculateFixedDiscount`, `calculatePercentageDiscount`, `calculateBuyXGetYDiscount` 함수를 구현하여 각 할인 유형별 할인 금액을 계산합니다. 이때 `isCouponApplicable` 함수를 사용하여 쿠폰 적용 조건을 확인하고, 조건을 만족하지 않으면 할인 금액을 0으로 처리합니다.

`calculateDiscountAmount` 함수는 쿠폰의 할인 유형에 따라 적절한 계산 함수를 호출하여 최종 할인 금액을 반환합니다.

### 4. `useCoupons` 훅에서 `useDiscountCalculator` 사용하기

이제 `useCoupons` 훅에서 `useDiscountCalculator` 훅을 사용하여 할인 금액 계산 로직을 호출해 보겠습니다.

`src/hooks/useCoupons.ts` 파일을 열고 다음과 같이 수정합니다.

```tsx
import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateDiscountAmount,
  };
};
```

이제 `useCoupons` 훅에서 `calculateDiscountAmount` 함수를 사용하여 쿠폰의 할인 금액을 계산할 수 있습니다.

# Step 7: 장바구니 총합 계산 및 쿠폰 할인 적용하기

## 학습 목표

- 장바구니에 담긴 상품의 총 금액을 계산하는 로직을 TDD 방식으로 구현하기
- 쿠폰 할인을 적용한 최종 결제 금액을 계산하는 로직을 TDD 방식으로 구현하기

## 가이드

이번 단계에서는 장바구니에 담긴 상품의 총 금액을 계산하고, 쿠폰 할인을 적용한 최종 결제 금액을 계산하는 로직을 TDD 방식으로 구현해보겠습니다.

### 1. 장바구니 상태 정의하기

Recoil을 사용하여 장바구니 상태를 정의해보겠습니다.

`src/recoil/atoms.ts` 파일을 열고 다음과 같이 `cartState` atom을 추가합니다.

```tsx
import { atom } from "recoil";
import { CartItem } from "../types/cart";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});
```

### 2. 장바구니 총합 계산 로직 테스트 작성하기

장바구니 총합 계산 로직의 테스트 코드를 작성해보겠습니다.

`src/hooks/useCartCalculator.test.tsx` 파일을 생성하고 다음과 같이 테스트 케이스를 작성합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCartCalculator } from "./useCartCalculator";
import { cartState } from "../recoil/atoms";

describe("useCartCalculator", () => {
  it("장바구니 총합을 계산할 수 있다", () => {
    const mockCartItems = [
      { id: 1, name: "Item 1", price: 10000, quantity: 2 },
      { id: 2, name: "Item 2", price: 20000, quantity: 1 },
    ];

    const { result } = renderHook(() => useCartCalculator(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartState, mockCartItems)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.calculateCartTotal()).toBe(40000);
  });
});
```

### 3. 장바구니 총합 계산 로직 구현하기

테스트를 통과하도록 장바구니 총합 계산 로직을 구현해보겠습니다.

`src/hooks/useCartCalculator.ts` 파일을 생성하고 다음과 같이 코드를 작성합니다.

```tsx
import { useRecoilValue } from "recoil";
import { cartState } from "../recoil/atoms";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartState);

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return {
    calculateCartTotal,
  };
};
```

### 4. 쿠폰 할인 적용 로직 테스트 작성하기

쿠폰 할인을 적용한 최종 결제 금액 계산 로직의 테스트 코드를 작성해보겠습니다.

`src/hooks/useCartCalculator.test.tsx` 파일에 다음과 같이 테스트 케이스를 추가합니다.

```tsx
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { cartState, couponsState } from "../recoil/atoms";
import { useCartCalculator } from "../hooks/useCartCalculator";
import { mockCoupons } from "../mocks/coupons";

describe("useCartCalculator", () => {
  // 생략 ...

  it("쿠폰 할인이 적용된 최종 결제 금액을 계산할 수 있다", () => {
    const mockCartItems = [
      { id: 1, name: "Item 1", price: 10000, quantity: 2 },
      { id: 2, name: "Item 2", price: 20000, quantity: 1 },
      { id: 2, name: "Item 3", price: 60000, quantity: 1 },
    ];

    const { result } = renderHook(() => useCartCalculator(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartState, mockCartItems);
            set(couponsState, mockCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.calculateTotalWithCoupon("FIXED5000")).toBe(95000);
  });
});
```

### 5. 쿠폰 할인 적용 로직 구현하기

테스트를 통과하도록 쿠폰 할인 적용 로직을 구현해보겠습니다.

`src/hooks/useCartCalculator.ts` 파일에 다음과 같이 코드를 추가합니다.

```tsx
import { useRecoilValue } from "recoil";
import { cartState, couponsState } from "../recoil/atoms";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartState);
  const coupons = useRecoilValue(couponsState);
  const { calculateDiscountAmount } = useDiscountCalculator();

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotalWithCoupon = (couponCode: string) => {
    const cartTotal = calculateCartTotal();
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) return cartTotal;

    const discountAmount = calculateDiscountAmount(coupon, cartTotal);
    return cartTotal - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};
```

`calculateTotalWithCoupon` 함수에서는 쿠폰 코드를 받아 해당 쿠폰을 찾고, `useDiscountCalculator` 훅의 `calculateDiscountAmount` 함수를 사용하여 할인 금액을 계산합니다. 그리고 장바구니 총합에서 할인 금액을 차감하여 최종 결제 금액을 반환합니다.

# Step 8. 커스텀 훅에서 파생 상태 관리

이번 실습 과정에서 우리는 TDD를 통해 쿠폰이라는 복잡한 상태 관리 로직을 점진적으로 구현해 나가는 경험을 했습니다. 낯설고 불확실한 문제를 효과적으로 풀어나가는 가장 좋은 방법은 핵심 기능을 동작 가능한 가장 작은 버전부터 만들고, 낯선 것을 한 번에 하나씩 적용해 나가는 겁니다. 이게 바로 TDD를 통해 난이도를 낮추는 것입니다.

이번 실습에서는 쿠폰의 유효성 확인, 할인 금액 계산, 총 결제 금액 계산 등을 별도의 커스텀 훅으로 분리하여 TDD로 구현했습니다. 이는 각 관심사를 명확히 분리하고 독립적으로 테스트할 수 있다는 장점이 있지만, 상태 간의 관계와 데이터 흐름을 명확하게 표현하기 어려운 부분이 있습니다.

실제 장바구니 앱에서는 쿠폰의 유효성, 할인 금액, 총 결제 금액 등이 서로 밀접하게 연관되어 있고 더 복잡해질 가능성이 높습니다. 예를 들어 새로운 쿠폰이 추가되거나, 쿠폰의 유효성이 변경되면 할인 금액과 총 결제 금액도 계속해서 함께 변경되어야 합니다.

이렇게 다른 상태에 의존하여 계산되는 상태를 '파생 상태(derived state)'라고 합니다. 파생 상태를 적극적으로 활용하면 상태 간의 관계를 명확히 하고, 변경에 따른 연쇄 작용을 자동화할 수 있습니다.

## 파생 상태 적용 방법

그렇다면 앞에서 작성한 커스텀 훅을 어떻게 수정하여 파생 상태를 적용할 수 있을까요? 기존 훅의 책임을 더욱 명확히 하고, 파생 상태를 계산하는 부분을 분리해 보는 것으로 만들어나갈 수 있습니다.

### 1. 상태와 파생 상태 분리하기

먼저 쿠폰 목록과 장바구니 상품 목록과 같은 핵심 상태는 그대로 유지합니다. 그리고 쿠폰 유효 여부, 할인 금액, 총 결제 금액 등의 파생 상태를 별도로 정의합니다.

```tsx
export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const couponValidityState = selectorFamily<boolean, number>({
  key: 'couponValidityState',
  get: (couponId) => ({ get }) => {
    const coupon = get(couponsState).find((c) => c.id === couponId);
    if (!coupon) return false;
    return !isCouponExpired(coupon.expirationDate);
  },
});

export const cartTotalState = selector<number>({
  key: 'cartTotalState',
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
});

export const discountAmountState = selector<number>({ ... });
export const totalAmountState = selector<number>({ ... });

```

### 2. 커스텀 훅 수정하기

다음으로 기존의 커스텀 훅을 수정하여 파생 상태를 활용하도록 변경합니다. 예를 들어 `useCouponFinder`와 `useCouponValidator` 훅을 다음과 같이 리팩터링할 수 있습니다.

```tsx
export const useCouponFinder = (code: string) => {
  const coupon = useRecoilValue(couponByCodeSelector(code));
  return coupon;
};

export const couponByCodeSelector = selectorFamily<Coupon | undefined, string>({
  key: "couponByCodeSelector",
  get:
    (code) =>
    ({ get }) => {
      const coupons = get(couponsState);
      return coupons.find((coupon) => coupon.code === code);
    },
});

export const useCouponValidator = (couponId: number) => {
  const isValid = useRecoilValue(couponValidityState(couponId));
  return isValid;
};
```

`useCouponFinder` 훅은 이제 `couponListSelector` 대신 `couponByCodeSelector`를 사용하여 특정 쿠폰을 찾습니다. `useCouponValidator` 훅은 `couponValidityState`를 사용하여 쿠폰의 유효성을 확인합니다.

이렇게 하면 각 훅의 책임이 더욱 명확해지고, 상태 간의 의존 관계가 선언적으로 표현됩니다. 또한 훅 간의 결합도가 낮아져 테스트와 재사용이 용이해집니다.

### 3. 컴포넌트에서 파생 상태 사용하기

마지막으로 컴포넌트에서 파생 상태를 사용하여 UI를 업데이트합니다.

```tsx
function CartSummary() {
  const totalAmount = useRecoilValue(totalAmountState);
  const discountAmount = useRecoilValue(discountAmountState);

  return (
    <div>
      <p>총 상품 금액: {totalAmount + discountAmount}원</p>
      <p>할인 금액: {discountAmount}원</p>
      <p>총 결제 예정 금액: {totalAmount}원</p>
    </div>
  );
}

function CouponList() {
  const coupons = useCoupons();
  const couponValidities = useRecoilValue(
    waitForAll(coupons.map((coupon) => couponValidityState(coupon.id)))
  );

  return (
    <ul>
      {coupons.map((coupon, index) => (
        <li key={coupon.id}>
          {coupon.name}
          {couponValidities[index] ? "(유효)" : "(만료)"}
        </li>
      ))}
    </ul>
  );
}
```

`CartSummary` 컴포넌트는 `totalAmountState`와 `discountAmountState`를 사용하여 총 상품 금액, 할인 금액, 총 결제 예정 금액을 표시합니다. `CouponList` 컴포넌트는 `couponValidityState`를 사용하여 각 쿠폰의 유효 여부를 표시합니다.

이런 상황에서 파생 상태를 활용하면, 상태 간의 관계를 더 명확하게 정의할 수 있습니다. 원본 상태(source of truth)와 이로부터 계산되는 파생 상태를 분리함으로써, 각 상태의 역할과 책임이 분명해지기 때문입니다.

예를 들어, couponsState는 쿠폰 목록이라는 원본 데이터를 담고 있습니다. 이는 우리 애플리케이션의 핵심 상태 중 하나입니다. 그리고 couponValidityState는 각 쿠폰의 유효 여부를 나타내는 파생 상태입니다. 이 상태는 couponsState로부터 계산됩니다. 이렇게 상태를 분리하면, 각 상태의 소유권이 명확해집니다. couponsState는 쿠폰 목록을 관리하는 역할을 하고, couponValidityState는 쿠폰의 유효성을 계산하는 역할을 합니다.

물론, 파생 상태를 사용한다고 해서 모든 문제가 해결되는 것은 아닙니다. 파생 상태를 너무 많이 사용하면 오히려 코드가 복잡해질 수 있습니다.
하지만 복잡한 상태 관리가 필요한 상황에서, 파생 상태는 강력한 도구가 될 수 있습니다. 상태 간의 관계를 명확히 하고, 데이터 흐름을 예측 가능하게 만들어주기 때문입니다.

React에서 상태 관리는 끝이 없는 도전 과제입니다. 그래서 **"'상태 관리'를 어떻게하면 더 완벽하게 할 수 있을까?"**라는 질문 보다 **"결국 우리가 뭐하려고 하는거지?"**, **"누구에게 어떤 가치를 주는건가?"** 라는 질문을 던져보면 좋을 것 같습니다. 프론트엔드에서의 UI도, 성능도, 유지보수도, 확장성도, 테스트도 모든 것은 결국 사용자에게 가치를 전달하기 위한 수단일 뿐입니다. 그 가치를 전달하는데 **"가장 좋은 방법은 무엇일까?"** 이런 질문을 던져보면서, 상태 관리를 효과적으로 활용하는 방법을 찾아보는 것이 좋을 것 같습니다.
