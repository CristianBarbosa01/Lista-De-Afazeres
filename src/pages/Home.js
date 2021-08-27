import bloco from "../image/bloco.png";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <img
        style={{ width: "80%", marginTop: 100 }}
        src={bloco}
        className="imagem"
      ></img>
    </div>
  );
};

export default Home;
