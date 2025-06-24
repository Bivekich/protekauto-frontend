import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { GET_CLIENT_ME } from '@/lib/graphql';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogSubscribe from '@/components/CatalogSubscribe';
import MobileMenuBottomSection from "@/components/MobileMenuBottomSection";
import LKMenu from '@/components/LKMenu';
import ProfileBalanceMain from '@/components/profile/ProfileBalanceMain';
import ProfileInfo from '@/components/profile/ProfileInfo';

const ProfileBalancePage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { data: clientData, loading: clientLoading } = useQuery(GET_CLIENT_ME, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      // Проверяем есть ли у клиента юридические лица
      if (!data?.clientMe?.legalEntities?.length) {
        // Если нет юридических лиц, перенаправляем на настройки
        router.push('/profile-settings?tab=legal');
        return;
      }
    },
    onError: (error) => {
      console.error('Ошибка загрузки данных клиента:', error);
      // Если ошибка авторизации, перенаправляем на главную
      router.push('/');
    }
  });

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/');
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  // Показываем загрузку пока проверяем авторизацию и данные
  if (!isAuthenticated || clientLoading) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <div className="mt-4 text-gray-600">Загрузка...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <ProfileInfo />
      <div className="flex flex-col px-32 pt-10 pb-16 max-md:px-5">
        <div className="flex relative gap-8 items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-4">
          <LKMenu />
          <ProfileBalanceMain />
        </div>
      </div>
      <section className="section-3">
        <CatalogSubscribe />
      </section>
      <MobileMenuBottomSection />
      <Footer />
    </div>
  );
};

export default ProfileBalancePage;
