import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { Input } from 'antd';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../cart/EmptyCart';
import { clearCart, getCart } from '../cart/cartSlice';
import store from '../../store';
import { selectTotalCartPrice } from '../cart/cartSelectors';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submit';
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(selectTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const formErrors = useActionData();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="my-5 text-xl font-semibold">{`Sẵn sàng đặt hàng?`}</h2>

      {/*Form từ react-router-dom */}
      {/* <Form method="POST" action="order/new"> => Do router-dom nó tự nhận diện route gần nhất nên khoogn cần */}
      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-60">Họ tên</label>
          <Input
            className="input w-full grow rounded-lg py-2"
            prefix={<span>👔</span>}
            name="customer"
            required
            defaultValue={userName}
            allowClear
          />
        </div>

        <div className="mb-5 sm:flex-row sm:items-center ">
          <div className="flex items-center mobile:flex-col mobile:items-start">
            <label className="sm:basis-60">Số điện thoại</label>
            <div className="w-full">
              {/*Xem trong phần index.css, có khai báo @layer components đẻ dùng chung */}
              <Input
                className="input w-full  grow rounded-lg py-2"
                prefix={<span>📞</span>}
                name="phone"
                type="tel"
                required
                allowClear
              />
            </div>
          </div>
          {formErrors?.phone && (
            <p className=" mt-2 rounded-md bg-red-100 text-xs text-red-700 xl:ml-[11.5rem]">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex  flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-60">Địa chỉ</label>
          <div className="w-full grow">
            <Input
              className="input w-full  grow rounded-lg py-3"
              prefix={<span>🏠</span>}
              name="address"
              required
              key={address}
              defaultValue={address}
              disabled={isLoadingAddress}
              allowClear
            />
            {addressStatus === 'error' && (
              <p className=" mt-2 rounded-md bg-red-100 text-xs text-red-700 xl:ml-[11.5rem]">
                {errorAddress}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <span
              className={`absolute right-[5px] z-50 mobile:top-[45%] ${addressStatus === 'error' ? 'top-[6px] mobile:top-[33%]' : ''}`}
            >
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Lấy vị trí của bạn
              </Button>
            </span>
          )}
        </div>

        <div className="flex ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus:ring-off-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="ml-3" htmlFor="priority">
            Giao hàng hỏa tốc!
          </label>
        </div>

        <div className="my-5">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Đang đặt hàng...'
              : `Đặt hàng ngay ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  //Biến đổi data cho về thành Object dễ dàng
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Hãy điền số điện thoại của bạn!';
  if (Object.keys(errors).length > 0) return errors;

  //call API
  const newOrder = await createOrder(order);

  //Sau khi đặt hàng thì cần xóa hết giỏ hàng
  //-> Gọi thẳng store để xóa được trực tiếp
  //Nhưng sẽ bị giảm tối ưu hiệu năng
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
