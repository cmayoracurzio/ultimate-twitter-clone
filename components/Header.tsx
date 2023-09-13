const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="sticky top-0 text-2xl font-bold p-6 backdrop-blur border-b border-gray-600">
      {children}
    </h1>
  );
};

export default Header;
