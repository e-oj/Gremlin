<template>
  <div class="admin-ext-posts">
    <div v-if="noPosts">
      {{msg}}
    </div>

    <div v-if="err" style="color: red;">{{err}}</div>

    <div class="new-ext-post">
      <div class="new-ext-action" v-show="!showForm" @click="showForm = !showForm">
        <i class="fa fa-plus"></i>
      </div>

      <div class="new-ext-action" v-show="showForm" @click="showForm = !showForm">
        <i class="fa fa-times"></i>
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
          <input v-for="prop of props" :key="prop" v-model="newPost[prop]" :placeholder="prop" type="text"/>

          <div class="new-ext-submit" @click="createPost">Submit</div>
        </div>
      </div>
    </div>

    <div class="ext-grid">
      <div class="ext-post" v-for="post in posts" :key="post._id">
        <div class="ext-action ext-delete" @click="deletePost(post)">
          <i class="fal fa-times"></i>
        </div>

        <div class="ext-action ext-update" @click="updatePost(post)">
          <i class="fal fa-cloud"></i>
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

        <div class="ext-rank">
          <label for="ext-rank-in">Rank:</label>
          <input id="ext-rank-in" v-model="post.rank"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {readFiles} from "../../../../public.utils";

let MagicGrid = require("magic-grid");
let magicGrid;

export default {
  data(){
    return {
      posts: [],
      err: "",
      msg: "No posts to show",
      props: ["title", "description", "url", "date"],
      showForm: false,
      newPost: {
        image: null,
        title: "",
        description: "",
        url: "",
        date: ""
      }
    };
  },

  methods: {
    /**
     * Sends a "new post" request to
     * the api and adds the created post
     * to the view
     */
    async createPost(){
      let self = this;
      let form  = new FormData();
      let image = self.newPost.image;

      if(image) form.append("image", image.file);

      for(let prop of self.props){
        form.append(prop, self.newPost[prop]);
      }

      try{
        let res = await self.$http.post("/api/b/ext", form);
        let post = res.body.result.post;

        for(let prop of self.props){
          self.newPost[prop] = "";
        }
        self.newPost.image = null;

        if(self.err) self.err = "";

        post.index = self.posts.length;
        self.posts.push(post);

        self.$nextTick(() => {
          magicGrid.positionItems();
        });
      }
      catch(err){
        self.err = err.message || err.body.message;
      }
    },

    /**
     * Sends an "edit post" request to
     * the api and updates the edited post
     * in the view
     */
    async updatePost(post){
      let self = this;

      try{
        let data = {...post}; // convert vue obj to regular obj
        let res = await self.$http.put("/api/b/ext", data);
        let updated = res.body.result.post;

        updated.index = post.index;

        self.posts.splice(post.index, 1, updated)
      }
      catch (err) {
        self.err = err.message || err.body.message;
      }
    },

    /**
     * Sends a "delete post" request to
     * the api and removes the deleted post
     * from the view
     */
    async deletePost(post){
      let self = this;

      try{
        await self.$http.delete("/api/b/ext", {body: {_id: post._id}});
        if(self.err) self.err = "";

        self.posts.splice(post.index, 1);
      }
      catch(err){
        self.err = err.message || err.body.message;
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
    /**
     * Checks for posts
     *
     * @return Boolean
     */
    noPosts(){
      return !this.posts.length;
    }
  },

  /**
   * Initialize posts on creation
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

      magicGrid = new MagicGrid({
        container: ".ext-grid",
        items: self.posts.length,
        maxColumns: 3,
        animate: true
      });

      magicGrid.listen();
    }
    catch(err){
      self.err = err.message;
    }
  }
};
</script>

<style scoped>
  .admin-ext-posts{
    max-width: 1920px;
    margin: auto;
    padding: 10px;
    overflow: auto;
    background-color: white;
    transition: all 0.3s ease;
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
    width: 200px;
    height: 200px;
    background: #EDEFF0;
    margin-bottom: 16px;
  }

  .new-ext-form .preview img{
    width: 100%;
    height: 100%
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
    position: absolute;
    width: 450px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.2s ease;
  }

  .ext-post:hover{
    background-color: whitesmoke;
  }

  .ext-post .ext-action{
    position: absolute;
    width: 32px;
    height: 32px;
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .ext-post .ext-action:hover{
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .ext-post .ext-action:hover svg{
    color: #686868;
  }

  .ext-post .ext-action svg{
    width: 20px;
    height: 20px;
    color: darkgray;
  }

  .ext-post .ext-delete{
    top: 16px;
    left: 16px;
  }

  .ext-post .ext-update{
    top: 16px;
    left: 64px;
  }

  .ext-post .ext-rank{
    position: absolute;
    left: 16px;
    top: 170px;
    font-size: 12px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    padding: 5px;
  }

  .ext-post .ext-rank input{
    outline: none;
    border: none;
    width: 26px;
    font-size: 12px;
    font-family: inherit;
    text-align: center;
  }

  .ext-post .ext-rank label{
    font-weight: bold;
  }

  .ext-post a{
    text-decoration: none;
  }

  .ext-post .ext-image{
    position: relative;
    width: 100%;
    height: 216px;
  }

  .ext-post .ext-image img{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .ext-post .ext-content{
    padding: 10px;
  }

  .ext-post .ext-title, .ext-post .ext-description{
    width: fit-content;
    width: -moz-fit-content;
    font-weight: bold;
  }

  .ext-post .ext-title{
    margin: 0 0 8px;
    font-size: 14px;
    color: #24292e;
    border-bottom: 2px solid #42b983;
  }

  .ext-post .ext-description{
    font-size: 12px;
    color: #494d50;
  }

</style>
