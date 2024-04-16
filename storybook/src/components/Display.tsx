import Input from "./Input";

export default function Display() {
  return (
    <div>
      <div>
        <p>카드 번호</p>
        <Input placeholder={"1234"} />
        <Input placeholder={"1234"} />
        <Input placeholder={"1234"} />
        <Input placeholder={"1234"} />
      </div>
    </div>
  );
}
