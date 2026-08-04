import { updateMyProfileAction } from '@/actions/user/user-actions';
import { uploadImage } from '@/lib/upload-image';
import { unwrapAction } from '@/lib/safe-action';

export interface UpdateProfileParams {
  name: string;
  image?: File | string | null;
}

export async function updateProfile({ name, image }: UpdateProfileParams) {
  let imageUrl: string | undefined =
    typeof image === 'string' ? image : undefined;

  // File 객체인 경우 S3 다이렉트 업로드 실행
  if (image instanceof File) {
    imageUrl = await uploadImage(image, 'users');
  }

  // 서버 액션 호출 및 unwrapAction으로 결과 반환
  return unwrapAction(
    await updateMyProfileAction({
      name,
      image: imageUrl,
    }),
  );
}
