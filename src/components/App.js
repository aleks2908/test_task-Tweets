import "modern-normalize";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Home/Home";
import Tweets from "../pages/Tweets/Tweets";


// const Home = lazy(() => import("pages/Home"));
// const Tweets = lazy(() => import("pages/Tweets"));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

