<template>
  <div class="client-ext-posts">
    <nav-bar class="client-ext-nav" is-fixed="true"></nav-bar>

    <div class="client-ext-content">

      <div class="ext-post"
           v-for="post in posts"
           :key="post._id">

        <a :href="post.url" target="_blank" @click="trackPost(post.title)">
          <div class="ext-date">
            {{post.date}}
          </div>
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
import Nav from "../nav";
import MagicGrid from "./magic.grid";

export default {
  data(){
    return {
      posts: []
    };
  },

  components: {
    "nav-bar": Nav
  },

  methods: {
    /**
     * Report to google analytics when
     * a post is opened
     *
     * @param title - post title
     */
    trackPost(title){
      this.$ga.event("Collection", "open", title);
    }
  },

  /**
   * Sets up the data for this component
   * and initializes the Magic Grid.
   *
   * @return {Promise<void>}
   */
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

      self.$nextTick(() => {
        new MagicGrid({
          container: ".client-ext-content",
          item: ".ext-post",
          size: self.posts.length,
          gutter: 40
        }).listen();
      });
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
    padding-bottom: 20px;
  }

  .ext-post{
    position: absolute;
    top: 0;
    left: 0;
    width: 600px;
    margin: 0 17px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.2s ease;
  }

  .ext-post:hover{
    background-color: whitesmoke;
  }

  .ext-post a{
    display: block;
    text-decoration: none;
    padding: 15px;
  }

  .ext-post .ext-date{
    position: absolute;
    z-index: 1;
    width: fit-content;
    width: -moz-fit-content;
    font-size: 10px;
    font-weight: bold;
    padding: 5px;
    top: 10px;
    left: 10px;
    background-color: white;
    color: #454547;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .ext-post .ext-image{
    position: relative;
    width: 100%;
    height: 288px;
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
    width: -moz-fit-content;
    font-weight: bold;
    color: #24292e;
  }

  .ext-post .ext-title{
    margin: 15px 0 8px;
    font-size: 14px;
    border-bottom: 2px solid #42b983;
  }

  .ext-post .ext-description{
    font-size: 14px;
    margin-left: 3px;
  }

  @media screen and (max-width: 640px){
    .client-ext-content{
      top: 100px;
    }

    .ext-post{
      width: 80%;
      max-width: 380px;
      min-width: 350px;
    }

    .ext-post .ext-date{
      font-size: 10px;
    }

    .ext-post .ext-image{
      height: 160px;
    }

    .ext-post .ext-title{
      font-size: 10px;
    }

    .ext-post .ext-description{
      font-size: 10px;
    }
  }
</style>
