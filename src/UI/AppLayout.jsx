import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

const AppLayout = () => {
  //useNavigation dùng để lấy trạng thái đang loading hay đã load xong
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    //auto_1fr_auto  tức là có 3 phần header, content, footer
    //=> Header là auto, content sẽ chiếm hết là 1fr, footer là auto => Điều này sẽ dẫn đến footer luôn nằm dưới cùdng
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="no-scroll overflow-scroll">
        <main className=" mx-auto max-w-3xl">
          {/*Ví dụ về <Outlet />:
                 Nếu bạn có một route cha /messages và một route con /messages/1,
                 khi người dùng truy cập vào /messages/1, thành phần Outlet trong thành phần Messages sẽ hiển thị nội dung của route con, tức là thành phần Chats */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
