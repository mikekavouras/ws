var ID = guid();

function Touch(e, $touch) {
  this.$elem = $(window);
  this.$touch = $touch;
  this.touchStart(e);

  var self = this;
  this.$elem.bind('touchmove', function(e) {
    self.touchMove(e.originalEvent);
  });
  this.$elem.bind('touchend', function(e) {
    self.touchEnd(e.originalEvent);
  });
}

Touch.prototype = {
  touchStart: function(e) {
    var data = JSON.stringify({
      state: 0,
      position: { x: e.pageX - 40, y: e.pageY - 40 },
      id: ID
    });
    ws.send(data);
    this.$touch[0].style.left = (e.pageX - 40) + 'px';
    this.$touch[0].style.top = (e.pageY - 40) + 'px';
    this.$touch.show();
  },

  touchMove: function(e) {
    var data = JSON.stringify({
      state: 1,
      position: {x: e.pageX - 40, y: e.pageY - 40},
      id: ID
    });
    ws.send(data);
    this.$touch[0].style.left = (e.pageX - 40) + 'px';
    this.$touch[0].style.top = (e.pageY - 40) + 'px';
  },

  touchEnd: function(e) {
    this.$touch.hide();
    ws.send(JSON.stringify({state: 2, id: ID}));
    this.$elem.unbind('touchmove');
    this.$elem.unbind('touchend');
  }
};

$(document).ready(function() {
  var $touch = $('.touch');
  $(window).bind('touchstart', function(e) {
    e.preventDefault();
    new Touch(e.originalEvent, $touch);
  });
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
