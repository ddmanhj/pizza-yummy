import { Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  //Gửi id của đơn hàng lên URL và sau đó sẽ fetch data theo id đơn hàng để tìm kiếm đơn đặt hàng
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit} className="mobile: w-50 my-2">
      <Input
        className="text-sm placeholder:text-stone-400"
        prefix={<span>🧾</span>}
        placeholder="Tìm kiếm đơn hàng..."
        allowClear
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
