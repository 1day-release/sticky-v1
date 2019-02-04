const fs = require('fs')
const moment = require('moment')
const request = require('request')
const sha512 = require('js-sha512').sha512
const http = require('http')
const server = http.createServer()

// *************************
// Functions
// *************************
const writeLog = (...arg) => {
  const fileName = arg.shift()
  let text = ''
  arg.forEach((value, index) => {
    text += JSON.stringify(value) + ((arg.length - 1 > index) ? ', ' : '')
  })
  text = moment().format() + ' ' + text + '\n'
  fs.appendFile(fileName, text, 'utf-8', (e) => {
    if (!e) return 
    console.log('Append log error', e)
  })
}
const postSlack = (token, channel, username, text) => {
  var url = 'https://slack.com/api/chat.postMessage?token=' + token + '&channel=' + channel + '&username=' + username + '&text=' + encodeURIComponent(text)
  request(url, function (error, response, body) {
    if (error || response.statusCode != 200) {
      console.log('Post slack error')
    }
  })
}

const postSlackErrorLog = (...arg) => {
  // const channelName = arg.shift()
  let text = ''
  arg.forEach((value, index) => {
    text += JSON.stringify(value) + ((arg.length - 1 > index) ? ', ' : '')
  })
  text = moment().format() + ' ' + text + '\n'
  postSlack('xoxp-379185118336-380773472022-388164489590-22055d7d999c775eeb53628e57c1bd30', 'sticky-error', 'server-error', text)
}

const log = (...arg) => {
  console.log(...arg)

  // arg.unshift('console.log')
  // writeLog(...arg)
}

const errorLog = (...arg) => {
  arg.unshift('Error log')
  console.log(...arg)

  arg[0] = 'error.log'
  writeLog(...arg)

  arg.shift()
  postSlackErrorLog(...arg)
}

const loadBoard = () => {
  let board = {board: []}
  try {
    board = JSON.parse(fs.readFileSync('board.json', 'utf8'))
  } catch (e) {
    // nop
  }
  return board
}

const saveBoard = (board) => {
  try {
    fs.writeFileSync('board.json', JSON.stringify(board))
  } catch (e) {
    errorLog(e + '')
  }
}

const backupBoard = () => {
  try {
    fs.copyFile('board.json', 'board-backup/board-' + moment().format() + '.json', (err) => {
      if (err) errorLog(err + '')
    });
  } catch (e) {
    errorLog(e + '')
  }
}

