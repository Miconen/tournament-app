"use client";

import { Player } from "@/types/Player";
import { createContext, useEffect, useMemo, useState } from "react";
import useContextWrapper from "./hooks/TournamentContextHook";
import { getTournamentWithId } from "@/database/getTournament";
import { getTournamentPlayers } from "@/database/getTournamentPlayers";
import { useParams } from "next/navigation";
import Tournament from "@/types/Tournament";

// Source: https://medium.com/@nitinjha5121/mastering-react-context-with-typescript-a-comprehensive-tutorial-5bab5ef48a3b

interface TournamentContext {
  tournament: Tournament | undefined;
  setTournament: React.Dispatch<
    React.SetStateAction<TournamentContext["tournament"]>
  >;
  players: (Player | null)[];
  setPlayers: React.Dispatch<
    React.SetStateAction<TournamentContext["players"]>
  >;
  loading: boolean;
  setLoading: React.Dispatch<
    React.SetStateAction<TournamentContext["loading"]>
  >;
  activeRound: number;
  setActiveRound: React.Dispatch<
    React.SetStateAction<TournamentContext["activeRound"]>
  >;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<TournamentContext["hidden"]>>;
}

export const TournamentContext = createContext<TournamentContext | null>(null);

export function TournamentContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [tournament, setTournament] =
    useState<TournamentContext["tournament"]>();
  const [players, setPlayers] = useState<TournamentContext["players"]>([]);
  const [loading, setLoading] = useState<TournamentContext["loading"]>(true);
  const [activeRound, setActiveRound] =
    useState<TournamentContext["activeRound"]>(1);
  const [hidden, setHidden] = useState(true);
  const params = useParams();
  // Fetch players to context
  useEffect(() => {
    async function fetchTournamentData() {
      const tournamentResult = await getTournamentWithId(Number(params.id));

      if (!tournamentResult.success) {
        console.log("Error: " + tournamentResult.error);
        setLoading(false);
        return;
      }

      setTournament(tournamentResult.value);

      const tournamentId = Number(tournamentResult.value.id);
      const playerResult = await getTournamentPlayers(tournamentId);

      if (!playerResult.success) {
        console.log("Error: " + playerResult.error);
        setLoading(false);
        return;
      }

      setLoading(false);
      setPlayers(playerResult.value);
    }

    fetchTournamentData();
  }, [params.id]);

  const value = useMemo(
    () => ({
      tournament,
      setTournament,
      players,
      setPlayers,
      loading,
      setLoading,
      activeRound,
      setActiveRound,
      hidden,
      setHidden,
    }),
    [players, tournament, loading, activeRound, hidden],
  );

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournamentContext() {
  return useContextWrapper(TournamentContext, {
    contextName: useTournamentContext.name,
    providerName: TournamentContextProvider.name,
  });
}
