module.exports = function () {
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  
  const boardId = this.request.boardId
  
  if (!boardId) {
    return this.response('getBoard', 400, 'BoardId is required.') 
  }

  try {
    DDB.getItem({
      TableName: process.env.BOARD_TABLE_NAME,
      Key: { boardId: { S: boardId } }
    }, (err, data) => {
      if (!err && data.Item) {
        let stickies = JSON.parse(data.Item.stickies.S)
        stickies = stickies.map((item, index) => {
          item.stickyId = index + 1
          return (item.positionX === -1 && item.positionY === -1) ? null : item
        }).filter(item => !!item)
        
        const item = {
          boardId: data.Item.boardId,
          boardTitle: data.Item.boardTitle.S,
          stickies: stickies
        }
        
        this.response('getBoard', 200, item)
      } else {
        this.response('getBoard', 404)
      }
    });
  } catch(err) {
    this.response('getBoard', 400, err.stack)
  }
}