import { Outlet } from "react-router-dom";
import Header from "./ui/Header/Header";
import Footer from "./ui/Footer";
import { SearchProvider } from "./context/searchContext";

function AppLayout() {
  return (
    <SearchProvider>
      <Header />
      <Outlet />
      <Footer />
    </SearchProvider>
  );
}

export default AppLayout;
