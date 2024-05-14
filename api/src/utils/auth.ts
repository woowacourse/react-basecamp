// 사용자 아이디와 비밀번호를 입력받아 Basic 인증 토큰을 생성
export function generateBasicToken(
  userId: string,
  userPassword: string
): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
