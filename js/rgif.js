var RGif = (function() {

  /* Returns a random integer between 'min' and 'max' */
  function getRandomInt(min, max) {    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* Pre loads a given image with path 'name' */
  function preloadImage(name) {
    var image = new Image();
    image.src = name;
  }

  /* Sets up the library variables and preloads all the images */
  function constructor(id, images, range) {
    this.id = id;
    this.element = document.getElementById(this.id);
    this.images = images;
    this.range = range;
    this.currentImageIndex = 0;
    this.timeout = undefined;

    for (var i = 0; i < this.images.length; i++) {
      preloadImage(this.images[i]);
    }
  }

  constructor.prototype = {
    /* Sets up a timer to get the image running */
    start: function() {
      var updateImage = (function() {
        this.element.src = this.images[++this.currentImageIndex];

        if (this.currentImageIndex === this.images.length - 1) {
          this.currentImageIndex = 0;
        }

        this.timeout = setTimeout(updateImage, getRandomInt(this.range[0], this.range[1]));
      }).bind(this);

      updateImage();

      return this;
    },

    /* Stops the image from skipping */
    stop: function() {
      clearTimeout(this.timeout);

      return this;
    }
  };

  return constructor;
}());
