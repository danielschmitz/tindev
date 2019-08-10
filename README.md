# tindev

Um "tinder" para devs utilizando VueJS e Vue Native e NodeJS.

Uma cópia da Semana Omnistack da Rockseat, que fez em React (http://bit.ly/semana-omnistack-agosto)

Não usei o Atlas (pede cartão de crédito). Usei o mlab.com

Ao invés de colocar a URL do mongo direto no código, e deixar isso público no github, usei dotenv

## Deploy no heroku

Esse projeto pode ser acessado em: https://tindevue.herokuapp.com

Para que se possa fazer esse tipo de integração com o heroku, é necessário realizar alguns passos a mais em relação ao conteúdo que o diego3g está publicando. Sugiro que faça essa integração após terminar a 2a aula sobre frontend.

Vou tentar resumir os passos aqui. Se tiver dúvidas pode abrir uma ISSUE que eu tento te ajudar.

### Prerequisitos

- Tem o projeto no github. Você pode fazer um fork do meu use julgar necessário. Mas se quer realmente aprender é melhor escrever todo o código acompanhando as aulas da Rockseat

- Ter uma conta no Heroku.com. É de graça!

### Criando o deploy

- Após logar no heroku pelo site deles, crie em "Create new App". Encontre um nome pra app e clique em Next.

- Na próxima página, você deve conectar a app a um projeto GitHub, como na figura a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62713654-78f3ea80-b9d3-11e9-89c4-f47767700b76.png" border="2"/></kbd>

- Se vc ainda nao relacionou a sua conta do herouku a conta do github, surgirá um botao para "conectar" as duas contas

- Com a conta conectada, surge algo parecido com a imagem a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62713807-b6587800-b9d3-11e9-8b15-cbe43f0311b0.png"/></kbd>

- Ou seja, sempre que houver um PUSH no seu projeto (branch master), o heroku vai realizar um deploy automatico.

### Configurando o deploy

A parte de configuração do deploy é formada por duas partes. Primeiro, configuração das variáveis de ambiente na interface do heroku. Acesse "Settings" da sua app e clique no botão "Reveal config Vars". Surge algo a figura a seguir:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62714058-341c8380-b9d4-11e9-8df2-79b0aece68cb.png"/></kbd>

- Esta configuração você precisa definir o `NPM_CONFIG_PRODUCTION` como `false` para que o deploy do heroku instale também as `devDependencies`. Defina também `DB_URI` que é a minha url de conexão com o mlab. Se você estiver seguindo religiosamente a aula da rockseat, não precisa definir `DB_URI`. Eu só acho importante deixar strings de conexão e senhas e coisas sensíveis em variáveis de ambiente, assim temos uma melhora na segurança da app

- Após definir as variáveis de ambiente, é preciso compreender que o Heroku executa dois comandos internos na sua aplicação. São eles: `npm run build` e `npm start`. Esses dois comandos estão no `package.json` do projeto (e nao da pasta frontend ou backend) 

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

Em **1** incluímos a biblioiteca `dotenv`. Ela é responsável em pegar valores do arquivo `.env` ou das configurações do heroku. Por exemplo, usamos em **2** o DB_URI. Em **3** configuramos o que chamamos de "Servidor estático". O servidor estático está apontado para `__dirname + "/../../frontend/dist"` que é justamente o diretório compilado da aplicação que foi gerada pelo `npm run build` do frontend. Em **4** configuramos uma porta, que pode ser a porta do servidor heroku (process.env.PORT) ou a porta 9999. 

Após realizar esses passos e entender como funciona, basta fazer um PUSH no seu código do github para ver o heroku trabalhando sozinho no deploy:

<kbd><img src="https://user-images.githubusercontent.com/1509692/62715291-96768380-b9d6-11e9-993d-f914f15ba573.png"/></kbd>

Ao terminar o build, se aparecer a mensagem `Build succeeded`, basta clicar no botão `Open app` para ver sua aplicação sendo executada.

