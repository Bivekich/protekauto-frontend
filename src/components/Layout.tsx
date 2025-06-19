import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="pt-[160px]">{children}</main>
  </>
);

export default Layout;