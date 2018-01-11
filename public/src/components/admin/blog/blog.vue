<template>
  <div class="admin-blog">
    <div id="editor"></div>
    <button class="submit" @click="submit">Submit</button>
  </div>
</template>

<script>
  import Quill from "quill"

  export default {
    methods: {
      loadQuill(){
        let link = document.createElement("link");

        link.setAttribute("href", "/node_modules/quill/dist/quill.snow.css");
        link.setAttribute("rel", "stylesheet");

        document.head.appendChild(link);
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
  .admin-blog{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #33334d;
  }

  .admin-blog .submit{
    margin-top: 20px;
  }
  .ql-toolbar{
    width: 900px;
    margin: auto;
  }
  #editor{
    width: 900px;
    margin: auto;
    color: white;
    font-family: "Text Me One", sans-serif;
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
