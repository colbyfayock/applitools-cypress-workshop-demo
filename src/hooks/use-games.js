import { createContext, useContext } from 'react';

export const GamesContext = createContext();

export function useGames() {
  const games = useContext(GamesContext);
  return games;
}