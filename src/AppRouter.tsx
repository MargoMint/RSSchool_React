import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/About';
import NotFoundPage from './pages/NotFoundPage';
import Main from './components/Main';
import DetailPanel from './components/DetailPanel';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Main />}>
            <Route path="" element={<DetailPanel />} />
          </Route>
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
