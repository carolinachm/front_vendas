import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Cliente from '@/pages/Cliente'
import Atendimento from '@/pages/Atendimento'
import Contato from '@/pages/Contato'
import Acessorio from '@/pages/Acessorio'
import Usuario from '@/pages/Usuario'
import Perfil from '@/pages/Perfil'
import Marca from '@/pages/Marca'
import TipoVeiculo from '@/pages/TipoVeiculo'
import Nacionalidade from '@/pages/Nacionalidade'
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
      path: '/contatos',
      name: 'Contato',
      component: Contato
    },
    {
      path: '/acessorios',
      name: 'Acessorio',
      component: Acessorio
    },
    {
      path: '/relatorios',
      name: 'Relario',
      component: Relatorio
    },
    {
      path: '/usuarios',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/perfis',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/marcas',
      name: 'Marca',
      component: Marca
    },
    {
      path: '/tipoVeiculos',
      name: 'TipoVeiculo',
      component: TipoVeiculo
    },
    {
      path: '/nacionalidades',
      name: 'Nacionalidade',
      component: Nacionalidade
    },

  ]
})
