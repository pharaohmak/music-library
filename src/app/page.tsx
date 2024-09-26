// pages/index.tsx
import { NextPage } from 'next';
import Nav from './components/Nav';
import Header from './components/Header';
import Highlights from './components/Highlights';
import Playlists from './components/Playlists';
import Footer from './components/Footer';
import Albums from './components/Albums';

const Home: NextPage = () => {
  return (
    <div className="font-sans text-gray-900">
      <Nav />
      <Header />
      <main>
        <Highlights />
        <Albums />
        <Playlists />
      </main>
      <Footer />
    </div>
  );
};

export default Home;