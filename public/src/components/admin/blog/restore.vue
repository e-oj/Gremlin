<template>
  <div class="admin-dialog admin-restore">
    <div class="admin-dialog-msg">
      {{msg}}
    </div>

    <div class="admin-dialog-actions">
      <button @click="restore">
        <i class="far fa-check"></i>
      </button>

      <button @click="exit">
        <i class="far fa-times"></i>
      </button>
    </div>

    <div class="err">{{err}}</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        err: "",
        msg: "Restore Post?"
      }
    },

    props: ["post"],

    methods: {

      /**
       * Closes this component
       */
      exit(){
        this.$parent.toRestore = "";
      },

      /**
       * Sends a delete request to the api
       * and removes the deleted post from the
       * list of posts.
       */
      async restore(){
        let self = this;

        try{
          await self.$http.put("/api/b/restore", {_id: self.post._id});

          self.post.deleted = false;
          self.exit();
        }
        catch(err){
          self.err = err.message;
        }
      },
    },

    /**
     * This component gets placed on the post that
     * summoned it.
     */
    mounted(){
      let $self = $(".admin-restore");
      let margin = 40;
      let top = $(`.${this.post._id}`).offset().top - $self.height() - margin;

      $self.css({top});
    }
  }
</script>
