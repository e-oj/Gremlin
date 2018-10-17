<template>
  <div class="story">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="story-content">
      <div class="s-card" v-for="story in stories">
        <div class="s-image">
          <img :src="`/src/assets/img/stories/${story.image}`">
        </div>

        <div class="s-body">
          <div class="location">{{story.location}}</div>
          <div class="role">{{story.role}}</div>
          <div class="description">{{story.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../nav"
  import stories from "./stories";

  export default {
    data(){
      return {
        stories: stories
      }
    },
    components: {
      "nav-bar": Nav
    }
  }
</script>

<style scoped>
  .story-content{
    position: relative;
    top: 130px;
  }

  .s-card{
    width: 800px;
    margin: 0 auto 40px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .s-card .s-image{
    width: 100%;
    height: 400px;
  }

  .s-card .s-image img{
    width: 100%;
    height: 400px;
  }

  .s-card .s-body{
    color: #454547;
    padding: 20px 0 0;
  }

  .s-card .s-body .location{
    width: fit-content;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 3px solid #42b983;
  }

  .s-card .s-body .role{
    width: fit-content;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 3px solid #42b983;
  }

  .s-card .s-body .description{
    font-size: 17px;
  }
</style>
