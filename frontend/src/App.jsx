import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckTicket from "./pages/CheckTicket";
import AdminDraw from "./pages/AdminDraw";
import Layout from "./layouts/Layout";
import Trams from "./pages/Trams";
import Results from "./pages/Results";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <Trams />
            </Layout>
          }
        />

        <Route
          path="/check"
          element={
            <Layout>
              <CheckTicket />
            </Layout>
          }
        />
        <Route
          path="/draw"
          element={
            <Layout>
              <Results />
            </Layout>
          }
        />
        <Route
          path="/premiumdrawmosquito"
          element={
            <Layout>
              <AdminDraw />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
