//YOUR CODE HERE:
class App {
  constructor () {

  }
  
  init() {
    fetch();
  }

  send(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: undefined,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  }

  clearMessages() {
    $('#chats').empty();
  }

  handleUsernameClick() {

  }

  handleSubmit() {
    debugger
  }

  renderMessage(message) {
    $('#chats').append('<div class = "chat username"> ' 
      + '<div class="username" onclick="app.handleUsernameClick()">' + message.username + '</div>'
      + '<div>' + message.text + '</div>'
      + '<div>' + message.roomname + '</div>'
      + '</div>');
  }

  renderRoom(room) {
    $('#roomSelect').append('<p>' + room + '</p>');
  }
}

var app = new App();
