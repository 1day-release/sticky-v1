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
    return this.response('updateBoardSticky', 400, 'boardId is required.') 
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
          this.response('updateBoardSticky', 404)
          return
        }
        
        if (stickyItem.hasOwnProperty('positionX') && stickyItem.hasOwnProperty('positionY')) {
          const targetPositionX = stickyItem.positionX
          const targetPositionY = stickyItem.positionY
          
          let exist = false
          stickies.forEach(item => {
            if (item.positionX === targetPositionX && item.positionY === targetPositionY) exist = true 
          })
          
          if (exist || targetPositionX >= 100 || targetPositionY >= 100) {
            this.response('createBoardSticky', 400, "Could not be placed in target position.")
            return
          }
          
          stickyItem.positionX = targetPositionX
          stickyItem.positionY = targetPositionY
        } else {
          stickyItem.positionX = stickies[stickyId].positionX
          stickyItem.positionY = stickies[stickyId].positionY
        }
        
        delete stickyItem.stickyId
        
        stickies[stickyId] = stickyItem
        
        updateParams.Item.stickies.S = JSON.stringify(stickies)

        DDB.putItem(updateParams, (err) => {
          if (err) throw err
          this.response('updateBoardSticky', 200)
        });
      } else {
        this.response('updateBoardSticky', 404)
      }
    })
  } catch(err) {
    this.response('updateBoardSticky', 400, err.stack)
  }
}