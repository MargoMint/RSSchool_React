export interface Pokemon {
  image: string;
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  description: string;
}

export interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}
