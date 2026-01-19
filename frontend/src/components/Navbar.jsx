import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-secondary p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-accent">Harish K</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-accent">Home</Link>
                    <Link to="/projects" className="hover:text-accent">Projects</Link>
                    <Link to="/contact" className="hover:text-accent">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
