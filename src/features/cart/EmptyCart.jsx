import LinkButton from '../../UI/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Trở về menu</LinkButton>

      <p className="mt-7 font-semibold">
        Giỏ hàng của bạn đang trống. Hãy quay về đặt hàng!
      </p>
    </div>
  );
}

export default EmptyCart;
