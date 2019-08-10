<template>
  <div id="app">
    <router-view/>
    <notifications/>
  </div>
</template>

<style>
*{
    margin:0;
    padding: 0;
    outline:0;
}

html, body, #app{
    height: 100%;
}

body{
    background:#f5f5f5;
}

body, input, button{
    font-family: Arial, Helvetica, sans-serif
}
</style>
