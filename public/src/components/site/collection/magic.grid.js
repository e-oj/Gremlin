/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */

export default class MagicGrid {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
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

  /**
   * Calculates the width of a column.
   *
   * @return width of a column in the grid
   * @private
   */
  _colWidth(){
    return this.item.outerWidth() + this.gutter;
  }

  /**
   * Initializes an array of empty columns
   * and calculates the leftover whitespace.
   *
   * @return {{cols: Array, wSpace: number}}
   * @private
   */
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

    let wSpace = width - numCols * this._colWidth();

    return {cols, wSpace};
  }

  /**
   * Position each item in the container
   * based on their corresponding column
   * values.
   */
  positionItems(){
    let self = this;
    let {cols, wSpace} = this._setup();

    self.item.each(function(i){
      let min = cols[i % cols.length];
      let left = min.index * self._colWidth() + Math.floor(wSpace/2);
      let $item = $(this);

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

  /**
   * Checks if every item has been loaded
   * in the dom.
   *
   * @return {Boolean} true if every item is present
   */
  ready(){
    return this.container.length > 0 && this.item.length === this.size;
  }

  /**
   * Periodically checks that all items
   * have been loaded in the dom. Calls
   * this.listen() once all the items are
   * present.
   *
   * @private
   */
  _getReady(){
    let self = this;

    let interval = setInterval(function(){
      self.container = $(self.containerClass);
      self.item = $(self.itemClass);

      if(self.ready()){
        clearInterval(interval);

        this.container.css({position: "relative"});
        this.item.css({position: "absolute"});

        self.listen();
      }

    }, 100);
  }

  /**
   * Positions all the items and
   * repositions them whenever the
   * window size changes.
   */
  listen(){
    let self = this;

    if(self.ready()){
      self.positionItems();

      $(window).resize(function(){
        setTimeout(function(){
          self.positionItems();
        }, 200);
      });
    }

    else self._getReady();
  }
}

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
function checkParams(config){
  let required = ["container", "item", "size"];

  for (let prop of required){
    if(!config[prop]){
      throw new Error(`Missing property '${prop}' in MagicGrid config`);
    }
  }
}

/**
 * Finds the longest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */
function getMax(cols){
  let max = cols[0];

  for(let col of cols){
    if(col.height > max.height){
      max = col
    }
  }

  return max;
}
