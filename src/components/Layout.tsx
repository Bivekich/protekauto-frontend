import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import AuthModal from "./auth/AuthModal";
import MobileMenuBottomSection from "./MobileMenuBottomSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleAuthSuccess = (client: any, token?: string) => {
    // Сохраняем токен и пользователя в localStorage
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem('authToken', token);
      }
      localStorage.setItem('userData', JSON.stringify(client));
    }
    setAuthModalOpen(false);
    router.push('/profile-orders');
  };

  return (
    <>
    <header className="section-4">
      <Header onOpenAuthModal={() => setAuthModalOpen(true)} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      </header>
      <main className="pt-[132px]">{children}</main>
      <MobileMenuBottomSection onOpenAuthModal={() => setAuthModalOpen(true)} />
    </>
  );
};

export default Layout;