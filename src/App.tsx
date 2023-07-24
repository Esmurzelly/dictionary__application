import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Main />} />
      <Route path='/bookmarks' element={<Bookmarks />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
