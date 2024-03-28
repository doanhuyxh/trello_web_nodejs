import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./customRouters/privateRouter";
import UnauthorizeRoute from "./customRouters/unauthorizeRouter";

import LoginPage from "../screens/login";
import UserPage from "../screens/users/";
import ErrorPage from "../screens/error";
import { roles } from "../constants/role";

import LandingPage from "../screens/landingPage";
import UserInDepartment from "../screens/userInDepartment";
import Departments from "../screens/departments";
import IdeaDetail from "../screens/IdeaDetail";
import HomePage from "../screens/ideasList";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <UnauthorizeRoute>
              <LoginPage />
            </UnauthorizeRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute allowRoles={[roles.ADMIN]}>
              <UserPage />
            </PrivateRoute>
          }
        />
          <Route
              path="/ideas"
              element={
                  <PrivateRoute>
                      <HomePage />
                  </PrivateRoute>
              }
          />
          <Route
              path="/post/:id"
              element={
                  <PrivateRoute>
                      <IdeaDetail />
                  </PrivateRoute>
              }
          />
          <Route
              path="/departments"
              element={
                  <PrivateRoute allowRoles={[roles.ADMIN]}>
                      <Departments />
                  </PrivateRoute>
              }
          />
          <Route
              path="/departments/:department"
              element={
                  <PrivateRoute allowRoles={[roles.ADMIN]}>
                      <UserInDepartment />
                  </PrivateRoute>
              }
          />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
