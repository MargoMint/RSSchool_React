import Layout from '../../components/Layout';
import { useTranslations } from 'next-intl';

function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <Layout>
      <div className="min-h-screen flex gap-5 items-center justify-center">
        <h2 className="font-extrabold text-red-800 text-3xl pr-5 border-r-4 border-red-800">
          404 Not Found
        </h2>
        <p>{t('mainMessage')}</p>
      </div>
    </Layout>
  );
}

export default NotFound;
