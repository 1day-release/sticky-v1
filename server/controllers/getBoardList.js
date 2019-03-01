module.exports = function () {
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })

  try {
    DDB.scan({
      TableName: process.env.BOARD_TABLE_NAME
    }, (err, data) => {
      if (!err && data.Items) {
        const items = data.Items.map(item => {
          return {
            boardId: item.boardId.S,
            boardTitle: item.boardTitle.S
          }
        })
        this.response('getBoardList', 200, items)
      } else {
        this.response('getBoardList', 200, [])
      }
    });
  } catch(err) {
    this.response('getBoardList', 400, err.stack)
  }
}