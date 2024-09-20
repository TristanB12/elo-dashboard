import { defineStore } from "pinia";
import { supabase } from "../supabase/client";
import usePlayersStore from "./players";

const useSessionStore = defineStore('session', {
  state: () => ({
    access_token: null,
    refresh_token: null,
    expires_at: null,
    user: null,
  }),

  getters: {
    isAuthenticated() {
      return !!this.access_token;
    },
    isTokenExpired() {
      return (this.expires_at * 1000) < Date.now();
    }
  },

  actions: {
    setSession(session, user) {
      this.access_token = session.access_token;
      this.refresh_token = session.refresh_token;
      this.expires_at = session.expires_at;
      this.user = user;

      
      localStorage.setItem('session', JSON.stringify(session));
    },
    clearSession() {
      this.access_token = null;
      this.refresh_token = null;

      supabase.auth.signOut();
      localStorage.removeItem('session');
    },
    async loadSession() {
      const session = JSON.parse(localStorage.getItem('session'));

      if (session) {
        this.setSession(session);
        if (this.isTokenExpired) {
          this.refreshSession()
        } else {
          await this.fetchAll();
        }
      }
    },
    async fetchUser() {
      const response = await supabase.auth.getUser(this.access_token);

      if (response.error) {
        this.clearSession();
      } else {
        this.user = response.data.user;
      }
    },
    async refreshSession() {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        this.clearSession();
      } else {
        const { session, user } = data;
        this.setSession(session, user);
      }
    },
    async fetchAll() {
      const playersStore = usePlayersStore();

      await this.fetchUser();
      await playersStore.fetchPlayers();
    }
  }
})

export default useSessionStore;
