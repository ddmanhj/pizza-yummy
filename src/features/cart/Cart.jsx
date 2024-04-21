import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import LinkButton from '../../UI/LinkButton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const userName = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Trở về menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Giỏ đồ của: {userName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Đặt hàng{' '}
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}

export default Cart;
