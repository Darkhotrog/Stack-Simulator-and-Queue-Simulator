$(document).ready(function () {
  let stack = [];

  function updateDisplay() {
    $('#stack-container').empty();
    // Render from top (last item) to bottom (first item)
    for (let i = stack.length - 1; i >= 0; i--) {
      let label = (i === stack.length - 1) ? ' [TOP]' : '';
      let $block = $('<div>')
        .addClass('block')
        .attr('id', 'block-' + i)
        .text(stack[i] + label);
      $('#stack-container').append($block);
    }
  }

  function showMessage(msg) {
    $('#message').text(msg);
  }

  function clearMessage() {
    $('#message').text('');
  }

  // PUSH: Add to top of stack
  $('#btn-push').click(function () {
    clearMessage();
    let val = $('#stack-input').val().trim();
    if (val === '') {
      showMessage('Please enter a value to push.');
      return;
    }
    stack.push(val);
    $('#stack-input').val('');
    updateDisplay();
  });

  // POP: Remove top of stack
  $('#btn-pop').click(function () {
    clearMessage();
    if (stack.length === 0) {
      showMessage('Cannot pop: Stack is empty!');
      return;
    }
    let poppedVal = stack.pop();
    updateDisplay();

    let $deletedBlock = $('<div>')
      .addClass('block deleted-block')
      .text(poppedVal);
    $('#deleted-container').prepend($deletedBlock);
  });

  // PEEK: Highlight top element
  $('#btn-peek').click(function () {
    clearMessage();
    $('.block').removeClass('peeked');
    if (stack.length === 0) {
      showMessage('Cannot peek: Stack is empty!');
      return;
    }
    // Top element is at index 0 in rendered container
    $('#stack-container .block').first().addClass('peeked');
  });

  // CLEAR: Reset everything
  $('#btn-clear').click(function () {
    clearMessage();
    stack = [];
    updateDisplay();
    $('#deleted-container').empty();
  });
});