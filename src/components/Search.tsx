import React, { Component } from 'react';
import Button from './Button';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { inputValue: '' };
  }

  componentDidMount(): void {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
      this.setState({ inputValue: savedTerm });
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    this.props.onSearch(trimmed);
    localStorage.setItem('searchTerm', trimmed);
  };

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') this.handleSearch();
  };

  render() {
    return (
      <div className="flex gap-4 justify-center items-center p-4">
        <input
          type="text"
          className="border border-gray-400 rounded-lg px-4 py-2 w-64"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <Button onClick={this.handleSearch}>Search</Button>
      </div>
    );
  }
}

export default Search;
