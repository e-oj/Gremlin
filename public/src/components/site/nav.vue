<template>
  <ul class="nav">
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/">Resume</a></li>
  </ul>
</template>

<style scoped>
  .nav{
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 80%;
    margin: 0 auto;
    font-family: 'Acme', sans-serif;
    font-size: 1.1em;
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
    margin-right: 0;
  }

  .nav li:hover a{
    color: #ffff00;
  }
</style>

<script>
  export default {}
</script>
