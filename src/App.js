import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import RentalService from "./pages/RentalService";
import Cart from "./pages/Cart";
import Gallery from "./pages/Gallery";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAdmin, adminView } = useSelector((state) => state);

  useEffect(() => {
    const localStr = localStorage.getItem("state");

    if (localStr) {
      try {
        const parsedState = JSON.parse(localStr);
        dispatch({ type: "reload", data: { ...parsedState } });
      } catch (error) {
        console.error("Error parsing localStorage state:", error);
      }
    }

    AOS.init({
      once: true,
      duration: 650,
    });

    const aosRefresh = setInterval(() => {
      AOS.refresh();
    }, 500);

    return () => {
      clearInterval(aosRefresh);
    };
  }, [dispatch]);

  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/#*" element={<Home />} />
        <Route path="/rental" element={<RentalService />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin && adminView ? <AdminPanel /> : <AdminLogin />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
