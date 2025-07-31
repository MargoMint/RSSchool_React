import Layout from '../components/Layout';

function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-screen flex gap-5 items-center justify-center">
        <h2 className="font-extrabold text-red-800 text-3xl pr-5 border-r-4">
          404 Not Found
        </h2>
        <p>Oops, there is no such page</p>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
