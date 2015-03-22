var colors = ['red', 'green', 'orange', 'purple', 'yellow'];
var rand = Math.floor(Math.random() * (colors.length + 1));
var color = colors[rand];

function handleTouch(data) {
  if (data.state === 0) {
    drawOthersCircle(data);
  } else if (data.state === 1) {
    moveCircle(data);
  } else if (data.state === 2) {
    console.log('REMOVE NEW');
    $('#' + data.id).remove();
  }
}

function drawOthersCircle(data) {
  var $div = $('<div class="touch" id="'+ data.id +'"></div>');
  console.log(color);
  $div.css({
    'background-color': color,
    'top': data.position.y + '%',
    'left': data.position.x + '%'
  }).show();
  $('body').append($div);
}

function moveCircle(data) {
  $('#' + data.id).css({
    'top' : data.position.y + '%',
    'left' : data.position.x + '%'
  });
}
