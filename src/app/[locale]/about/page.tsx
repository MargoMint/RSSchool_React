import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import { Link } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';

function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <Layout>
      <div className="text-center space-y-4">
        <h2 className="text-xl font-extrabold text-red-800 uppercase mt-2">
          {t('pageTitle')}
        </h2>

        <p>{t('mainDescription')}</p>

        <p>
          {t('secondDescription')}{' '}
          <a
            className="text-red-700 hover:underline"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React Course
          </a>
        </p>

        <div className="text-center mt-8">
          <Link href="/">
            <Button title={t('back')} variant="outline" />
          </Link>
        </div>

        <p className="border-t border-gray-300 w-1/2 mx-auto pt-4">
          <a
            className="text-red-700 font-medium underline"
            href="https://github.com/MargoMint"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('author')}
          </a>
        </p>
      </div>
    </Layout>
  );
}

export default AboutPage;
