<template>
  <div :class="['nav-container', {'fixed-nav': isFixed}]">
    <div v-if="isFixed" class="nav-logo">
      <span class="bracket"><</span>
        <a target="_blank" href="https://www.github.com/e-oj">@e-oj</a>
      <span class="bracket">></span>
    </div>

    <ul class="nav">
      <li><a href="/">Home</a></li>
      <li><a href="/story">Story</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["isFixed"]
  }
</script>

<style scoped>
  .nav-container{
    display: flex;
    justify-content: space-between;
    font-family: 'Acme', sans-serif;
    font-size: 1.1em;
  }

  .nav-logo{
    display: flex;
    align-items: center;
    font-size: 40px;
    margin-left: 100px;
    min-width: 120px;
  }

  .nav-logo .bracket{
    color: #42b983;
  }

  .nav-logo a{
    text-decoration: none;
    color: #ffff00;
    border-bottom: 5px solid transparent;
    transition: all 0.2s linear;
  }

  .nav-logo a:hover{
    border-color: #ffff00;
  }

  .fixed-nav{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100px;
    background-color: black;
    font-size: 25px;
  }

  .fixed-nav .nav{
    display: flex;
    align-items: center;
  }

  .fixed-nav .nav li:last-child{
    margin-right: 100px;
  }

  .nav{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;
  }

  .nav a{
    text-decoration: none;
    transition: all 0.2s linear;
  }

  .nav li{
    margin: 0 60px 0 0;
    border-bottom: 3px solid #ffff00;
    transition: all 0.2s linear;
  }

  .nav li:last-child{
    margin-right: 150px;
  }

  .nav li:hover a{
    color: #ffff00;
  }
</style>
