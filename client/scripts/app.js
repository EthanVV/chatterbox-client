//YOUR CODE HERE:
var app = {
    server : 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    username: 'anonymous',
    roomname: 'lobby'
}


  app.init = () => {
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');
    app.lastMessageId = 0;

    app.fetch();
  }

  app.send = (message) => {
    console.log('sending...')
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

  app.fetch = () => {
    console.log('fetchin...');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      // url:  app.server,
      url: app.server,   
      type: 'GET',
      contentType: 'application/json',
      // data: null,
      success: function (data) {
        console.log('chatterbox: Message received', data);
        if (!data.results || !data.results.length) { return;}
        app.messages = data.results;

        var mostRecentMessage = app.messages[app.messages.length - 1];
        if(mostRecentMessage.objectID !== app.lastMessageId) {
          app.$chats.html('');
          for( var i=0;  i<app.messages.length; i++) {
            var $chat = $('<div class="chat"/>');
            var $username = $('<span class ="username">' + app.messages[i].text + '</span>');
            $username.appendTo();
            var $message = $('<br><span>' + app.messages[i].text + '</span>');
            $message.appendTo($chat);
            app.$chats.append($chat);
          }
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  }


  app.clearMessages = () => {
    $('#chats').empty();
  }

  app.handleUsernameClick = () => {
  }

  app.handleSubmit = () => {
    console.log('submit reached');
  }

  app.renderMessage = (message) => {
    $('#chats').append('<div class = "chat username"> ' 
      + '<div class="username" onclick="app.handleUsernameClick()">' + message.username + '</div>'
      + '<div>' + message.text + '</div>'
      + '<div>' + message.roomname + '</div>'
      + '</div>');
  }

  app.renderRoom = (room) => {
    $('#roomSelect').append('<p>' + room + '</p>');
  }

