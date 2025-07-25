interface Abilities {
  ability: {
    name: string;
  };
}

export function formatAbilities(abilities: Abilities[]): string {
  return abilities.map((abilityItem) => abilityItem.ability.name).join(', ');
}
