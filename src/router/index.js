import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Cliente from '@/pages/Cliente'
import Atendimento from '@/pages/Atendimento'
import Perfil from '@/pages/Perfil'
import Relatorio from '@/pages/Relatorio'



Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/clientes',
      name: 'Cliente',
      component: Cliente
    },
    {
      path: '/atendimentos',
      name: 'Atendimento',
      component: Atendimento
    },
    
    {
      path: '/perfis',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/relatorios',
      name: 'Relatorio',
      component: Relatorio
    }

  ]
})