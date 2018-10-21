<template>
  <div class="story">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="story-content">
      <div class="s-nav-container">
        <div class="s-nav">
          <div class="s-nav-item" v-for="(story, index) in stories"
               :key="story._id"
               @click="setIndex(index)">

            <div class="s-nav-title">{{story.title}}</div>
            <div class="s-nav-subtitle">{{story.subtitle}}</div>
          </div>
        </div>
      </div>

      <div class="s-card">
        <div class="s-image">
          <img :src="`/src/assets/img/stories/${currentStory.image}`">
        </div>

        <div class="s-body">
          <div class="title">{{currentStory.title}}</div>
          <div class="subtitle">{{currentStory.subtitle}}</div>
          <div class="description" v-html="currentStory.description"></div>
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
      stories: stories,
      index: 0
    };
  },

  components: {
    "nav-bar": Nav
  },

  methods: {
    setIndex(index){
      this.index = index;
    }
  },

  computed: {
    currentStory(){
      return this.stories[this.index]
    }
  }
};
</script>

<style scoped>
  .story{
    max-width: 1920px;
    height: 100vh;
    margin: auto;
    display: flex;
    background-color: white;
  }

  .story-content{
    position: relative;
    min-width: 1200px;
    min-height: 750px;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  .s-nav{
    width: 250px;
    height: fit-content;
    font-size: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .s-nav .s-nav-item{
    padding: 10px;
    line-height: 1.4;
  }

  .s-nav .s-nav-title{
    font-weight: bold;
  }

  .s-card{
    width: 800px;
    height: fit-content;
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
    height: 100%;
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
