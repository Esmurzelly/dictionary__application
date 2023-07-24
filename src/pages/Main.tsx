import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainContent from '@/components/MainContent';

const Main = () => {
    return (
        <div className="app flex flex-col min-h-screen p-5 bg-secondary dark:bg-primary dark:text-white">
            <div className='flex-1'>
                <NavBar />
                <MainContent />
            </div>
            <Contact />
            <Footer />

            <ToastContainer />
        </div>
    )
}

export default Main