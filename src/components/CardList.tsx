import { Component } from 'react';
import Card from './Card';
import type { CardListItem } from '../types/Card';

interface CardListProps {
  cardItems: CardListItem[];
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="p-4 grid grid-cols-1 gap-2">
        {this.props.cardItems.map((item, i) => (
          <Card key={i} name={item.name} description={item.description} />
        ))}
      </div>
    );
  }
}

export default CardList;
