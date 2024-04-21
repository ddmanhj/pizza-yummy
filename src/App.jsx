import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Error from './UI/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './UI/AppLayout';

// Sử dụng createBrowserRouter DOM History API để cập nhật URL và  loaders, actions, fetchers
const router = createBrowserRouter([
  {
    //Layout củas trang web
    element: <AppLayout />,
    //Thông báo lỗi khi fetch data hay nhập sai url....
    errorElement: <Error />,
    //chấp nhận nhiều tuyến đường khác => Sẽ được bao bọc nằm trong Layout
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        //Cung cấp data menu cho tuyến menu này
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOder />,
        //Do form nên dùng action
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

const App = () => {
  //Render ra các route mà đã khai báo tạo ở trên
  return <RouterProvider router={router} />;
};

export default App;
