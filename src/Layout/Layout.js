import Navigation from "../Components/Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
      <footer></footer>
    </div>
  );
};

export default Layout;
