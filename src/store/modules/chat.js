import Axios from "../store/http.js";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    addChat: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.request("/add/new/chat", {
          method: "post",
          data: payload
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 201) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getAllChats: ({ commit }) => {
      return new Promise((resolve, reject) => {
        Axios.request("/add/new/chat", {
          method: "get",
          params: {
            "email": localStorage.getItem("user.email");
          }
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 201) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addChat: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.request("/add/new/chat", {
          method: "post",
          data: payload
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 201) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addChat: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.request("/add/new/chat", {
          method: "post",
          data: payload
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 201) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  }
}