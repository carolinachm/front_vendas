import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Cliente from '@/pages/Cliente'
import Atendimento from '@/pages/Atendimento'
import Contato from '@/pages/Contato'
import Acessorio from '@/pages/Acessorio'
import Usuario from '@/pages/Usuario'
import Perfil from '@/pages/Perfil'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cliente',
      name: 'Cliente',
      component: Cliente
    },
    {
      path: '/atendimento',
      name: 'Atendimento',
      component: Atendimento
    },
    {
      path: '/contato',
      name: 'Contato',
      component: Contato
    },
    {
      path: '/acessorio',
      name: 'Acessorio',
      component: Acessorio
    },
    {
      path: '/usuario',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    

  ]
})
