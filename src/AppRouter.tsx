import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AboutPage from './pages/About';
import NotFoundPage from './pages/NotFoundPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
