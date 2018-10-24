<template>
  <div class="client-ext-posts">
    <nav-bar class="client-ext-nav" is-fixed="true"></nav-bar>

    <div class="client-ext-content">
      <div class="ext-post" v-for="post in posts" :key="post._id">
        <a :href="post.url" target="_blank">
          <div class="ext-image">
            <img :src="`/api/img/?imgId=${post.imgId}`" alt="Image">
          </div>

          <div class="ext-content">
            <div class="ext-title">
              <span class="highlight-text">{{post.title}}</span>
            </div>

            <div class="ext-description">
              {{post.description}}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./nav";

export default {
  data(){
    return {
      posts: []
    };
  },

  components: {
    "nav-bar": Nav
  },

  async created(){
    let self = this;

    try{
      let res = await self.$http.get("/api/b/ext");
      let posts = res.body.result.posts;
      let index = 0;

      for(let post of posts){
        post.index = index++;
      }

      self.posts = res.body.result.posts;
    }
    catch(err){
      self.err = err.message;
    }
  }
};
</script>

<style scoped>
  .client-ext-posts{
    max-width: 1920px;
    height: 100vh;
    margin: auto;
    overflow: auto;
    background-color: white;
    transition: all 0.3s ease;
  }

  .client-ext-content{
    position: relative;
    top: 130px;
  }

  .ext-post{
    position: relative;
    width: 700px;
    margin: 0 auto 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .ext-post:hover{
    background-color: whitesmoke;
  }

  .ext-post a{
    display: block;
    text-decoration: none;
    padding: 20px;
  }

  .ext-post .ext-image{
    position: relative;
    width: 100%;
    height: 350px;
  }

  .ext-post .ext-image img{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .ext-post .ext-content{
    color: #454547;
  }

  .ext-post .highlight-text{
    background-color: #b5e3cf;
    color: black;
    padding: 3px;
  }

  .ext-post .ext-title, .ext-post .ext-description{
    width: fit-content;
    font-weight: bold;
    color: #24292e;
  }

  .ext-post .ext-title{
    margin: 15px 0 8px;
    font-size: 16px;
    border-bottom: 2px solid #42b983;
  }

  .ext-post .ext-description{
    font-size: 14px;
    padding: 3px;
  }

  @media screen and (max-width: 1000px){
    .ext-post{
      width: 70%;
      min-width: 350px;
    }

    .ext-post a{
      padding: 15px;
    }

    .ext-post .ext-image{
      height: 270px;
    }
  }

  @media screen and (max-width: 640px){
    .ext-post{
      width: 80%;
      min-width: 350px;
    }

    .ext-post .ext-image{
      height: 180px;
    }

    .ext-post .ext-title{
      /*margin: 15px 0 8px;*/
      font-size: 12px;
    }

    .ext-post .ext-description{
      font-size: 10px;
    }
  }
</style>
