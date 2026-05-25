import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import AppLayout from "@/layout/components/AppLayout";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import { routes } from "@/app/routes";

function App(): ReactElement {
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
