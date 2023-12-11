import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages";
import Clients from "./pages/Clients";
import Dashboard from "./pages/dashboard";
import OrdersPage from "./pages/Orders";
import Products from "./pages/Products";
import ProfilePage from "./pages/Profile";
import Profits from "./pages/Profits";
import Settings from "./pages/Settings";
import MenuContextProvider from "./contexts/Menu";
import PlannerPage from "./pages/Planner";
import LoginPage from "./pages/LoginPage";
import PasswordPage from "./pages/PasswordPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import LoginContextProvider from "./contexts/LoginContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import EditPrd from './components/EditPrd/EditPrd.jsx'
import AddPrd from "./components/AddPrd/AddPrd.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "orders", element: <OrdersPage/> },
        { path: "clients", element: <Clients /> },
        { path: "profits", element: <Profits /> },
        { path: "planner", element: <PlannerPage /> },
        { path: "settings", element: <Settings /> },
        { path: "Profile", element: <ProfilePage /> },
        { path: "Products", element: <Products /> },
        { path: "edit/:id", element: <EditPrd /> },
        { path: "add", element: <AddPrd /> },
      ],
    },
    { path: "login", element: <LoginPage /> },
    { path: "passwordPage", element: <PasswordPage /> },
    { path: "register", element: <RegisterPage /> },
    {path: "*",element: <NotFound /> }
  ]);
  return (
    <Provider store={store}>
      <LoginContextProvider>
        <MenuContextProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </MenuContextProvider>
      </LoginContextProvider>
    </Provider>
  );
}

export default App;
