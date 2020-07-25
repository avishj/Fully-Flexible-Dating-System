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
              localStorage.setItem("user.name", JSON.stringify(data.user.name));
              localStorage.setItem(
                "user.phone",
                JSON.stringify(data.user.phone)
              );
              localStorage.setItem(
                "user.branch",
                JSON.stringify(data.user.branch)
              );
              localStorage.setItem(
                "user.firstLogin",
                JSON.stringify(data.user.firstLogin)
              );
              localStorage.setItem(
                "user.gender",
                JSON.stringify(data.user.gender)
              );
              localStorage.setItem("user.bio", JSON.stringify(data.user.bio));
              localStorage.setItem("user._id", JSON.stringify(data.user._id));
              localStorage.setItem("user.year", JSON.stringify(data.user.year));
              localStorage.setItem("user.slot", JSON.stringify(data.user.slot));
              // Add User Image
              // localStorage.setItem("user.image", JSON.stringify(data.user.image));
              resolve(true);
              // Fix User Not Found & Invalid Password Text
            } else if (
              status === 400 &&
              data.response === "User not registered"
            ) {
              reject(new Error("User Not Found!"), null);
            } else if (
              status === 401 &&
              data.response === "email not verified"
            ) {
              reject(
                new Error(
                  "Email has not been verified! Please Verify to login!"
                ),
                null
              );
            }
            // Fix Invalid Password Status & Message
            else if (status === 403 && data.response === "invalid password") {
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
              status === 401 &&
              // Fix Email Not Verified Message
              data.message === "Email not verified"
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
    //Fix Expectations body req not being sent.
    updateDetails: ({ commit }, params, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post("/user/updateDetails", payload, {
          headers: {
            "Content-Type": "application/json; charset=utf8",
            Authorization: "JWT " + localStorage.getItem("token")
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
