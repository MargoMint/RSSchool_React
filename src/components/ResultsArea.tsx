import { Component } from 'react';
import CardList from './CardList';
import type { MainState } from '../types/MainState';

class ResultsArea extends Component<MainState> {
  render() {
    const { shouldThrow, isLoading, error, results } = this.props;

    if (shouldThrow) {
      throw new Error('Test Error');
    }
    if (isLoading) {
      return <p className="text-center text-red-800">Loading...</p>;
    }
    if (error) {
      return <p className="text-center text-red-800">{error}</p>;
    }

    return <CardList cardItems={results} />;
  }
}

export default ResultsArea;
