import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    IdSymbols: [],
    coins: [],
    totalMarketCap: 0,
    total24HrVolume: 0,
    totalBTCPercentage: 0,
    loading: false,
    exchanges: [],
    one_year: JSON.parse(localStorage.getItem('one_year')),
    load: false,
    statItems: [{number: 100, text: "CryptoCurrencies", id: 1}, {number: 50, text: "Exchange marketplaces", id: 2}, {number: 40, text: "Coffee drinked", id: 3}, {number: 2100, text: "Code Lines Written", id: 4}, {number:15, text:"Bugs Killed", id: 5}, {number:12, text:"Water Bottles Drinked", id: 6},]
  },
  mutations: {
    UPDATE_SLUGS(state, payload) {
      state.IdSymbols = payload.data.coins;
    },
    UPDATE_COINS(state, payload) {
        var coinsArray = payload.data.data;
        state.coins= coinsArray;
      //state.coins = coinsArray.sort((a,b) => a.cmc_rank - b.cmc_rank);
    },
    UPDATE_MARKET_DATA(state, payload) {
      const data = payload.data.data;
      const quotes = data.quote;

      state.totalMarketCap = quotes.USD.total_market_cap;
      state.total24HrVolume = quotes.USD.total_volume_24h;
      state.totalBTCPercentage = data.btc_dominance;
    },
    UPDATE_COINS_GRAPH(state, payload)
    { 
      var justPriceData = [];
      var hashmap = payload[0];
        //Déclaration des multiples var
      for( const [data, dataValue] of Object.entries(hashmap.one_year) )
      {
          var newValue = parseFloat(dataValue.price, 10);
          if (newValue > 1 && newValue < 10)
            newValue = newValue.toFixed(2);
          else if (newValue > 10)
            newValue =  newValue.toFixed(0);

          var newKey = dataValue.timestamp;
          var tableau = [newKey, newValue];
          justPriceData.push(newValue);
          hashmap.one_year[data] = tableau;
      }
      var newData = Math.max(...justPriceData);
      if (newData > 1 && newData < 10)
        newData = newData.toFixed(4);
      else if (newData > 10)
        newData = newData.toFixed(2);
      state.one_year = { data : hashmap.one_year, label : newData };
      localStorage.setItem("one_year",JSON.stringify(state.one_year));
    },
    UPDATE_EXCHANGE_DATA(state, payload) {
      var data = payload.data;
      state.exchanges = data;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_LOAD(state, payload) {
      state.load = payload;
    }
  },
  actions: {
    getCoins({commit}) {
      commit('SET_LOADING', true);
      axios.get('/api/coins').then((response) => {
        commit('UPDATE_COINS', response);
        commit('SET_LOADING', false);
      });
    },
    getCoinsId({commit}) {
      
      axios.get('/api/coinsId').then((response) => {
        commit('UPDATE_SLUGS', response.data);
      });
    },
    getCoinGraphData({commit}, id) {
      commit('SET_LOAD', true);
      axios.get('/api/coins_graph' + "?id=" + id).then((response) => {
        commit('UPDATE_COINS_GRAPH', response.data);
        commit('SET_LOAD', false);
      });
    },
    getMarketData({commit}) {
      axios.get('/api/market_data').then((response) => {
        commit('UPDATE_MARKET_DATA', response);
      });
    },
    getExchangeData({commit}){
      axios.get('/api/exchange_data').then((response) => {
        commit('UPDATE_EXCHANGE_DATA', response);
      });
    }
  },
  getters: {
    coins: state => state.coins,
    exchanges: state => state.exchanges,
    loading: state => state.loading,
    totalMarketCap: state => state.totalMarketCap,
    total24HrVolume: state => state.total24HrVolume,
    totalBTCPercentage: state => state.totalBTCPercentage,
    coinDataFromSlug: (state) => (slug) => {
      return state.coins.find( coin => coin.slug === slug );
    },
    exchangeDataFromName: (state) => (name) => {
      return state.exchanges.find( exchange => exchange.name === name );
    },
    coinChartData: state => {
      return state.one_year;
    },
    idCoin: (state) => (symbol) =>
    {
      var money = state.IdSymbols.find( coin => coin.symbol === symbol );
      return money.id;
    },

    justPriceData: state => state.justPriceData,
    load: state => state.load,
    statItems: state => state.statItems
  }
})