import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // useLoaderData là một hook, dùng để tải dữ liệu cho một component trước khi nó được render
  //Data chính là hàm loader và được khai báo thuộc tính loader khi khai báo route`
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//Hàm loader Có thể đặt bất cứ đâu
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
