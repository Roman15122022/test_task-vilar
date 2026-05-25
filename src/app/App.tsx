import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layout/components/AppLayout";
import NotFoundPage from "@/app/pages/NotFoundPage";
import { routes } from "@/app/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
