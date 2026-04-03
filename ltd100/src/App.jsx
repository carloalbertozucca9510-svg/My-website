import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import CurrentDrop from './components/CurrentDrop';
import Vault from './components/Vault';
import About from './components/About';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <CurrentDrop />
        <Vault />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
