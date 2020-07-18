import Vue from "vue";
import Vuex from "vuex";
import Axios from "../store/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    login: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/user/login", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (status === 200 && data.token) {
              localStorage.setItem("token", JSON.stringify(data.token));
              resolve(true);
              // Fix User Not Found & Invalid Password Text
            } else if (status === 200 && data.response === "User not found") {
              reject(new Error("User Not Found!"), null);
            } else if (status === 200 && data.response === "Invalid Password") {
              reject(new Error("Invalid Password!"), null);
            } else {
              reject(new Error(data.response), null);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // Fix API Not returning an object
    register: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/user/create", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            if (
              status === 201 &&
              data.message === "Account created successfully"
            ) {
              resolve(true);
              // Fix Register Error Messages
            } else if (
              status === 201 &&
              data.message === "User already exists"
            ) {
              reject(new Error("User is already Registered!"), null);
            } else {
              reject(new Error(data.message), null);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    sendmail: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/user/send/verification/link", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 200 && data === "sent") {
              resolve(true);
            } else if (
              status === 200 &&
              // Fix Email Not Sent Message
              data === "User not registered"
            ) {
              reject(new Error("Email Could Not Be Sent!"), null);
            } else {
              reject(new Error(data), null);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    verifyemail: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/user/verifyemail", {
          method: "post",
          headers: { "Content-Type": "application/json; charset=utf8" },
          params: params
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 200 && data.message === "email is verified") {
              resolve(true);
            } else if (
              status === 200 &&
              data.message === "User not registered"
            ) {
              reject(new Error("User Not Registered!"), null);
            } else if (
              status === 200 &&
              // Fix Email Not Verified Message
              data.message === "User not registered"
            ) {
              reject(new Error("Email Not Verified!"), null);
            } else {
              reject(new Error(data.message), null);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateDetails: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        Axios.request("/user/updateDetails", {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=utf8",
            "Authorization": "JWT " + localStorage.getItem("token")
          },
          params: params
        })
          .then(({ data, status }) => {
            console.log(data);
            if (status === 200 && data.message === "Details Updated") {
              resolve(true);
            }
            //Fix Other Error Messages Handling
            //  else if (
            //   status === 200 &&
            //   data.message === "User not registered"
            // ) {
            //   reject(new Error("User Not Registered!"), null);
            // } else if (
            //   status === 200 &&
            //   // Fix Email Not Verified Message
            //   data.message === "User not registered"
            // ) {
            //   reject(new Error("Email Not Verified!"), null);
            // }
            else {
              reject(new Error(data.message), null);
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
