import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import Request from "./pages/request/Request";
import Transactions from "./pages/transactions/Transactions";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="app">
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" />
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="users" element={<ProtectedRoutes />}>
              <Route index element={<Admin />} />
            </Route>
            <Route path="transactions" element={<ProtectedRoutes />}>
              <Route index element={<Transactions />} />
            </Route>
            <Route path="requests" element={<ProtectedRoutes />}>
              <Route index element={<Request />} />
            </Route>
            <Route path="profile" element={<ProtectedRoutes />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