// *************************
// Main
// *************************
try {
  setInterval(() => {
    backupBoard()
  }, 30 * 60 * 1000) // 30min

  server.on('request', function(req, res) {
    log(req.url)
    let stream = fs.createReadStream('index.html')
    res.writeHead(200, {'Content-Type': 'text/html'})
    stream.pipe(res)
  })

  let io = require('socket.io').listen(server)
  server.listen(5000)

  let board = loadBoard()
  let connectNumber = 0
  io.sockets.on('connection', function(socket) {
    connectNumber += 1
    socket.emit('connect-number', connectNumber)
    socket.broadcast.emit('connect-number', connectNumber)
    socket.on('disconnect', function (data) {
      connectNumber -= 1
      socket.broadcast.emit('connect-number', connectNumber)
    })

    socket.on('req-create-board', function (data) {
      log('create-board', data)

      let boardId = sha512((new Date()).getTime() + '')

      board.board.push({
        board_id: boardId,
        board_title: data.board_title,
        sticky: [],
        sticky_position: []
      })

      socket.emit('res-create-board', boardId)
      log(board)
      saveBoard(board)
    })

    socket.on('req-get-board', function (data) {
      log('get-board', data)

      boardData = null
      board.board.forEach((value) => {
        if (value && value.board_id == data.board_id) boardData = value 
      })

      socket.emit('res-get-board', boardData)
      log(board)
      // socket.broadcast.emit('command-out', data)
    })

    socket.on('req-get-board-list', function (data) {
      log('get-board-list', data)

      boardList = board.board.map((value) => {
        return {
          board_id: value.board_id,
          board_title: value.board_title,
          sticky_count: value.sticky.length
        }
      })

      socket.emit('res-get-board-list', boardList)
      log(board)
      // socket.broadcast.emit('command-out', data)
    })

    socket.on('req-delete-board', function (data) {
      log('delete-board', data)

      boardExistIndex = null
      board.board.forEach((value, index) => {
        if (value && value.board_id == data.board_id) boardExistIndex = index 
      })

      if (boardExistIndex == null) {
        log('Error!!', 'Not exist board')
        return 
      }

      if (data.password !== board.board[boardExistIndex].board_title + '1222') {
        socket.emit('res-delete-board', 'failure')
        return
      }

      board.board.splice(boardExistIndex, 1)
      socket.emit('res-delete-board', 'success')
      // socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      // socket.emit('res-get-board', boardData)
      log(board)
      saveBoard(board)
    })

    socket.on('req-edit-board-title', function (data) {
      log('edit-board-title', data)

      boardExistIndex = null
      board.board.forEach((value, index) => {
        if (value && value.board_id == data.board_id) boardExistIndex = index 
      })

      if (boardExistIndex == null) {
        log('Error!!', 'Not exist board')
        return 
      }

      board.board[boardExistIndex].board_title = data.board_title

      socket.emit('res-get-board', board.board[boardExistIndex])
      socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      // socket.emit('res-get-board', boardData)
      log(board)
      saveBoard(board)
    })

    socket.on('req-add-sticky', function (data) {
      log('add-sticky', data)

      boardExistIndex = null
      board.board.forEach((value, index) => {
        if (value && value.board_id == data.board_id) boardExistIndex = index 
      })

      if (boardExistIndex == null) {
        log('Error!!', 'Not exist board')
        return 
      }

      stickyExistIndex = null
      log(board.board, boardExistIndex, board.board[boardExistIndex])
      board.board[boardExistIndex].sticky.forEach((value, index) => {
        if (value && data.sticky_data && value.sticky_id == data.sticky_data.sticky_id) stickyExistIndex = index 
      })

      if (stickyExistIndex != null) {
        board.board[boardExistIndex].sticky[stickyExistIndex] = data.sticky_data 
      } else {
        // data.sticky_data.sticky_id = sha512((new Date()).getTime() + '')
        board.board[boardExistIndex].sticky.push(data.sticky_data)
      }

      if (data.sticky_position) {
        board.board[boardExistIndex].sticky_position = data.sticky_position
      }

      socket.emit('res-get-board', board.board[boardExistIndex])
      socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      socket.emit('res-get-board', board.board[boardExistIndex])
      socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      // socket.emit('res-get-board', boardData)
      log(board)
      saveBoard(board)
    })

    socket.on('req-edit-sticky-position', function (data) {
      log('edit-sticky-position', data)

      boardExistIndex = null
      board.board.forEach((value, index) => {
        if (value && value.board_id == data.board_id) boardExistIndex = index 
      })

      if (boardExistIndex == null) {
        log('Error!!', 'Not exist board')
        return 
      }

      if (data.sticky_position) {
        board.board[boardExistIndex].sticky_position = data.sticky_position
      }

      socket.emit('res-get-board', board.board[boardExistIndex])
      socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      // socket.emit('res-get-board', boardData)
      log(board)
      saveBoard(board)
    })

    socket.on('req-remove-sticky', function (data) {
      log('remove-sticky', data)

      boardExistIndex = null
      board.board.forEach((value, index) => {
        if (value && value.board_id == data.board_id) boardExistIndex = index 
      })

      if (boardExistIndex == null) {
        log('Error!!', 'Not exist board')
        return 
      }

      if (data.sticky_id) {
        board.board[boardExistIndex].sticky.forEach((value, index) => {
          if (value && value.sticky_id === data.sticky_id) {
            board.board[boardExistIndex].sticky.splice(index, 1)
          }
        })
      }

      socket.emit('res-get-board', board.board[boardExistIndex])
      socket.broadcast.emit('res-get-board', board.board[boardExistIndex])
      // socket.emit('res-get-board', boardData)
      log(board)
      saveBoard(board)
    })
  })
} catch(e) {
  errorLog(e + '')
}
