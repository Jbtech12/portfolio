import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import About from './pages/About';
import DarkModeToggle from './components/DarkModeToggle';
import BookCallDock from './components/BookCallDock';

function App() {
  return (
    <>
      <DarkModeToggle />
      <BookCallDock />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
    </>
  );
}

export default App;
