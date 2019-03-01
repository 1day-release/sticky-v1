module.exports = function () {
  const sha512 = require('js-sha512').sha512
  
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  
  const boardTitle = this.request.boardTitle
  
  if (!boardTitle) {
    return this.response('createBoard', 400, 'BoardTitle is required.') 
  }
  
  const boardId = sha512((new Date()).getTime() + '')
  
  const putParams = {
    TableName: process.env.BOARD_TABLE_NAME,
    Item: {
      boardId: { S: boardId },
      boardTitle: { S: boardTitle },
      stickies: { S: '[]' }
    }
  }
    
  try {
    DDB.putItem(putParams, (err) => {
      if (err) throw err
      this.response('createBoard', 201, {boardId: boardId})
    });
  } catch(err) {
    this.response('createBoard', 400, err.stack)
  }
}