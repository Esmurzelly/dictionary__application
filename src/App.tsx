import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import WordDetails from './pages/WordDetails';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Main />} />
      <Route path='/:word' element={<WordDetails />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
