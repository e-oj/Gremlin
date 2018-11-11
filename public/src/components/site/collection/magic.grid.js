/**
 * @author emmanuelolaojo
 * @since 11/10/18
 */

export default class MagicGrid {
  constructor(config){
    checkParams(config);

    this.containerClass = config.container;
    this.itemClass = config.container + " " + config.item;
    this.container = $(config.container);
    this.item = $(this.itemClass);
    this.size = config.size;
    this.gutter = config.gutter || 25;
    this.maxCols = config.maxCols || 2;

    if(this.ready()){
      this.container.css({position: "relative"});
      this.item.css({position: "absolute"});
    }
  }

  _colWidth(){
    return this.item.outerWidth() + this.gutter;
  }

  _setup(){
    let width = this.container.outerWidth();
    let numCols = Math.floor(width/this._colWidth()) || 1;
    let cols = [];

    if(numCols > this.maxCols){
      numCols = this.maxCols;
    }

    for(let i = 0; i < numCols; i++){
      cols[i] = {height: 0, top: 0, index: i}
    }

    let blank = width - numCols * this._colWidth();

    return {cols, blank};
  }

  positionItems(){
    let self = this;
    let {cols, blank} = this._setup();

    self.item.each(function(i){
      let min = cols[i % cols.length];
      let left = min.index * self._colWidth();
      let $item = $(this);

      left += Math.floor(blank/2);

      $item.css({
        left: left + "px",
        top: min.height + min.top + "px"
      });

      min.height += min.top + $item.outerHeight();
      min.top = self.gutter;
    });

    self.container.css({
      height: getMax(cols).height,
    });
  }

  ready(){
    return this.container.length > 0 && this.item.length === this.size;
  }

  _getReady(){
    let self = this;

    let interval = setInterval(function(){
      self.container = $(self.containerClass);
      self.item = $(self.itemClass);

      console.log(self.item.length, self.ready());

      if(self.ready()){
        clearInterval(interval);

        this.container.css({position: "relative"});
        this.item.css({position: "absolute"});

        self.listen();
      }

    }, 100);
  }

  listen(){
    let self = this;

    if(self.ready()){
      console.log("Ready");
      self.positionItems();

      $(window).resize(function(){
        self.positionItems();
      });
    }

    else self._getReady();
  }
}

function checkParams(config){
  let required = ["container", "item", "size"];

  for (let prop of required){
    if(!config[prop]){
      throw new Error(`Missing property '${prop}' in MagicGrid config`);
    }
  }
}

function getMax(cols){
  let max = cols[0];

  for(let col of cols){
    if(col.height > max.height){
      max = col
    }
  }

  return max;
}

