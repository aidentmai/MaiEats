const Navbar = () => {
  return (
    <div className="h-[100px] max-w-[1200px] mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold ml-4 primary-color">MaiEats</h1>
      <div className="flex space-x-2">
        <button className="p-4 ">Login</button>
        <button className="px-6 bg-primary-color text-white rounded">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
