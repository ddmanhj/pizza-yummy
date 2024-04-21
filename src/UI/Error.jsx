import { Link } from 'react-router-dom';
import loader from '../assets/loader.png';

function NotFound() {
  //Lấy thông tin lỗi
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <img src={loader} alt="Pizza 404" className="mx-auto mb-6" />
        <h1 className="mb-4 text-5xl font-bold">Oops!</h1>
        <p className="mb-8 text-lg">{`Có sự nhầm lẫn ở đây!`}</p>
        <Link
          to="/"
          className="rounded bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-300"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
