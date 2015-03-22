function handleTouch(data) {
  if (data.state === 0) {
    drawOthersCircle(data);
  } else if (data.state === 1) {

  } else if (data.state === 2) {
    console.log('REMOVE NEW');
    $('#' + data.id).remove();
  }
}

function drawOthersCircle(data) {
  console.log('DRAW NEW');
  var colors = ['red', 'green', 'orange', 'purple', 'yellow'];
  var $div = $('<div class="touch" id="'+ data.id +'"></div>');
  var rand = Math.floor(Math.random() * (colors.length + 1));
  $div.css({
    'background-color' : colors[Math.random() * colors.length],
    'top' : data.position.y,
    'left' : data.position.x
  }).show();
  $('body').append($div);
}
