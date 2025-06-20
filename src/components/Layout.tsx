import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="pt-[132px]">{children}</main>
  </>
);

export default Layout;