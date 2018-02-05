<template>
  <div class="admin-posts">
    <div class="admin-post" v-for="post in posts" :key="post._id">
      <div class="admin-post-title">{{post.title}}</div>

      <div class="admin-post-text">{{textPreview(post.text)}}</div>

      <div class="admin-post-tags">
        <span v-for="tag in post.tags">{{tag}}</span>
      </div>

      <div class="admin-post-date">
        <span v-if="post.draft">In Progress . . .</span>
        <span v-else>{{formatDate(post.createdAt)}}</span>
      </div>

      <div class="admin-post-action">
        <span class="admin-post-edit" @click="editPost(post)">
          <i class="far fa-edit"></i>
        </span>
        <span class="admin-post-delete"><i class="far fa-trash-alt"></i></span>
      </div>
    </div>

    <div v-if="!hasPosts" class="admin-no-posts">{{msg}}</div>
  </div>
</template>

<script>
  const PREVIEW_LENGTH = 300;

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
      /**
       * Shortens text greater than a max length
       * and adds ellipsis.
       *
       * @param text the full length text
       *
       * @returns shortened text + ellipsis
       */
      textPreview(text){
        if(text.length > PREVIEW_LENGTH){
          text = text.substr(0, PREVIEW_LENGTH) + "  .  .  .";
        }

        return text;
      },

      /**
       * Formats the date as "MM.DD.YY hh:mm"
       * @param dateString
       * @returns {string|*}
       */
      formatDate(dateString){
        let date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = "am";

        if(hours === 24){
          hours = 12;
        }
        else if(hours >= 12){
          period = "pm";

          if(hours > 12){
            hours = hours % 12;
          }
        }

        dateString = date.toDateString().substring(4);
        dateString = dateString.split(" ").join(".") + ` ${hours}:${minutes}  ${period}`;

        return dateString;
      },

      editPost(post){
        let parent = this.$parent;

        parent.toEdit = post;
        parent.showEditor = true;
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
  .admin-posts {
    width: 900px;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    font-family: "Quicksand", sans-serif;
  }

  .admin-post{
    padding: 10px;
    border-top: 1px solid lightgrey;
  }

  .admin-post:last-child{
    border-bottom: 1px solid lightgrey;
  }

  .admin-post-title{
    margin-top: 3px;
    margin-bottom: 15px;
    font-size: 19px;
    font-weight: 900;
  }

  .admin-post-text{
    font-size: 17px;
  }

  .admin-post-tags{
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .admin-post-tags span{
    margin-right: 5px;
    font-size: 15px;
    font-style: italic;
    text-decoration: underline;
  }

  .admin-post-date{
    font-size: 13px;
    color: blue;
    margin: 15px 0 15px 0;
  }

  .admin-post-action{
    display: flex;
    font-size: 15px;
  }

  .admin-post-action span{
    margin-right: 20px;
    cursor: pointer;
  }

  .admin-post-action span:hover{
    color: green;
  }

  .admin-post-edit{
    color: #9900ff;
  }

  .admin-post-delete{
    color: red;
  }
</style>
