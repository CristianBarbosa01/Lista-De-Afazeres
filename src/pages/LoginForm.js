import("./Log.css");

const LoginForm = () => {
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <div className="center">
        <h1 style={{marginLeft:"20px"}}>Login</h1>
        <form>
          <div style={{marginLeft:"20px"}} className="inputbox">
            <input type="text" required="required"></input>
            <span>Email</span>
          </div>
          <div style={{marginLeft:"20px"}} className="inputbox">
            <input type="password" required="required"></input>
            <span>Senha</span>
          </div>
          <div style={{marginLeft:"20px"}} className="inputbox">
            <input type="submit" value="Enviar"></input>
          </div>
          <div style={{marginLeft:"20px"}}>
            <p>
              Não tem conta?  <a href="/Cadastro"> Crie uma!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
