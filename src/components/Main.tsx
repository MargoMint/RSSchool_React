import Layout from './Layout';
import Search from './Search';
import ErrorBoundary from './ErrorBoundary';
import ResultsArea from './ResultsArea';
import { Link, useSearchParams, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import getValidPage from '../utils/getValidPage';
import Flyout from './Flyout';
import { useGetPokemonQuery, useGetAllPokemonsQuery } from '../api/pokemonApi';
import Card from './Card';
import StatusMessage from './StatusMessage';

function Main() {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = getValidPage(searchParams);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const trimmedQuery = searchTerm.trim();

  const {
    data: pokemonData,
    isLoading,
    error,
    refetch: refetchPokemon,
  } = useGetPokemonQuery(trimmedQuery, { skip: trimmedQuery === '' });

  const {
    data: allPokemonsData,
    isLoading: isAllLoading,
    error: allError,
    refetch: refetchAllPokemons,
  } = useGetAllPokemonsQuery({ offset, limit }, { skip: trimmedQuery !== '' });

  const displayError = trimmedQuery ? error : allError;
  const displayLoading = trimmedQuery ? isLoading : isAllLoading;

  const handleCardClick = (name: string) => {
    searchParams.set('details', name);
    setSearchParams(searchParams);
  };

  const onSearch = (term: string) => {
    const trimmed = term.trim();
    setSearchTerm(trimmed);
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

      <div className="flex gap-1 justify-center items-center">
        <Search onSearch={onSearch} />
        <Button
          title="Refresh"
          variant="neutral"
          onClick={() => {
            if (trimmedQuery) {
              refetchPokemon();
            } else {
              refetchAllPokemons();
            }
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-14">
        <div className="md:w-2/3">
          <ErrorBoundary>
            {trimmedQuery ? (
              displayLoading || displayError ? (
                <StatusMessage
                  isLoading={displayLoading}
                  error={displayError ? displayError.toString() : null}
                />
              ) : pokemonData ? (
                <div className="p-4 grid grid-cols-1 gap-2">
                  <Card pokemon={pokemonData} onCardClick={handleCardClick} />
                </div>
              ) : null
            ) : (
              <ResultsArea
                isLoading={displayLoading}
                error={displayError ? displayError.toString() : null}
                results={allPokemonsData || []}
                onCardClick={handleCardClick}
              />
            )}
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
                variant={'primary'}
                onClick={() =>
                  setSearchParams({ page: (currentPage + 1).toString() })
                }
              />
            </div>
          )}
        </div>
        <Outlet />
      </div>

      <Flyout />
    </Layout>
  );
}

export default Main;
