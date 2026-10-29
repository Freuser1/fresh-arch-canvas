import Nav from './components/Nav.tsx';
import Hero from './components/Hero.tsx';
import Idea from './components/Idea.tsx';
import References from './components/References.tsx';
import Gallery from './components/Gallery.tsx';
import Drawings from './components/Drawings.tsx';
import Time from './components/Time.tsx';
import Materials from './components/Materials.tsx';
import Choice from './components/Choice.tsx';
import Closing from './components/Closing.tsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Idea />
        <References />
        <Gallery />
        <Drawings />
        <Time />
        <Materials />
        <Choice />
      </main>
      <Closing />
    </div>
  );
}
