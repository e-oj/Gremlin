/**
 * @author emmanuelolaojo
 * @since 12/9/18
 */

function Slider(selector){
  var self = this;
  self.container = document.querySelector(selector);
  self.slides = self.container.children;
  self.next = 1;

  var firstSlide = self.slides[0];
  var style;
  var img;

  if(!firstSlide){
    throw new Error("No slides in the dom!");
  }

  self.container.style.position = "relative";
  self.container.style.height = "100%";
  self.container.style.overflow = "hidden";


  for(var i = 0; i < self.slides.length; i++){
      style = self.slides[i].style;
      style.height = "100%";
      style.width = "100%";
      style.position = "absolute";
      style.left = self.slides[i] === firstSlide ? "0" : slideOut(self.slides[i], -1);
      style.opacity = self.slides[i] === firstSlide ? "1" : "0";
      style.transition = "left linear 0.8s, opacity linear 0.2s";

      img = document.createElement("img");
      img.src = self.slides[i].getAttribute("data-src");
      img.style.width = "100%";
      img.style.height = "100%";

      self.slides[i].appendChild(img);
  }

  setInterval(function(){
    self.transition();
  }, 8000);
}

Slider.prototype.transition = function(){
  var next = this.next % this.slides.length;
  var currSlide = this.slides[this.next - 1];
  var nextSlide = this.slides[next];

  currSlide.style.left = slideOut(currSlide);
  nextSlide.style.opacity = "1";
  nextSlide.style.right = "auto";
  nextSlide.style.left = slideIn();


  setTimeout(function(){
    currSlide.style.left = "auto";
    currSlide.style.right = slideOut(currSlide);
    currSlide.style.left = slideOut(currSlide, -1);
    currSlide.style.opacity = "0";
  }, 1500);


  this.next = next + 1;
};

function slideIn() {
  return "0px";
}

function slideOut(slide, factor){
  factor = factor || 1;

  return factor * slide.getBoundingClientRect().width + "px";
}
