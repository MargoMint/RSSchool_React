import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Layout from './Layout';
import Search from './Search';
import Api from '../utils/Api';
import ErrorBoundary from './ErrorBoundary';
import ResultsArea from './ResultsArea';
import type { Pokemon } from '../types/Pokemon';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/LocalStorageHook';

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const api = useMemo(() => new Api(), []);
  const requestCompleted = useRef(false);

  const fetchData = useCallback(
    (term: string) => {
      setIsLoading(true);
      setError(null);

      const trimmedQuery = term.trim();
      const dataPromise = trimmedQuery
        ? api.getPokemon(trimmedQuery)
        : api.getAllPokemons();

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
    },
    [api]
  );

  useEffect(() => {
    if (requestCompleted.current) return;
    requestCompleted.current = true;
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  const onSearch = (term: string) => {
    setSearchTerm(term);
    fetchData(term);
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
      <ErrorBoundary>
        <ResultsArea isLoading={isLoading} error={error} results={results} />
      </ErrorBoundary>
    </Layout>
  );
}

export default Main;
