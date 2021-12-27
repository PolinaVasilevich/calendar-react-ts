import { Layout, Menu, Row } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../router";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const NavBar: FC = () => {
  const navigate = useNavigate();

  const goToPage = (route: string) => {
    return () => {
      navigate(route);
    };
  };

  const { logout } = useActions();

  const { isAuth, user } = useTypedSelector((state) => state.auth);

  const notAuthNavigation = (
    <Menu theme="dark" mode="horizontal" selectable={false}>
      <Menu.Item key="login" onClick={goToPage(RouteNames.LOGIN)}>
        Login
      </Menu.Item>
    </Menu>
  );

  const authNavigation = (
    <Row>
      <div style={{ color: "#fff" }}>{user.username}</div>
      <Menu theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="event" onClick={goToPage(RouteNames.EVENT)}>
          Event
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Row>
  );

  return (
    <Layout.Header>{isAuth ? authNavigation : notAuthNavigation}</Layout.Header>
  );
};

export default NavBar;
