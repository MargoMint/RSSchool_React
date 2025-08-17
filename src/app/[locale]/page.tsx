'use client';

import Layout from '../../components/Layout';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import ResultsArea from '../../components/ResultsArea';
import { Link } from '../../i18n/navigation';
import { useSearchParams, useRouter } from 'next/navigation';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from '../../components/Button';
import getValidPage from '../../utils/getValidPage';
import Flyout from '../../components/Flyout';
import {
  useGetPokemonQuery,
  useGetAllPokemonsQuery,
} from '../../api/pokemonApi';
import Card from '../../components/Card';
import StatusMessage from '../../components/StatusMessage';
import DetailPanel from '../../components/DetailPanel';
import { useTranslations } from 'next-intl';

function Main() {
  const t = useTranslations('HomePage');
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const searchParams = useSearchParams();
  const router = useRouter();
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
    const params = new URLSearchParams(searchParams);
    params.set('details', name);
    router.push(`?${params.toString()}`);
  };

  const onSearch = (term: string) => {
    const trimmed = term.trim();
    setSearchTerm(trimmed);
    router.push(`?page=1`);
  };

  return (
    <>
      <Layout>
        <div className="text-center">
          {t('aboutDescr')}
          <Link href="/about">
            <p className="text-red-700 font-medium hover:underline">
              {t('about')}
            </p>
          </Link>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <Search onSearch={onSearch} />
          <Button
            title={t('refresh')}
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
                  title={t('prev')}
                  variant="outline"
                  onClick={() => {
                    if (currentPage > 1) {
                      router.push(`?page=${currentPage - 1}`);
                    }
                  }}
                />
                <Button
                  title={t('next')}
                  variant={'primary'}
                  onClick={() => router.push(`?page=${currentPage + 1}`)}
                />
              </div>
            )}
          </div>
          <DetailPanel />
        </div>
        <Flyout />
      </Layout>
    </>
  );
}

export default Main;
