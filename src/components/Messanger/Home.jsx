import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Home = () => {
  return (
    <>
      <div className="chatOverlay"></div>
      <main className="homeChat">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </main>
    </>
  );
};

export default Home;
