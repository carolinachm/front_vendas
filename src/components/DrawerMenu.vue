<template>
  <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
    <v-list dense>
      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link tag="div" :to="item.to">
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <template>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>directions_run</v-icon>
          </v-list-tile-action>
          
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    methods: {
     
    },
    data() {
      return {
        drawer: null,
        items: [{
            icon: 'home',
            text: 'Início',
            to: '/'
          },
          {
            icon: 'person',
            text: 'Cliente',
            to: '/clientes'
          },
                    // {
          //   icon: 'contacts',
          //   text: 'Contato',
          //   to: '/contatos'
          // },
          // {
          //   icon: 'person',
          //   text: 'Acessorio',
          //   to: '/acessorios'
          // },
          // {
          //   icon: 'group',
          //   text: 'Usuário',
          //   to: '/usuarios'
          // },
          {
            icon: 'business',
            text: 'Perfil',
            to: '/perfis'
          },
          {
            icon: 'person',
            text: 'Atendimento',
            to: '/atendimentos'
          },
          {
            icon: 'business',
            text: 'Relatorios',
            to: '/relatorios'
          },
          // {
          //   icon: 'business',
          //   text: 'Marca',
          //   to: '/marcas'
          // },
          // {
          //   icon: 'business',
          //   text: 'Tipo Veiculo',
          //   to: '/tipoVeiculos'
          // },
          // {
          //   icon: 'business',
          //   text: 'Nacionalidade',
          //   to: '/nacionalidades'
          // },
          // {
          //   icon: 'keyboard_arrow_up',
          //   'icon-alt': 'keyboard_arrow_down',
          //   text: 'Labels',
          //   model: false,
          //   children: [
          //     { icon: 'add', text: 'Create label' }
          //   ]
          // },
          // {
          //   icon: 'keyboard_arrow_up',
          //   'icon-alt': 'keyboard_arrow_down',
          //   text: 'More',
          //   model: false,
          //   children: [
          //     { text: 'Import' },
          //     { text: 'Export' },
          //     { text: 'Print' },
          //     { text: 'Undo changes' },
          //     { text: 'Other contacts' }
          //   ]
          // }
        ]
      }
    }
  }

</script>
