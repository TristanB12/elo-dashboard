import { defineStore } from "pinia";
import api from '@/plugins/supabase/api';


const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [],
  }),

  actions: {
    async fetchPlayers() {
      const response = await api.profiles.getAll();

      this.players = response;
    },
  },
});

export default usePlayersStore;