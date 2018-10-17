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
              {{post.title}}
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
    transition: all 0.3s ease;
  }

  .client-ext-content{
    position: relative;
    top: 100px;
  }

  .ext-post{
    position: relative;
    width: 800px;
    margin: 0 auto 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .ext-post:hover{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .ext-post a{
    text-decoration: none;
  }

  .ext-post .ext-image{
    position: relative;
    width: 100%;
    height: 400px;
  }

  .ext-post .ext-image img{
    width: 100%;
    height: 400px;
  }

  .ext-post .ext-content{
    color: #454547;
    padding: 20px;
  }

  .ext-post .ext-title{
    padding-bottom: 10px;
    font-size: 20px;
  }

  .ext-post .ext-description{
    font-size: 16px;
  }
</style>
