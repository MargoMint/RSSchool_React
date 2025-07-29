import Header from '../components/Header';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Layout>
      <Header />
      <div className="text-center space-y-4">
        <h2 className="text-xl font-extrabold text-red-800 uppercase mt-2">
          About the App Page
        </h2>

        <p>
          Hey there! I&apos;m Rita, a frontend developer with a love for web
          technologies and Pokemon. This Pokemon search tool is a personal
          project to practice React and have some fun along the way. I hope you
          find it useful — or at least nostalgic. Thanks for stopping by!
        </p>

        <p>
          This app was built as part of the{' '}
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
          <Link to="/">
            <Button title="Back to Home" variant="outline" />
          </Link>
        </div>

        <p className="border-t border-gray-300 w-1/2 mx-auto pt-4">
          <a
            className="text-red-700 font-medium underline"
            href="https://github.com/MargoMint"
            target="_blank"
            rel="noopener noreferrer"
          >
            Author: Marharyta (MargoMint)
          </a>
        </p>
      </div>
    </Layout>
  );
}

export default AboutPage;
