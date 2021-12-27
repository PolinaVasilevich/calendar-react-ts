import React from "react";
import Event from "../pages/Event";
import Login from "../pages/Login";

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export enum RouteNames {
  HOME = "/",
  LOGIN = "/login",
  EVENT = "/event",
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    element: <Login />,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.EVENT,
    element: <Event />,
  },
];
