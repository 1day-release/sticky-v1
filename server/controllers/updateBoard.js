module.exports = function () {
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })

  const boardId = this.request.boardId
  
  if (!boardId) {
    return this.response('error', 400, 'BoardId is required.') 
  }

  try {
    DDB.getItem({
      TableName: process.env.BOARD_TABLE_NAME,
      Key: { boardId: { S: boardId } }
    }, (err, updateParams) => {
      if (!err && updateParams.Item) {
        updateParams.TableName = process.env.BOARD_TABLE_NAME
        if (this.request.boardTitle) updateParams.Item.boardTitle = { S: this.request.boardTitle }

        try {
          DDB.putItem(updateParams, (err) => {
            if (err) throw err
            this.response('updateBoard', 200)
          });
        } catch(err) {
          this.response('update', 400, err.stack)
        }
      } else {
        this.response('updateBoard', 404)
      }
    })
  } catch(err) {
    this.response('update', 400, err.stack)
  }
}