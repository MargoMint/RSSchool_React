import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Layout from './Layout';
import Search from './Search';
import Api from '../utils/Api';
import ErrorBoundary from './ErrorBoundary';
import ResultsArea from './ResultsArea';
import type { CardListItem } from '../types/Card';

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CardListItem[]>([]);
  const api = useMemo(() => new Api(), []);
  const requestCompleted = useRef(false);

  const fetchData = useCallback(
    (term: string) => {
      setIsLoading(true);
      setError(null);

      const trimmedQuery = term.trim();
      const request = trimmedQuery
        ? api.getPokemon(trimmedQuery)
        : api.getAllPokemons();

      request
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
          setResults([]);
        });
    },
    [api]
  );

  useEffect(() => {
    if (requestCompleted.current) return;
    requestCompleted.current = true;
    const savedTerm = localStorage.getItem('searchTerm') || '';
    fetchData(savedTerm);
  }, [fetchData]);

  const onSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    fetchData(term);
  };

  return (
    <Layout>
      <Search onSearch={onSearch} />
      <ErrorBoundary>
        <ResultsArea isLoading={isLoading} error={error} results={results} />
      </ErrorBoundary>
    </Layout>
  );
}

export default Main;
