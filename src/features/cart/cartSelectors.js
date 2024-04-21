import { createSelector } from '@reduxjs/toolkit';

/*Reselect là một thư viện JavaScript được sử dụng phổ biến trong các ứng dụng Redux 
để tối ưu hóa việc chọn lọc dữ liệu từ store và tính toán các giá trị dựa trên state của ứng dụng. 
Thư viện này giúp tạo ra các selector memoized, tức là chúng sẽ lưu kết quả của việc tính toán và chỉ tính toán lại khi các đầu vào của selector thay đổi.
*/

//Lấy data từ store redux, cart
const selectCart = (state) => state.cart.cart;

// selectCart là một selector đơn giản để lấy ra state của giỏ hàng.
//selectTotalCartQuantity và selectTotalCartPrice là các selector được tạo ra bằng createSelector để tính toán lại khi có thay đổi trong state.

//Đếm số lượng pizza có trong giỏ
export const selectTotalCartQuantity = createSelector([selectCart], (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

//Đếm tổng số tiền của giỏ
export const selectTotalCartPrice = createSelector([selectCart], (cart) =>
  cart.reduce((sum, item) => sum + item.totalPrice, 0),
);
