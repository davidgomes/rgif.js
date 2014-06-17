var RGif = (function() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function preloadImage(name) {
    var image = new Image();
    image.src = name;
  }
  
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

    stop: function() {
      clearTimeout(this.timeout);

      return this;
    }
  };

  return constructor;
}());
