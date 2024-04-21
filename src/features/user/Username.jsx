import { useSelector } from 'react-redux';

function Username() {
  const userName = useSelector((state) => state.user.username);

  if (!userName) return null;
  return (
    <div className="text-sm font-semibold md:block mobile:my-2">{userName}</div>
  );
}

export default Username;
