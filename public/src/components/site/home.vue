<template>
  <div class="home">
    <nav-bar is-fixed="true"></nav-bar>

    <div class="nav-ghost"></div>

    <div class="content-wrapper">
      <div class="content">

        <div class="intro">
          Emmanuel Olaojo (<a href="https://github.com/e-oj"
                              target="_blank">@e-oj</a>)
        </div>

        <div class="splash">
          <div class="splash-text" v-for="trait in traits" :key="trait">
            <span class="highlight-text">{{trait}}</span>
          </div>
        </div>

        <div class="links">
          <a href="https://github.com/e-oj" target="_blank">
            <i class="fab fa-github github-logo"></i>
          </a>

          <a href="https://www.linkedin.com/in/emmanuel-olaojo/" target="_blank">
            <i class="fab fa-linkedin linkedin-logo"></i>
          </a>

          <a href="https://medium.com/@emmanuelolaojo" target="_blank">
            <i class="fab fa-medium medium-logo"></i>
          </a>
        </div>

      </div>

      <div class="oj-image">
        <img src="/src/assets/img/oj.png" onerror="this.style.display = 'none'">
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./nav.vue";

const DEFAULT_TEXT = "I'm a full-stack developer and Computer " +
    "Science major at Rochester Institute of Technology. Check out " +
    "my work on Github, follow me on Medium or connect on LinkedIn.";

export default{
  data(){
    return {
      text: "",
      traits: []
    };
  },

  components: {
    "nav-bar": Nav
  },

  methods: {
    /**
     * Generates a single item from a list along
     * with an index representing it's position
     * in a list of length 3.
     *
     * @return {IterableIterator<{text: string, index: number}>}
     */
    *genTraits(){
      let index = 0;
      let partition = 3; // three traits per section
      let traits = [
        "Full-stack Developer", "Entrepreneur", "Lifelong Learner",
        "Growth Mindset", "Creative Problem Solver", "Team Player",
        "Open-source Enthusiast", "Manchester United Fan", "Humanitarian",
        "Humorist", "Environmental Advocate", "Nigerian Citizen"
      ];

      while (index < traits.length){
        yield {text: traits[index], index: index % partition};

        if (++index === traits.length) index = 0;
      }
    },

    /**
     * Adds a generated trait to the list
     * of traits at the specified index.
     *
     * @param traits - Trait generator
     */
    newTrait(traits){
      let trait = traits.next().value;

      this.traits.splice(trait.index, 1, trait.text);
    },

    /**
     * Track all the links on the
     * homepage with google analytics
     */
    analytics(){
      let self = this;
      let anchors = [
        {selector: ".intro a", type: "Title Link"},
        {selector: ".links a", type: "Icon Link"}
      ];

      for (let a of anchors){
        $(a.selector).click(function(){
          let url = $(this).attr("href");
          self.$ga.event(`Home - ${a.type}`, "open", url);
        });
      }
    }
  },

  async created(){
    let self = this;
    let traits = self.genTraits();
    let partition = 3;
    let i = 0;

    // Generate first set of traits
    while(i++ < partition){
      self.newTrait(traits);
    }

    // Get a new trait every 2 seconds
    setInterval(() => {self.newTrait(traits);}, 2000);

    try{
      let res = await self.$http.get("/api/h");

      self.text = res.body.result.home.text;
    }
    catch(err){
      self.text = DEFAULT_TEXT;
    }

    // analytics
    self.$nextTick(() => self.analytics());
  },
};
</script>

<style scoped>
  .nav-ghost{
    height: 100px;
    flex-shrink: 0;
    opacity: 0;
  }

  .home{
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    min-height: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .content-wrapper{
    width: 100%;
    height: 70vh;
    min-height: fit-content;
    min-height: -moz-fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content, .oj-image{
    height: 600px;
  }

  .content{
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    min-height: 450px;
    margin-right: 50px;
  }

  .content div{
    background-color: white;
  }

  .content .intro{
    width: fit-content;
    width: -moz-fit-content;
    padding: 15px;
    font-family: "Assistant", cursive;
    font-size: 30px;
    font-weight: bold;
    color: #24292e;
  }

  .content .intro a{
    font-family: Acme, cursive;
    text-decoration: none;
  }

  .content .intro a:hover{
    background-color: #f2f2f2;;
  }

  .content .splash{
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-evenly;
    height: 300px;
  }

  .content .splash-text{
    width: 350px;
    flex-shrink: 0;
    padding: 15px;
    font-family: Quicksand, sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    color: #24292e;
    background-color: #f2f2f2;
  }

  .content .highlight-text{
    background-color: #b5e3cf;
    color: black;
    padding: 8px;
  }

  .content .links{
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content .links a{
    flex-shrink: 0;
    width: fit-content;
    width: -moz-fit-content;
    height: 35px;
    padding: 15px;
  }

  .content .links a svg{
    width: 35px;
    height: 35px;
    transition: all 0.2s linear;
  }

  .content .links a:hover svg{
    color: #42b983;
  }

  .oj-image{
    width: fit-content;
    width: -moz-fit-content;
    min-height: 450px;
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  .oj-image img{
    height: 100%;
  }

  .github-logo{
    color: #24292e;
  }

  .linkedin-logo{
    color: #0177B5;
  }

  .medium-logo{
    color: #24292e;
  }

  @media screen and (max-width: 1500px){
    .home{
      min-height: 400px;
    }

    .content, .oj-image{
      height: 450px;
      min-height: 350px;
    }

    .content .intro{
      font-size: 28px;
      padding: 10px;
    }

    .content .splash{
      height: 240px;
    }

    .content .splash-text{
      font-size: 14px;
      padding: 10px;
    }

    .content .highlight-text{
      padding: 5px;
    }

    .content .links a{
      height: 30px;
      padding: 10px;
    }

    .content .links a svg{
      width: 30px;
      height: 30px;
    }
  }

  @media screen and (max-width: 1000px){
    .oj-image{
      display: none;
    }

    .content{
      margin-right: 0;
    }

    .content .splash-text{
      width: 300px;
    }
  }

  @media screen and (max-width: 640px){
    .content{
      height: 250px;
    }

    .content .intro{
      font-size: 25px;
    }

    .content .splash{
      height: 190px;
    }

    .content .splash-text{
      font-size: 12px;
      width: 260px;
    }
  }

</style>
