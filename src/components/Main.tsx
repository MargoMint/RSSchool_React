import { useEffect, useState, useCallback, useMemo } from 'react';
import Layout from './Layout';
import Search from './Search';
import Api from '../utils/Api';
import ErrorBoundary from './ErrorBoundary';
import ResultsArea from './ResultsArea';
import type { Pokemon } from '../types/Pokemon';
import { Link, useSearchParams, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import getValidPage from '../utils/getValidPage';

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const api = useMemo(() => new Api(), []);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = getValidPage(searchParams);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const handleCardClick = (name: string) => {
    searchParams.set('details', name);
    setSearchParams(searchParams);
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const trimmedQuery = searchTerm.trim();
    const dataPromise = trimmedQuery
      ? api.getPokemon(trimmedQuery)
      : api.getAllPokemons(offset, limit);

    dataPromise
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        setError(err.message);
        setResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [api, searchTerm, offset, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSearch = (term: string) => {
    const trimmedQuery = term.trim();
    setSearchTerm(trimmedQuery);
    setSearchParams({ page: '1' });
  };

  return (
    <Layout>
      <div className="text-center">
        Curious about who created this Pokemon search app? Visit the
        <Link to={'/about'}>
          <p className="text-red-700 font-medium hover:underline">About Page</p>
        </Link>
      </div>

      <Search onSearch={onSearch} />

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <ErrorBoundary>
            <ResultsArea
              isLoading={isLoading}
              error={error}
              results={results}
              onCardClick={handleCardClick}
            />
          </ErrorBoundary>

          {!searchTerm && (
            <div className="flex justify-center gap-4 my-6">
              <Button
                title="Prev"
                variant="outline"
                onClick={() => {
                  if (currentPage > 1) {
                    setSearchParams({ page: (currentPage - 1).toString() });
                  }
                }}
              />
              <Button
                title="Next"
                variant="primary"
                onClick={() =>
                  setSearchParams({ page: (currentPage + 1).toString() })
                }
              />
            </div>
          )}
        </div>

        <Outlet context={{ api }} />
      </div>
    </Layout>
  );
}

export default Main;
