import("./Modal.css");
import("../App.css");

const Navbar = ({ show }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <a href="/Homer">Home</a>
          <a href="/Lista">Lista de atividades</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
