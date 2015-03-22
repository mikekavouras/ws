var ID = guid();
var width = window.innerWidth;
var height = window.innerHeight;

function Touch(e, $touch) {
  this.$elem = $(window);
  this.$touch = $touch;
  this.touchStart(e);

  var self = this;
  this.$elem.bind('touchmove mousemove', function(e) {
    self.touchMove(e.originalEvent);
  });
  this.$elem.bind('touchend mouseup', function(e) {
    self.touchEnd(e.originalEvent);
  });
}

Touch.prototype = {
  touchStart: function(e) {
    var offset = {x: e.pageX - 40, y: e.pageY - 40};
    var perc = {x: offset.x / width * 100,  y: offset.y / height * 100};
    var data = JSON.stringify({
      state: 0,
      position: { x: perc.x, y: perc.y },
      id: ID
    });
    ws.send(data);
    this.$touch[0].style.left = perc.x + '%';
    this.$touch[0].style.top = perc.y + '%';
    this.$touch.show();
  },

  touchMove: function(e) {
    var offset = {x: e.pageX - 40, y: e.pageY - 40};
    var perc = {x: offset.x / width * 100,  y: offset.y / height * 100};
    var data = JSON.stringify({
      state: 1,
      position: {x: perc.x, y: perc.y},
      id: ID
    });
    ws.send(data);
    this.$touch[0].style.left = perc.x + '%';
    this.$touch[0].style.top = perc.y + '%';
  },

  touchEnd: function(e) {
    this.$touch.hide();
    ws.send(JSON.stringify({state: 2, id: ID}));
    this.$elem.unbind('touchmove mousemove');
    this.$elem.unbind('touchend mouseup');
  }
};

$(document).ready(function() {
  var $touch = $('.touch');
  $(window).bind('touchstart mousedown', function(e) {
    e.preventDefault();
    new Touch(e.originalEvent, $touch);
  });
  width = window.innerWidth;
  height = window.innerHeight;
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
