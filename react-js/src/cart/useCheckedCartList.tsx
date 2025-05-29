import { useState, useCallback } from "react";

export function useCheckedCartList(initialCheckedList: number[] = []) {
  const [checkedList, setCheckedList] = useState<number[]>(initialCheckedList);

  const check = useCallback((cartId: number) => {
    setCheckedList((prev) => [...prev, cartId]);
  }, []);

  const uncheck = useCallback((cartId: number) => {
    setCheckedList((prev) => prev.filter((item) => item !== cartId));
  }, []);

  const toggle = useCallback(
    (cartId: number) => {
      if (checkedList.includes(cartId)) {
        uncheck(cartId);
      } else {
        check(cartId);
      }
    },
    [check, checkedList, uncheck]
  );

  const getIsChecked = useCallback(
    (cartId: number) => checkedList.includes(cartId),
    [checkedList]
  );

  return { checkedList, check, uncheck, toggle, getIsChecked };
}
