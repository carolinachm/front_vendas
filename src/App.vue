<template>
  <div>
    <v-app id="inspire">

      <drawer-menu></drawer-menu>

      <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="grey lighten-1" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer" ></v-toolbar-side-icon>
          <span class="hidden-sm-and-down ">{{ companyName }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon large>
          <v-avatar size="32px" tile>
            <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
          </v-avatar>
        </v-btn>
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  
  </div>
</template>

<script>
  import DrawerMenu from '@/components/DrawerMenu';
  import AlertBar from '@/components/AlertBar';
 

  export default {
    components: {
      DrawerMenu,
      AlertBar
    },

    data: () => ({
      companyName: "SISPAM - VIP CAR",
       drawer: true,
      
    }),

    async mounted() {
      
    },

    methods: {
      
    },

    async beforeMount() {
      
    },

    props: {
      source: String
    }
  }

</script>

<style scoped>
  .bg-image {
    background-image: url('assets/background.png');
    background-size: 100%;
    background-position: center;
  }

</style>
