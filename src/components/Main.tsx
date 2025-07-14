import { Component } from 'react';
import Button from './Button';
import { Layout } from './Layout';
import Search from './Search';
import Api from '../utils/Api';
import type { MainState } from '../types/MainState';
import { ErrorBoundary } from './ErrorBoundary';
import ResultsArea from './ResultsArea';
class Main extends Component<object, MainState> {
  private api: Api;

  constructor(props: object) {
    super(props);
    this.state = {
      shouldThrow: false,
      isLoading: false,
      error: null,
      results: [],
    };
    this.api = new Api();
  }

  componentDidMount(): void {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.fetchData(savedTerm);
  }

  fetchData = (term: string) => {
    this.setState({ isLoading: true, error: null });
    const trimmedQuery = term.trim();
    const request = trimmedQuery
      ? this.api.getPokemon(trimmedQuery)
      : this.api.getAllPokemons();
    request
      .then((data) => this.setState({ results: data, isLoading: false }))
      .catch((error) =>
        this.setState({ error: error.message, isLoading: false, results: [] })
      );
  };

  handleErrorReset = () => {
    this.setState({ shouldThrow: false });
  };

  onSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.fetchData(term);
  };

  render() {
    return (
      <Layout>
        <Search onSearch={this.onSearch} />
        <ErrorBoundary onReset={this.handleErrorReset}>
          <ResultsArea
            shouldThrow={this.state.shouldThrow}
            isLoading={this.state.isLoading}
            error={this.state.error}
            results={this.state.results}
          />
          <div className="flex justify-center pt-2 border-t-4 border-red-800 mt-4">
            <Button onClick={() => this.setState({ shouldThrow: true })}>
              Throw Error
            </Button>
          </div>
        </ErrorBoundary>
      </Layout>
    );
  }
}

export default Main;
