<<<<<<< HEAD
import { ChangeEvent, useState } from 'react';

const useInput = (initialValue: string = '') => {
=======
import { ChangeEvent, useState } from "react";

function useInput(initialValue: string = "") {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
<<<<<<< HEAD
};
=======
}
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

export default useInput;
