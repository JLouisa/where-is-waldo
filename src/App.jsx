import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import "./styles/App.css";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
