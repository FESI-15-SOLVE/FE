import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function MyPage() {
  redirect(ROUTES.MY_PAGE.JOINED);
}
