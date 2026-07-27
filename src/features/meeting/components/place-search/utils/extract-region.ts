/**
 * 카카오맵 주소(address_name)로부터 시/도 + 구/군 (예: "서울 강남구", "경기 성남시 분당구")을 추출하는 유틸리티
 */
export function extractRegion(address: string): string {
  if (!address) return '기타';
  const parts = address.trim().split(/\s+/);
  if (parts.length < 2) return address;

  const first = parts[0];
  const second = parts[1];

  if (parts.length >= 3 && second.endsWith('시') && parts[2].endsWith('구')) {
    return `${first} ${second} ${parts[2]}`;
  }

  return `${first} ${second}`;
}
