// store/index.js
 
import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    someGames: [],
    moreGames: [],
    hottestGames: [],
    gamesForSale: [],
    users: [],
    currentBasket: [],
    currentGame: {},
    currentUser: {},
    currendUserId: "",
    currentUserFirstName: "",
    currentUserLastName: "",
  },
  mutations: {
    fetchSomeGames(state, data) {
      state.someGames = data;
    },
    fetchMoreGames(state, data) {
      state.moreGames = data;
    },
    fetchGamesForSale(state, data) {
      state.gamesForSale = data;
    },
    fetchUsers(state, data) {
      state.users = data;
    },
    fetchHottestGames(state, data) {
      state.hottestGames = data;
    },
  },
  actions: {
    fetchSomeGames({ commit }) {
      axios('http://localhost:5000/someGames').then( res => {
        commit('fetchSomeGames', res.data);
      })
    },

    fetchMoreGames({ commit }) {
      try {
        axios('http://localhost:5000/moreGames').then( res => {
        commit('fetchMoreGames', res.data);
      })
      } catch (err) {
        console.log(err);
      }
    },

    fetchGamesForSale({ commit }) {
      axios('http://localhost:5000/gamesForSale').then( response => {
        commit('fetchGamesForSale', response.data);
      })
    },

    fetchHottestGames({ commit }) {
      axios('http://localhost:5000/hottestGames').then( response => {
        console.log('Hottest: ', response.data);
        commit('fetchHottestGames', response.data);
      })
    },

    fetchUsers({ commit }) {
      try {
        axios('http://localhost:5000/users').then( response => {
          console.log('Users: ', response.data);
          commit('fetchUsers', response.data);
        })
      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {
    //
  }
})
