import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import DetailPanel from './components/DetailPanel';
import AboutPage from './pages/About';
import NotFoundPage from './pages/NotFoundPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<DetailPanel />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
