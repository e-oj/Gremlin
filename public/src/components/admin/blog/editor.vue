<template>
  <div class="admin-editor">
    <input class="editor-tags" v-model="post.tags" type="text" placeholder="comma-separated tags">
    <input class="editor-title" v-model="post.title" type="text" placeholder="Title">

    <div id="editor"></div>

    <div class="editor-submit">
      <button class="submit" @click.preventDefault="publish">
        <i class="fas fa-share-alt"></i>
      </button>

      <button class="submit" @click.preventDefault="save">
        <i class="fas fa-folder"></i>
      </button>
    </div>

    <div class="msg" v-show="!!success">{{success}}</div>
    <div class="err" v-show="!!err">{{err}}</div>
  </div>
</template>

<script>
  import Quill from "quill"

  export default {
    data(){
      return {
        post: {
          title: "",
          text: "",
          tags: "",
          draft: false,
          html: ""
        },
        success: "",
        err: ""
      }
    },

    props: ["toEdit"],

    methods: {
      /**
       * loads the quill editor
       */
      loadQuill(){
        let link = document.createElement("link");

        link.setAttribute("href", "/node_modules/quill/dist/quill.snow.css");
        link.setAttribute("rel", "stylesheet");

        document.head.appendChild(link);
      },

      /**
       * publish a post
       *
       * @returns {Promise.<void>}
       */
      async publish(){
        await this.send({asDraft: false});
      },

      /**
       * Save post as draft
       *
       * @returns {Promise.<void>}
       */
      async save(){
        await this.send({asDraft: true});
      },

      /**
       * Builds and sends a post object to
       * the api
       *
       * @param options draft or nah? {asDraft: Boolean}
       * @returns {Promise.<void>}
       */
      async send(options) {
        let self = this;
        let $editor = $(".ql-editor");
        let post = {
          title: self.post.title,
          text: self.quill.getText(),
          tags: self.post.tags.split(","),
          draft:  options.asDraft,
          html: $editor.html()
        };

        self.err = "";
        self.success = "";

        if(self.post._id) {
          post._id = self.post._id;
        }

        try{
          let res = await self.$http.put("/api/b", post);

          self.success = res.body.message;
          self.post._id = "";
          self.post.title = "";
          self.post.tags = "";
          $editor.html("<p><br></p>");
        }
        catch(err){
          self.err = err.body.message;
        }
      }
    },

    created(){
      let self = this;

      self.loadQuill();
    },

    mounted(){
      let self = this;

      self.quill = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{"align": []}],
            [{"list": "ordered"}, {"list": "bullet"}],
            ["link", "image", "video"]
          ]
        }
      });

      if(self.toEdit){
        let $editor = $(".ql-editor");

        self.post._id = self.toEdit._id;
        self.post.title = self.toEdit.title;
        self.post.tags = self.toEdit.tags.join(", ");

        $editor.html(self.toEdit.html);
      }
    }
  }
</script>

<style>

  .admin-editor{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #33334d;
    margin-bottom: 1.5em;
    font-size: 1em !important;
  }

  .editor-submit{
    width: 12em;
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
  }

  .editor-submit .submit{
    font-size: 0.9em;
    margin-top: 1.43em;
    margin-bottom: 1.43em;
    width: 4em;
    height: 2em;
    border-radius: 0.22em;
    background-color: white;
    box-shadow: 0 0 2px lightgray;
    color: #4da6ff;
  }

  .admin-editor .submit:hover{
    background-color: #4da6ff;
    color: white;
  }

  .admin-editor .submit:last-child{
    margin-right: 0;
  }

  .admin-editor .submit i{
    color: #42b983;
  }

  .admin-editor .err, .admin-editor .msg{
    margin: 1em;
  }

  .admin-editor input{
    font-family: "Text Me One", sans-serif;
    border: none;
    border-bottom: 1px solid lightgrey;
  }

  .admin-editor input::placeholder{
    opacity: 0.6;
  }

  .admin-editor input:focus{
    outline: none;
    border-bottom-color: dodgerblue;
  }

  .editor-tags{
    font-size: 0.9em;
    width: 33.34em;
    margin-bottom: 2em;
  }

  .editor-title{
    font-size: 1.2em;
    width: 25em;
    margin-bottom: 3em;
  }

  .editor-title, .editor-tags{
    text-align: center;
  }

  .ql-container{
    font-size: 1em !important;
  }

  .ql-snow {
    transition: none !important;
  }

  .ql-toolbar {
    width: 45em;
    margin: auto;
    border: none !important;
    box-shadow: 0 0 0.15em lightgray;
    margin-bottom: 0.5em;
  }

  .ql-toolbar svg{
    width: 1.5em;
    height: 1.5em;
  }

  #editor{
    width: 45em;
    margin: auto;
    font-family: "Text Me One", sans-serif;
    border: none;
    box-shadow: 0 0 0.15em lightgray;
  }

  #editor p{
    font-size: 1em;
  }

  #editor p img{
    display: block;
    width: 42.5em;
    max-height: 42.5em;
    margin: auto;
  }

  #editor .ql-video {
    width: 42.5em;
    height: 23.9em;
    margin: auto;
  }

  .ql-formats{
    background-color: white;
  }

</style>
