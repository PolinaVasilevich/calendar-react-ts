import React from "react";

import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Event from "../pages/Event";
import Login from "../pages/Login";
import { publicRoutes, privateRoutes } from "../router";

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  const pubRoutes = publicRoutes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

  const privRoutes = privateRoutes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

  return (
    <Routes>
      {isAuth ? privRoutes : pubRoutes}
      <Route path="*" element={isAuth ? <Event /> : <Login />} />
    </Routes>
  );
};

export default AppRouter;
