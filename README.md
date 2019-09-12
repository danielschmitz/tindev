# Tindev

![tindev](https://user-images.githubusercontent.com/1509692/64775871-813cc980-d52d-11e9-835d-15bc79878099.png)

![tindev](https://user-images.githubusercontent.com/1509692/64775972-b8ab7600-d52d-11e9-86a6-0310609dace8.png)


Um "tinder" para devs utilizando VueJS e NodeJS.

<!-- TOC -->

- [Tindev](#tindev)
    - [Observações importantes](#observações-importantes)
    - [Deploy no heroku](#deploy-no-heroku)
        - [Prerequisitos](#prerequisitos)
        - [Criando o deploy](#criando-o-deploy)
        - [Configurando o deploy](#configurando-o-deploy)
    - [O uso de arquivos .env (environment)](#o-uso-de-arquivos-env-environment)
    - [Diferenças entre React e Vue](#diferenças-entre-react-e-vue)
    - [Se você chegou até aqui...](#se-você-chegou-até-aqui)

<!-- /TOC -->

## Observações importantes

Demo: https://tindevue.herokuapp.com

Uma cópia da Semana Omnistack da Rocketseat, que fez em React (http://bit.ly/semana-omnistack-agosto)

Não usei o Atlas (me pediu cartão de crédito, talvez não aconteça com você). Usei o mlab.com

Ao invés de colocar a URL do mongo direto no código, e deixar isso público no GitHub, usei dotenv. A URL do banco de dados deve ser colocada em `backend\.env`

## Deploy no heroku

Esse projeto pode ser acessado em: https://tindevue.herokuapp.com

Para que se possa fazer esse tipo de integração com o heroku, é necessário realizar alguns passos a mais em relação ao conteúdo que o diego3g está publicando. Sugiro que faça essa integração após terminar a 2ª aula sobre frontend.

Vou tentar resumir os passos aqui. Se tiver dúvidas pode abrir uma ISSUE que eu tento te ajudar.

### Prerequisitos

- Tem o projeto no GitHub. Você pode fazer um fork do meu se julgar necessário. Mas se quer realmente aprender é melhor escrever todo o código acompanhando as aulas da Rocketseat

- Ter uma conta no Heroku.com. É de graça!

### Criando o deploy

- Após logar no Heroku pelo site deles, crie em "Create new App". Encontre um nome pra app e clique em Next.

- Na próxima página, você deve conectar a app a um projeto GitHub, como na figura a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62713654-78f3ea80-b9d3-11e9-89c4-f47767700b76.png" border="2"/></kbd>

- Se você ainda não relacionou a sua conta do herouku a conta do GitHub, surgirá um botao para "conectar" as duas contas

- Com a conta conectada, surge algo parecido com a imagem a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62713807-b6587800-b9d3-11e9-8b15-cbe43f0311b0.png"/></kbd>

- Ou seja, sempre que houver um PUSH no seu projeto (branch master), o Heroku vai realizar um deploy automatico.

### Configurando o deploy

A parte de configuração do deploy é formada por duas partes. Primeiro, configuração das variáveis de ambiente na interface do heroku. Acesse "Settings" da sua app e clique no botão "Reveal config Vars". Surge algo a figura a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62714058-341c8380-b9d4-11e9-8df2-79b0aece68cb.png"/></kbd>

- Nesta configuração você precisa definir o `NPM_CONFIG_PRODUCTION` como `false` para que o deploy do Heroku instale também as `devDependencies`. Defina também `DB_URI` que é a minha url de conexão com o mlab. Se você estiver seguindo religiosamente a aula da Rocketseat, não precisa definir `DB_URI`. Eu só acho importante deixar strings de conexão e senhas e coisas sensíveis em variáveis de ambiente, assim temos uma melhora na segurança da app.

- Após definir as variáveis de ambiente, é preciso compreender que o Heroku executa dois comandos internos na sua aplicação. São eles: `npm run build` e `npm start`. Esses dois comandos estão no `package.json` do projeto (e não da pasta frontend ou backend) 

    - O comando `npm run build` realiza uma série de ações:

    ```
    cd backend && npm install && cd .. && cd frontend && npm install && npm run build && cd ..
    ```

    Estas ações são:

    1 - Ir no diretório backend e executar `npm install`

    2 - Ir no diretório frontend e executar `npm install`
    
    3 - Ainda no diretório frontend, executar `npm run build` para compilar a aplicação 

    - O comando `npm start` irá iniciar o servidor `backend`

<img src="https://user-images.githubusercontent.com/1509692/62714711-772b2680-b9d5-11e9-83be-5027fe5a482c.png"/>

- Para finalizar o entendimento do Deploy no Heroku, é preciso analisar algumas muduanças no arquivo `backend/src/index.js`:

<img src="https://user-images.githubusercontent.com/1509692/62714901-cbcea180-b9d5-11e9-84b4-122909c3b175.png"/>

Em **1** incluímos a biblioiteca `dotenv`. Ela é responsável em pegar valores do arquivo `.env` ou das configurações do Heroku. Por exemplo, usamos em **2** o DB_URI. Em **3** configuramos o que chamamos de "Servidor estático". O servidor estático está apontado para `__dirname + "/../../frontend/dist"` que é justamente o diretório compilado da aplicação que foi gerada pelo `npm run build` do frontend. Em **4** configuramos uma porta, que pode ser a porta do servidor Heroku (process.env.PORT) ou a porta 9999. 

Após realizar esses passos e entender como funciona, basta fazer um PUSH no seu código do GitHub para ver o Heroku trabalhando sozinho no deploy:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62715291-96768380-b9d6-11e9-993d-f914f15ba573.png"/></kbd>

Ao terminar o build, se aparecer a mensagem `Build succeeded`, basta clicar no botão `Open app` para ver sua aplicação sendo executada.

## O uso de arquivos .env (environment)

Em um projeto real, é muito importante separar os valores de configuração do software do software em si. Por exemplo, a string de conexão com o banco de dados mongodb é um valor que deve ser alterado para cada usuário. 

Para resolver esse problema da forma correta, usa-se os arquivos `.env` que são chamados de arquivos de environment. Um sistema pode inclusive, possuir arquivos de environment dependendo se o mesmo está em desenvovlimento, em testes ou em produção. 

No backend, temos a princípio o arquivo `.env.example` que é um exemplo de como o arquivo `.env` deve ser. Sua primeira ação ao realizar o clone deste projeto é gerar o arquivo `.env` a partir de sua cópia. 

O arquivo `.env` não está versionado no git por um motivo. Em uma grande equipe de desenvolvimento, cada desenvolvedor pode ter suas configurações próprias, que não devem ser enviadas para o repositório git.

Se você não compreende bem os arquivos `.env`, estude! Eles são importantes no seu dia a dia e ter o domínio sobre eles irá melhorar suas chances de adquirir uma boa oportunidade de emprego.

## Diferenças entre React e Vue

A criação desse projeto não tem como objetivo mostrar quem é melhor que quem. Não seja um programador que "puxe sardinha" para qualquer lado. Seja um programador que saiba as diferenças das tecnologias e extraia o melhor delas. 

Vamos ver que, React e Vue não são assim tão diferentes. No React, o arquivo que representa a aplicação em si é assim: 

```js
import React from 'react';
import './App.css';

import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;
```

No Vue, temos:

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

Veja que existe uma semelhança entre eles. O Angular não é diferente. O importante neste ponto é você conhecer bem a linguagem que está trabalhando.

## Se você chegou até aqui... 

Vou te dar o melhor conselho que um DEV possa te dar. Não tenha tecnologia de estimação. Adapte-se sempre às novas tecnologias do mercado. Entre VueJS, React ou Angular, foque em Javascript, aprenda BEM essa linguagem, domine-a por completo (incluindo ES6) e os frameworks que a usam. Você irá "tirar de letra". 

É isso, bons estudos!
