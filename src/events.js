export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      window.getApp.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      this.$router.push({ path: '/' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      localStorage.removeItem('loggedUser');
      window.getApp.loggedUser = null;
      this.$router.replace({ path: '/' });
    }
  }

];
