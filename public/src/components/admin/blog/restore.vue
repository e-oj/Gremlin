<template>
  <div class="admin-restore">
    <div class="admin-restore-msg">
      {{msg}}
    </div>

    <div class="admin-restore-actions">
      <button @click="restore">
        <i class="fas fa-check-circle"></i> Yes
      </button>

      <button @click="exit">
        <i class="fas fa-times-circle"></i> No
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
          self.err = err.body.message;
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

<style>
  .admin-restore{
    background-color: white;
    position: absolute;
    width: 200px;
    height: 100px;
    margin: auto;
    padding: 5px;
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: 0 0 2px lightgray;
  }

  .admin-restore-actions{
    display: flex;
    justify-content: space-evenly;
    font-size: 12px;
  }

  .admin-restore-actions button{
    width: 80px;
    box-shadow: 0 0 2px lightgray;
  }
</style>
