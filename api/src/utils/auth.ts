export function generateBasicToken(
  userId: string,
  userPassword: string
): string {
  // btoa: base64로 인코딩하는 함수
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
