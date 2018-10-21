<template>
  <div class="story">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="nav-ghost"></div>

    <div class="story-wrapper">
      <div class="story-content">
        <div class="s-nav">
          <div v-for="(story, i) in stories"
               :class="['s-nav-item', {'s-nav-active': isActive(i)}]"
               :key="story._id"
               @click="setActive(i)">

            <div class="s-nav-title">{{story.title}}</div>
            <div class="s-nav-subtitle">{{story.subtitle}}</div>
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


      <div class="mobile-stories">
        <div v-for="(story, i) in stories"
             :class="['s-card', {'mobile-active': isActive(i)}]"
             @click="setActive(i)">

          <div class="s-image" v-show="isActive(i)">
            <img :src="`/src/assets/img/stories/${story.image}`">
          </div>

          <div class="s-body">
            <div class="title">{{story.title}}</div>
            <div class="subtitle">{{story.subtitle}}</div>
            <div class="description"
                 v-html="story.description"
                 v-show="isActive(i)"></div>
          </div>
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
    setActive(index){
      this.index = index;
    },

    isActive(index){
      return index === this.index;
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
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .story-wrapper{
    height: 80vh;
    display: flex;
  }

  .nav-ghost{
    height: 100px;
    flex-shrink: 0;
    opacity: 0;
  }

  .story-content{
    position: relative;
    min-width: 1150px;
    min-height: 750px;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  .s-nav{
    width: 250px;
    height: fit-content;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .s-nav .s-nav-item{
    padding: 10px;
    line-height: 1.6;
  }

  .s-nav .s-nav-item:not(.s-nav-active):hover{
    background-color: #f2f2f2;
  }

  .s-nav .s-nav-active{
    background-color: #42b983;
    color: white;
  }

  .s-nav .s-nav-image img{
    width: 30px;
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
    flex-shrink: 0;
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

  .mobile-stories {
    display: none;
  }

  @media screen and (max-width: 1150px){
    .story-wrapper{
      height: 100vh;
    }

    .story-content{
      display: none;
    }

    .mobile-stories{
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .mobile-stories .s-card:not(.mobile-active){
      cursor: pointer;
    }

    .mobile-stories .s-card:not(.mobile-active):hover{
      background-color: #f2f2f2
    }

    .mobile-stories .s-card .s-body .title{
      font-size: 22px;
    }

    .mobile-stories .s-card .s-body .subtitle{
      font-size: 20px;
    }

    .mobile-stories .s-card .s-body .description{
      font-size: 19px;
    }

  }

</style>
