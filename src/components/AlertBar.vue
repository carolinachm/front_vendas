<template>
  <v-layout row>
    <v-flex xs12 v-show="alerts.length > 0">
      <v-alert v-for="(alert, i) in alerts" :key="i" v-model="alert.show" :type="alert.type">
        {{alert.message}}
        <v-btn flat icon @click="close(i)">
          <v-icon color="white">close</v-icon>
        </v-btn>
      </v-alert>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    computed: {
      alerts() {
        return this.$store.state.alerts;
      }
    },
    methods: {
      close(i) {
        this.$store.commit('closeAlert', i);
      }
    }
  }

</script>
<style scoped>
  button.v-btn--icon {
    position: absolute;
    right: 0px;
    top: 3px;
  }

  .v-alert {
    border-radius: 10px;
    border: none;
  }

</style>
