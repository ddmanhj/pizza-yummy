import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { isEmpty } from 'lodash';

function Home() {
  const userName = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        Pizza 🍕🍕🍕
        <br />
        <span className="text-yellow-500">Tuyệt vời trên từng miếng 🍕</span>
      </h1>

      {isEmpty(userName) ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Hãy tiếp tục đặt hàng nhé!, {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
