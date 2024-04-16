interface Props {
  value: string;
  onChange: () => void;
}

export default function Input({ value, onChange }: Props) {
  return <input type='text' value={value} onChange={onChange} />;
}
