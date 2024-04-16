export interface InputProps {
  placeholder: string;
}

export default function Input({ placeholder }: InputProps) {
  return <input placeholder={placeholder}></input>;
}
