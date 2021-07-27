import bloco from "../image/bloco.png";

import("./cad.css");

const Cadastro = () => {
  return (
    <div style={{ overflow:"auto", display:"flex", justifyContent:"center"}}>
      <div className="center2">
        <h1 className="nome" style={{marginLeft:"20px"}}>Cadastro</h1>
        <form>
        <div style={{marginLeft:"20px", marginTop:"-20px"}} className="inputbox2">
            <input type="text" required="required"></input>
            <span>Nome</span>
          </div>
          <div style={{marginLeft:"20px", marginTop:"-20px"}} className="inputbox2">
            <input type="text" required="required"></input>
            <span>Email</span>
          </div>
          <div style={{marginLeft:"20px", marginTop:"-20px"}} className="inputbox2">
            <input type="password" required="required"></input>
            <span>Senha</span>
          </div>
          <div style={{marginLeft:"20px", marginTop:"-20px"}} className="inputbox2">
            <input type="password" required="required"></input>
            <span>Confirmar senha</span>
          </div>
          <div style={{marginLeft:"20px", marginTop:"-20px"}} className="inputbox2">
            <input type="button" value="submit"></input>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Cadastro;
