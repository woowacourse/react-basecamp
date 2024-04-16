interface DisplayProps {
  placeholder: string;
}

export default function Display({ placeholder }: DisplayProps) {
  return <input placeholder={placeholder}></input>;
}
