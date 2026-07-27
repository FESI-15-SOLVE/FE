import { getPresignedUrlAction } from '@/actions/image/image-actions';

export async function uploadImage(
  file: File,
  folder: 'meetings' | 'users' | 'posts' = 'meetings'
): Promise<string> {
  const contentType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
  
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(contentType)) {
    throw new Error('지원하지 않는 이미지 형식입니다.');
  }

  // 1. 서버 액션을 통해 Presigned URL 발급
  const response = await getPresignedUrlAction({
    fileName: file.name,
    contentType,
    folder,
  });

  if (!response.success || !response.data) {
    throw new Error(response.message || '이미지 업로드 URL 발급에 실패했습니다.');
  }

  const { presignedUrl, publicUrl } = response.data;

  // 2. 발급받은 URL로 S3 다이렉트 업로드 (Client -> S3)
  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  // 3. 정상 업로드 시 저장된 퍼블릭 URL 반환
  return publicUrl;
}
