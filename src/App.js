import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
    });
  }, []);
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="*" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
