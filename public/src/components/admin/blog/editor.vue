<template>
  <div class="admin-editor">
    <input class="editor-tags" v-model="post.tags" type="text" placeholder="comma-separated tags">
    <input class="editor-title" v-model="post.title" type="text" placeholder="Title">

    <div id="editor"></div>

    <div class="editor-submit">
      <button class="submit" @click.preventDefault="publish">
        <i class="far fa-caret-square-right"></i> Publish
      </button>
      <button class="submit" @click.preventDefault="save">
        <i class="far fa-hdd"></i> Save
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
    }
  }
</script>

<style>

  .admin-editor{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #33334d;
  }

  .admin-editor .submit{
    margin-top: 20px;
    box-shadow: 0 0 3px lightgray;
  }

  .admin-editor .submit:last-child{
    margin-right: 0;
  }

  .admin-editor .submit i{
    color: #42b983;
  }

  .admin-editor .err, .admin-editor .msg{
    margin: 20px;
  }

  .admin-editor input{
    font-family: "Text Me One", sans-serif;
  }

  .admin-editor input::placeholder{
    opacity: 0.6;
  }

  .editor-title{
    font-size: 1.2em;
    width: 600px;
    margin: 40px;
  }

  .editor-tags{
    width: 600px;
    font-size: 1em;
  }

  .editor-title, .editor-tags{
    text-align: center;
    font-weight: 900;
  }

  .ql-snow {
    transition: none !important;
  }

  .ql-toolbar {
    width: 900px;
    margin: auto;
    border: none !important;
    box-shadow: 0 0 3px lightgray;
    margin-bottom: 10px;
  }

  #editor{
    width: 900px;
    margin: auto;
    font-family: "Text Me One", sans-serif;
    font-weight: 700;
    border: none;
    box-shadow: 0 0 3px lightgray;
  }

  #editor p{
    font-size: 1.7em;
  }

  #editor img{
    width: 500px;
    max-height: 500px;
  }

  .ql-formats{
    background-color: white;
  }

</style>
