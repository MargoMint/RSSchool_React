import { Component } from 'react';
import type { CardListItem } from '../types/Card';

class Card extends Component<CardListItem> {
  render() {
    return (
      <div className="flex items-center justify-between border border-red-300 rounded-lg p-4 shadow">
        <p className="text-xl font-bold text-red-800">
          {this.props.name.toUpperCase()}
        </p>
        <p className="text-gray-700">{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
