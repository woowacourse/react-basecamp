function A() {
  B();
  C();
}

function B() {
  return 'B"';
}

function C() {
  return "C";
}

A();
