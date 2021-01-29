import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Controle de Contas',
    description: 'Documentação da API feita em NodeJS com Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Rennan Cockles',
      email: 'rcdev@hotmail.com.br',
      url: 'https://www.linkedin.com/in/rennancockles'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Link para o repositório do projeto',
    url: 'https://https://github.com/rennancockles/ControleDeContas'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Auth',
    description: 'APIs relacionadas a Autenticação'
  }],
  paths,
  schemas,
  components
}
