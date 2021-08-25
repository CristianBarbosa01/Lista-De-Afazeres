import("../App.css");


const Navbar = ({ show }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <a href="/Home">Home</a>
          <a href="/Lista">Lista de atividades</a>
          <a href="/">Sair</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;