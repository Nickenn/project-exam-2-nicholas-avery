import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
