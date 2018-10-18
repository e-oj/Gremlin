<template>
  <div class="story">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="story-content">
      <div class="s-card" v-for="story in stories" :key="story._id">
        <div class="s-image">
          <img :src="`/src/assets/img/stories/${story.image}`">
        </div>

        <div class="s-body">
          <div class="title">{{story.title}}</div>
          <div class="subtitle">{{story.subtitle}}</div>
          <div class="description" v-html="story.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../nav";
import stories from "./stories";

export default {
  data(){
    return {
      stories: stories
    };
  },
  components: {
    "nav-bar": Nav
  }
};
</script>

<style scoped>
  .story-content{
    position: relative;
    top: 100px;
  }

  .s-card{
    width: 800px;
    margin: 0 auto 30px;
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

  .s-card .s-body .title{
    width: fit-content;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bolder;
    border-bottom: 3px solid #42b983;
  }

  .s-card .s-body .subtitle{
    width: fit-content;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 3px solid #42b983;
  }

  .s-card .s-body .description{
    font-size: 15px;
    line-height: 1.6;
  }

  .s-card .s-body .description >>> a{
    text-decoration: none !important;
    background-color: whitesmoke;
    color: cornflowerblue;
    transition: all 0.2s linear;
  }

  .s-card .s-body .description >>> a:hover{
    background-color: cornflowerblue;
    color: white;
  }
</style>
