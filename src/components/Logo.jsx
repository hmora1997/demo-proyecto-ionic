import LogoFoto from "../assets/c_garcia-logo.png";
const Logo = ({ children, redirect }) => {
  return (
    <a href={redirect}>
      
      <img
        src={LogoFoto}
        alt={children}
        className=" logo-header" 
      />
    </a>
  );
};

export default Logo;
