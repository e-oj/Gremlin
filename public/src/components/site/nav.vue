<template>
  <ul class="nav">
    <li><a href="/">Home</a></li>
    <li><a href="/">Blog</a></li>
  </ul>
</template>

<style>
  .nav{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 70%;
    margin: 0 auto;
    font-family: 'Acme', sans-serif;
    font-size: 1.2em;
  }

  .nav a{
    text-decoration: none;
  }

  .nav li{
    margin: 0 50px 0 0;
    border-bottom: 3px solid white;
    transition: all 0.2s linear;
  }

  .nav li:hover{
    border-color: #ffff00;
  }

  .nav li:last-child{
    margin-right: 0;
  }
</style>

<script>
  export default {
    data(){}
  }
</script>
