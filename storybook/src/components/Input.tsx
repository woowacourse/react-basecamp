import { useState } from "react";

export default function Input() {
  const [value, setValue] = useState<string>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <div>value:{value}</div>
    </>
  );
}
