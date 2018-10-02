import Vue from 'vue';
import Vuex from 'vuex';

const showAlert = (state, msg, type) => {
  if (typeof msg != 'string' && msg.length && msg.length > 0) {
    for (let i = 0; i < msg.length; i++) {
      state.alerts.push({
        message: msg[i],
        type: type,
        show: true
      });
    }
  } else state.alerts.push({
    message: msg,
    type: type,
    show: true
  });

}

Vue.use(Vuex);

const store = new Vuex.Store({
  state: () => ({
    alerts: []
  }),
  mutations: {
    showAlertError(state, msg) {
      showAlert(state, msg, 'error')
    },
    showAlertWarning(state, msg) {
      showAlert(state, msg, 'warning')
    },
    showAlertSuccess(state, msg) {
      showAlert(state, msg, 'success')
    },
    closeAlert(state, i) {
      state.alerts.splice(i, 1);
    }
  }
});

export default store;
