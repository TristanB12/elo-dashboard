import { calculateElo } from "@/@core/utils/elo";
import { defineStore } from "pinia";
import api from "../supabase/api";

const useGamesStore = defineStore('games', {
  state: () => ({
    games: [],
  }),

  actions: {
    async fetchGames() {
      const response = await api.games.getAll();

      this.games = response;
    },
    async createGame(winner, loser, winnerScore, loserScore) {
 
      const [winnerPoints, loserPoints] = calculateElo(winner.elo_score, loser.elo_score);

      const game = {
        winner_id: winner.user_id,
        loser_id: loser.user_id,
        score: `${winnerScore}-${loserScore}`,
        winner_elo_won : winnerPoints,
        loser_elo_lost : loserPoints,
      }

      await api.games.create(game);
      await api.profiles.updateEloScore(winner.user_id, winner.elo_score + winnerPoints);
      await api.profiles.updateEloScore(loser.user_id, loser.elo_score + loserPoints);
    }
  },
});

export default useGamesStore;