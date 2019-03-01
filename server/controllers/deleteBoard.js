module.exports = function () {
    
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  
  const boardId = this.request.boardId
  
  if (!boardId) {
    return this.response('deleteBoard', 400, 'BoardId is required.') 
  }

  try {
    DDB.getItem({
      TableName: process.env.BOARD_TABLE_NAME,
      Key: { boardId: { S: boardId } }
    }, (err, data) => {
      if (!err && data.Item) {
        DDB.deleteItem({
          TableName: process.env.BOARD_TABLE_NAME,
          Key: { boardId: { S: boardId } }
        }, (err, data) => {
          if (!err) {
            this.response('deleteBoard', 200)
          } else {
            this.response('deleteBoard', 400)
          }
        })
      } else {
        this.response('deleteBoard', 404)
      }
    })
  } catch(err) {
    this.response('deleteBoard', 400, err.stack)
  }
}