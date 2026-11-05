$(document).ready(function () {
  let queue = [];

  function updateDisplay() {
    $('#queue-container').empty();
    // Render from Front (index 0) to Rear (index queue.length - 1)
    for (let i = 0; i < queue.length; i++) {
      let tag = '';
      if (i === 0 && i === queue.length - 1) {
        tag = ' [FRONT & REAR]';
      } else if (i === 0) {
        tag = ' [FRONT]';
      } else if (i === queue.length - 1) {
        tag = ' [REAR]';
      }

      let $block = $('<div>')
        .addClass('block')
        .text(queue[i] + tag);
      $('#queue-container').append($block);
    }
  }

  function showMessage(msg) {
    $('#message').text(msg);
  }

  function clearMessage() {
    $('#message').text('');
  }

  // ENQUEUE: Add to rear (end of array)
  $('#btn-enqueue').click(function () {
    clearMessage();
    let val = $('#queue-input').val().trim();
    if (val === '') {
      showMessage('Please enter a value to enqueue.');
      return;
    }
    queue.push(val);
    $('#queue-input').val('');
    updateDisplay();
  });

  // DEQUEUE: Remove from front (start of array - FIFO)
  $('#btn-dequeue').click(function () {
    clearMessage();
    if (queue.length === 0) {
      showMessage('Cannot dequeue: Queue is empty!');
      return;
    }
    let dequeuedVal = queue.shift(); // FIFO removal
    updateDisplay();

    let $deletedBlock = $('<div>')
      .addClass('block deleted-block')
      .text(dequeuedVal);
    $('#deleted-container').prepend($deletedBlock);
  });

  // PEEK: Highlight front element without removing
  $('#btn-peek').click(function () {
    clearMessage();
    $('.block').removeClass('peeked');
    if (queue.length === 0) {
      showMessage('Cannot peek: Queue is empty!');
      return;
    }
    // Front element is the first rendered block
    $('#queue-container .block').first().addClass('peeked');
  });

  // CLEAR: Reset queue and displays
  $('#btn-clear').click(function () {
    clearMessage();
    queue = [];
    updateDisplay();
    $('#deleted-container').empty();
  });
});