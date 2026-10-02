import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import FrontHeader from "./header/FrontHeader";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <FrontHeader/>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;