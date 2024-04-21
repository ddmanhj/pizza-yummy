import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="font-pizza mobile:flex-col flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-4">
      <Link to="/" className="mobile:my-2 tracking-widest">
        Pizza Yummy 🍕
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
