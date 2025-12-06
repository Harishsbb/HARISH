import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects'; // Projects page
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

import Footer from './components/Footer';

function App() {
    console.log('App rendering...');
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-slate-900 text-white">


                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
