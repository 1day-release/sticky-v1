module.exports = function () {
  const sha512 = require('js-sha512').sha512
  
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  
  const stickyItem = this.request.stickyItem
  
  if (!stickyItem) {
    return this.response('updateBoardSticky', 400, 'stickyItem is required.') 
  }  
  
  if (!stickyItem.stickyId) {
    return this.response('updateBoardSticky', 400, 'stickyId is required.') 
  }
  const stickyId = stickyItem.stickyId - 1
  
  const boardId = this.request.boardId
  
  if (!boardId) {
    return this.response('deleteBoardSticky', 400, 'boardId is required.') 
  }
  
  try {
    DDB.getItem({
      TableName: process.env.BOARD_TABLE_NAME,
      Key: { boardId: { S: boardId } }
    }, (err, updateParams) => {
      if (!err && updateParams.Item) {
        updateParams.TableName = process.env.BOARD_TABLE_NAME
        
        const stickies = JSON.parse(updateParams.Item.stickies.S)
        
        if (!stickies[stickyId]) {
          this.response('deleteBoardSticky', 404)
          return
        }

        stickies[stickyId].positionX = -1
        stickies[stickyId].positionY = -1
        
        updateParams.Item.stickies.S = JSON.stringify(stickies)

        DDB.putItem(updateParams, (err) => {
          if (err) throw err
          this.response('deleteBoardSticky', 200)
        });
      } else {
        this.response('deleteBoardSticky', 404)
      }
    })
  } catch(err) {
    this.response('deleteBoardSticky', 400, err.stack)
  }
}