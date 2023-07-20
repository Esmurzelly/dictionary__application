import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import WordDetails from './pages/WordDetails';
import NotFound from './pages/NotFound';
import Bookmarks from './pages/Bookmarks';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Main />} />
      <Route path='/bookmarks' element={<Bookmarks />} />
      {/* <Route path='/:word' element={<WordDetails />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
