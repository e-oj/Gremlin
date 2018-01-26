<template>
  <div class="admin-editor">
    <input class="editor-tags" v-model="tags" type="text" placeholder="comma-separated tags">
    <input class="editor-title" v-model="post.title" type="text" placeholder="Title">
    <div id="editor"></div>
    <div class="editor-submit">
      <button class="submit" @click="publish">
        <i class="fab fa-telegram-plane"></i> Publish
      </button>
      <button class="submit" @click="draft">
        <i class="fas fa-save"></i> Save
      </button>
    </div>
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
        }
      }
    },

    methods: {
      loadQuill(){
        let link = document.createElement("link");

        link.setAttribute("href", "/node_modules/quill/dist/quill.snow.css");
        link.setAttribute("rel", "stylesheet");

        document.head.appendChild(link);
      },

      publish(){

      },

      submit(){
        let self = this;

        console.log(self.quill.getContents());
        console.log(self.quill.getText());
        console.log($(".ql-editor").html());
      }
    },

    created(){
      let self = this;

      self.loadQuill();
    },

    mounted(){
      let self = this;
      let Font = Quill.import("formats/font");

      Font.whitelist = ["Text Me One"];
      Quill.register(Font, true);

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
    width: 8em;
  }

  .admin-editor .submit:last-child{
    margin-right: 0;
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

  .ql-toolbar{
    width: 900px;
    margin: auto;
  }

  #editor{
    width: 900px;
    margin: auto;
    font-family: "Text Me One", sans-serif;
    font-weight: 700;
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
