import("./Modal.css");
import("../App.css");

const Navbar = ({ show }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <a href="/">Home</a>
          <a href="/Lista">Lista de atividades</a>
          <a href="/Login">Login</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
