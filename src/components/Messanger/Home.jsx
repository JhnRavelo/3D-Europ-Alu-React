import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Home = () => {
  return (
    <>
      <div className="chatOverlay"></div>
      <div className="homeChat">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
