module.exports = function () {
  const sha512 = require('js-sha512').sha512
  
  const AWS = require('aws-sdk')
  const DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  
  const stickyItem = this.request.stickyItem
  
  if (!stickyItem) {
    return this.response('createBoardSticky', 400, 'stickyItem is required.') 
  }
  
  const boardId = this.request.boardId
  
  if (!boardId) {
    return this.response('createBoardSticky', 400, 'boardId is required.') 
  }
  
  try {
    DDB.getItem({
      TableName: process.env.BOARD_TABLE_NAME,
      Key: { boardId: { S: boardId } }
    }, (err, updateParams) => {
      if (!err && updateParams.Item) {
        updateParams.TableName = process.env.BOARD_TABLE_NAME
        
        const stickies = JSON.parse(updateParams.Item.stickies.S)
        
        // Search empty position
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 100; j++) {
            let exist = false
            stickies.forEach(item => {
              if (item.positionX === j && item.positionY === i) exist = true 
            })
            
            if (!exist) {
              stickyItem.positionX = j
              stickyItem.positionY = i
              break
            }
          }
          if (stickyItem.hasOwnProperty('positionX')) break
        }
        
        if (!stickyItem.hasOwnProperty('positionX')) {
          this.response('createBoardSticky', 400, "Sticky empty position is not exist.")
          return
        }
        
        stickies.push(stickyItem)
        
        updateParams.Item.stickies.S = JSON.stringify(stickies)

        DDB.putItem(updateParams, (err) => {
          if (err) throw err
          this.response('createBoardSticky', 200)
        });
      } else {
        this.response('createBoardSticky', 404)
      }
    })
  } catch(err) {
    this.response('createBoardSticky', 400, err.stack)
  }
}