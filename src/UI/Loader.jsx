import loader from '../assets/loader.png';

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm ">
      <div className="relative h-32 w-32">
        <img
          src={loader}
          className="absolute inset-0 m-auto h-16 w-16 animate-spin"
          alt="Pizza Loader"
        />
        <div className="absolute inset-0 rounded-full border-8 border-yellow-400"></div>
      </div>
    </div>
  );
}

export default Loader;
