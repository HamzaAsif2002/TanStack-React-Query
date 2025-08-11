import { Outlet } from "react-router";
import { Footer } from "./UI/Footer";
import { Header } from "./UI/Header";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
