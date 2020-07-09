import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    login: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/login", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (status === 200 && data.response === "Login successful") {
              localStorage.setItem("jwt-token", JSON.stringify(data.token));
              resolve(true);
            } else if (data.response !== "User not found") {
              throw new Error("User Not Found!");
            } else {
              throw new Error(data.response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    register: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/register", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (status === 200 && data.response === "Registered Successful") {
              resolve(true);
            } else if (data.response === "User already exists") {
              throw new Error("User is already Registered!");
            } else {
              throw new Error(data.response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //Fix Send Mail API Response
    sendmail: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/send", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    verifyemail: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/verifyemail", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (status === 200 && data.response !== "email not verified") {
              resolve(true);
            } else {
              throw new Error("Email Not Registered!");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    UPDATEDETAILS: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post("updateDetails", payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    SHOWDETAILS: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post("updateDetails", payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
