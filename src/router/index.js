import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: () =>
        import(
          `@/pages/Home.vue`
        )
    },
    {
      path: '/cliente',
      name: 'Cliente',
      component: () =>
        import(
          `@/pages/Cliente.vue`
        )
    },
    {
      path: '/atendimento',
      name: 'Atendimento',
      component: () =>
        import(
          `@/pages/Atendimento.vue`
        )
    },
    {
      path: '/acessorio',
      name: 'Acessorio',
      component: () =>
        import(
          `@/pages/Acessorio.vue`
        )
    },
    {
      path: '/contato',
      name: 'Contato',
      component: () =>
        import(
          `@/pages/Contato.vue`
        )
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: () =>
        import(
          `@/pages/Perfil.vue`
        )
    },
   
    {
      path: '/usuario',
      name: 'Usuário',
      component: () =>
        import(
          `@/pages/Usuario.vue`
        )
    }
  ]
})
