import type { Database } from '../types/CountryDataTypes';

let data: Database | null = null;
let promise: Promise<void> | null = null;

export function useData(): Database {
  if (data) return data;
  if (!promise) {
    promise = fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    )
      .then((response) => response.json())
      .then((json: Database) => {
        data = json;
      })
      .catch(() => {
        console.log('Failed to load data:');
        promise = null;
      });
  }
  throw promise;
}
