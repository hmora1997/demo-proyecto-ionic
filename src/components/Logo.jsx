import LogoFoto from "../assets/logo-cbs.png";
const Logo = ({ children, redirect }) => {
  return (
    <a href={redirect}>
      
      <img
        src={LogoFoto}
        alt={children}
        className="ms-3 logo-header" // Asegúrate de que la clase logo-header esté definida en tu CSS
      />
    </a>
  );
};

export default Logo;
