<template>
  <div class="admin-posts">
    <div class="admin-post" v-for="post in posts" :key="post._id">
      <div class="admin-post-title">{{post.title}}</div>
      <div class="admin-post-text">{{textPreview(post.text)}}</div>
      <div class="admin-post-tags">
        <span v-for="tag in post.tags">{{tag}}</span>
      </div>
    </div>

    <div v-if="!hasPosts" class="admin-no-posts">{{msg}}</div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        posts: [],
        err: "",
        msg: "No posts to show"
      }
    },

    computed: {
      hasPosts(){
        return !!this.posts.length;
      }
    },

    methods: {
      textPreview(text){
        text = text.substr(0, 200);

        if(text.length === 200){
          text += " .  .  .";
        }

        return text;
      }
    },

    async created(){
      let self = this;

      try{
        let res = await self.$http.get("/api/b");

        self.posts = res.body.result.posts;
      }
      catch(err){
        self.err = err.message;
      }
    }
  }
</script>

<style>
  .admin-posts{
    min-width: 900px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-family: "Text Me One", "sans-serif";
  }

  .admin-post{
    box-shadow: 0 0 3px lightgray;
    margin-bottom: 20px;
    padding: 20px;
  }

  .admin-post-title{
    margin-top: 5px;
    margin-bottom: 30px;
    font-weight: 900;
  }

  .admin-post-tags{
    margin-top: 30px;
    margin-bottom: 5px;
  }

  .admin-post-tags span{
    margin-right: 10px;
    padding: 5px 15px;
    background-color: dodgerblue;
    color: white;
    font-family: Amaranth, sans-serif;
    font-size: 0.75em;
    font-weight: 900;
    border-radius: 4px;
  }
</style>
