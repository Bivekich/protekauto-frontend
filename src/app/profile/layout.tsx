import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');

  if (!token) {
    redirect('/');
  }

  return <>{children}</>;
}
