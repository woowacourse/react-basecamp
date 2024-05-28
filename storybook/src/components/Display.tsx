import Input, { InputProps } from './Input';

interface DisplayProps {
  inputProps: InputProps;
}

export default function Display({ inputProps }: DisplayProps) {
  return (
    <div>
      <Input placeholder={inputProps.placeholder}></Input>
    </div>
  );
}
