var fs = require('fs');
var http = require('http');
var server = http.createServer();

var sha512 = require('js-sha512').sha512;

server.on('request', function(req, res) {
  console.log(req.url);
  var stream = fs.createReadStream('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});

var io = require('socket.io').listen(server);
server.listen(18000);

var board = {board: []};
var connectNumber = 0;
io.sockets.on('connection', function(socket) {
  connectNumber += 1;
  socket.emit('connect-number', connectNumber);
  socket.broadcast.emit('connect-number', connectNumber);
  socket.on('disconnect', function (data) {
    connectNumber -= 1;
    socket.broadcast.emit('connect-number', connectNumber);
  })

  socket.on('req-create-board', function (data) {
    console.log('create-board', data);
    
    var boardId = sha512((new Date()).getTime() + '');

    board.board.push({
      board_id: boardId,
      board_title: '新規ボード',
      sticky: []
    })

    socket.emit('res-create-board', boardId);
    console.log(board)
    // socket.broadcast.emit('command-out', data);
  });

  socket.on('req-get-board', function (data) {
    console.log('get-board', data);

    boardData = null
    board.board.forEach((value) => {
      if (value.board_id == data.board_id) boardData = value 
    })

    socket.emit('res-get-board', boardData);
    console.log(board)
    // socket.broadcast.emit('command-out', data);
  });

  socket.on('req-add-sticky', function (data) {
    console.log('add-sticky', data);

    boardExistIndex = null
    board.board.forEach((value, index) => {
      if (value.board_id == data.board_id) boardExistIndex = index 
    })

   if (boardExistIndex == null) {
     console.log('Error!!', 'Not exist board')
     return 
   }

    stickyExistIndex = null
    console.log(board.board, boardExistIndex, board.board[boardExistIndex])
    board.board[boardExistIndex].sticky.forEach((value, index) => {
      if (value.sticky_id == data.sticky_data.sticky_id) stickyExistIndex = index 
    })

    if (stickyExistIndex != null) {
      board.board[boardExistIndex].sticky[stickyExistIndex] = data.sticky_data 
    } else {
      board.board[boardExistIndex].sticky.push(data.sticky_data)
    }

    socket.emit('res-get-board', board.board[boardExistIndex]);
    socket.broadcast.emit('res-get-board', board.board[boardExistIndex]);
    // socket.emit('res-get-board', boardData);
    console.log(board)
  });

  socket.on('req-edit-board-title', function (data) {
    console.log('edit-board-title', data);

    boardExistIndex = null
    board.board.forEach((value, index) => {
      if (value.board_id == data.board_id) boardExistIndex = index 
    })

   if (boardExistIndex == null) {
     console.log('Error!!', 'Not exist board')
     return 
   }

    board.board[boardExistIndex].board_title = data.board_title

    socket.emit('res-get-board', board.board[boardExistIndex]);
    socket.broadcast.emit('res-get-board', board.board[boardExistIndex]);
    // socket.emit('res-get-board', boardData);
    console.log(board)
  });
});
