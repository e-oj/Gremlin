<template>
  <div class="admin-ext-posts">
    <div class="new-ext-post">
      <div class="new-ext-action" @click="showForm = !showForm">
        <i class="fa fa-plus"></i>
      </div>

      <div class="new-ext-form" v-show="showForm">
        <div class="new-ext-left">
          <div class="preview">
            <img v-if="newPost.image" :src="newPost.image.url"/>
          </div>
          <input type="file" @change="addFile" id="new-ext-image"/>
          <label for="new-ext-image">Upload</label>
        </div>

        <div class="new-ext-right">
          <input v-for="prop of props" v-model="newPost[prop]" :placeholder="prop" type="text"/>

          <div class="new-ext-submit">Submit</div>
        </div>
      </div>
    </div>

    <div v-if="noPosts">
      {{msg}}
    </div>

    <div v-if="err" style="color: red;">{{err}}</div>

    <div class="ext-post" v-for="post in posts">
      <div class="ext-delete" @click="deletePost(post)">
        <i class="fal fa-times"></i>
      </div>

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
</template>

<script>
  import {readFiles} from "../../../../public.utils";

  export default {
    data(){
      return {
        posts: [],
        err: "",
        msg: "No posts to show",
        props: ["title", "description", "url"],
        showForm: false,
        newPost: {
          image: null,
          title: "",
          description: "",
          url: "",
        }
      }
    },

    methods: {
      async deletePost(post){
        let self = this;

        try{
          let res = await self.$http.delete("/api/b/ext", {body: {_id: post._id}});
          console.log(res.body.message);

          self.posts.splice(post.index, 1);
        }
        catch(err){
          self.err = err.message;
        }
      },

      /**
       * Adds a file from the input.
       *
       * @param event - input change event
       * @returns {Promise<void>}
       */
      async addFile(event){
        let self = this;

        try{
          let files = await readFiles(event.target);

          if (files.length){
            self.newPost.image = files[0];
          }
          else{
            self.newPost.image = null;
          }
        }
        catch(err){
          console.log("File Upload Error:", err);
        }
      }
    },

    computed: {
      noPosts(){
        return self.posts && !self.posts.length;
      }
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
  }
</script>

<style scoped>
  .admin-ext-posts{
    transition: all 0.3s ease
  }

  .new-ext-post .new-ext-action{
    width: 50px;
    height: 50px;
    margin: 2.5em auto 40px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #1a8cff;
  }

  .new-ext-post .new-ext-action:hover{
    background-color: #42B987;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .new-ext-post .new-ext-action svg{
    color: white;
    width: 14px;
  }

  .new-ext-post .new-ext-action:hover svg{
    /*color: #686868;*/
  }

  .new-ext-form{
    width: 800px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .new-ext-form .preview{
    width: 150px;
    height: 150px;
    background: #EDEFF0;
    margin-bottom: 16px;
  }

  .new-ext-form .preview img{
    width: 150px;
    height: 150px;
  }

  .new-ext-form #new-ext-image{
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .new-ext-form #new-ext-image+label, .new-ext-form .new-ext-submit{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 150px;
    margin: 0 auto;
    background-color: #EDEFF0;
    cursor: pointer;
    font-size: 16px;
  }

  .new-ext-form #new-ext-image+label:hover, .new-ext-form .new-ext-submit:hover{
    background-color: #03A9F4;
    color: white;
  }

  .new-ext-form .new-ext-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .new-ext-form input{
    font-size: 16px;
    padding: 10px 5px;
    width: 500px;
  }

  .ext-post{
    position: relative;
    width: 800px;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .ext-post .ext-delete{
    position: absolute;
    width: 40px;
    height: 40px;
    top: 20px;
    left: 20px;
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .ext-post .ext-delete:hover{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .ext-post .ext-delete:hover svg{
    color: #686868;
  }

  .ext-post .ext-delete svg{
    width: 25px;
    height: 25px;
    color: darkgray;
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
