/**
 * WebSocket wrapper on Lambda
 * @class LambdaWebSocket
 * @author Passionate Engineer Ryoju <ryoju.builder@gmail.com>
 */
class LambdaWebSocket {

  /**
   * Set config.
   *
   * @param {String} tableName
   * @param {Object} event
   * @param {Object} context
   * @param {Function} callback
   * @memberof LambdaWebSocket
   */
  setConfig (tableName, event, context, callback) {
    this.connectionTableName = tableName
    this.event = event
    this.context = context
    this.callback = callback
    this.connectionId = this.event.requestContext.connectionId

    const AWS = require('aws-sdk');
    AWS.config.update({ region: process.env.AWS_REGION })
    require('./aws-sdk/clients/apigatewaymanagementapi')
    this.apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: this.event.requestContext.domainName + "/" + this.event.requestContext.stage
    });

    this.DDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
    this.request = this.getRequest()
  }

  /**
   * Get connection id.
   *
   * @returns {String} connectionId
   * @memberof LambdaWebSocket
   */
  getConnectionId () {
    return this.connectionId
  }

  /**
   * Connect.
   *
   * @memberof LambdaWebSocket
   */
  connect () {
    const putParams = {
      TableName: this.connectionTableName,
      Item: {
        connectionId: { S: this.connectionId }
      }
    }
    
    this.DDB.putItem(putParams, (err) => {
      this._httpResponse(err ? 400 : 200, err ? "Failure" : "Success")
    });
  }

  /**
   * Disconnect.
   *
   * @memberof LambdaWebSocket
   */
  disconnect () {
    const deleteParams = {
      TableName: this.connectionTableName,
      Key: {
        connectionId: { S: this.connectionId }
      }
    }
    
    this.DDB.deleteItem(deleteParams, (err) => {
      this._httpResponse(err ? 400 : 200, err ? "Failure" : "Success")
    });
  }

  /**
   * Get websocket data.
   *
   * @returns {Any} data
   * @memberof LambdaWebSocket
   */
  getRequest () {
    try {
      return (this.event.body) ? JSON.parse(this.event.body).data : {}
    } catch (e) {
      this._httpResponse(400, "Error: Request does not json format.")
    }
  }
  
  /**
   * Send data.
   *
   * @param {String} action
   * @param {String} data
   * @param {String} [connectionId=Own connection Id]
   * @memberof LambdaWebSocket
   */
  response (action, statusCode, data, connectionId = this.connectionId) {
    const postParams = {
      Data: JSON.stringify({ action: action, statusCode: statusCode, data: data }),
      ConnectionId: connectionId
    }

    try {
      this.apigwManagementApi.postToConnection(postParams, (err) => {
        if (err) {
          console.log("Found stale connection, deleting " + connectionId);
          this.DDB.deleteItem({
            TableName: this.connectionTableName,
            Key: { connectionId: { S: connectionId } }
          }, err => {
            this._httpResponse(400, "Failed to post. Error: " + JSON.stringify(err))
          }); 
        } else {
          this._httpResponse(200, "Success")
        }
      })
    } catch (err) {
      this._httpResponse(400, "Failed to post. Error: " + JSON.stringify(err))
    }
  }

  /**
   * Send data to all connection.
   *
   * @param {String} action
   * @param {String} data
   * @memberof LambdaWebSocket
   */
  responseAll (action, statusCode, data) {
    this._getEveryone().then((everyone) => {
      Promise.all(everyone.map((connectionId) => {
        return new Promise(resolve => {
          const postParams = {
            Data: JSON.stringify({ action: action, statusCode: statusCode, data: data }),
            ConnectionId: connectionId
          }
      
          try {
            this.apigwManagementApi.postToConnection(postParams, (err) => {
              if (err) {
                console.log("Found stale connection, deleting " + connectionId)
                this.DDB.deleteItem({
                  TableName: this.connectionTableName,
                  Key: { connectionId: { S: connectionId } }
                }, () => {
                  resolve()
                })
              } else {
                resolve()
              }
            })
          } catch (e) {
            resolve()
          }
        })
      })).then(res => {
        this._httpResponse(200, "Success")
      })
    })
  }

  /**
   * Send response.
   *
   * @param {Number} statusCode
   * @param {Any} body
   * @memberof LambdaWebSocket
   */
  _httpResponse (statusCode, body) {
    this.callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(body)
    });
  }

  /**
   * Get evenyone.
   *
   * @returns {Array} everyone
   * @memberof LambdaWebSocket
   */
  _getEveryone () {
    return new Promise((resolve) => {
      const scanParams = {
        TableName: this.connectionTableName,
        ProjectionExpression: "connectionId"
      };

      this.DDB.scan(scanParams, (err, data) => {
        if (err || !data.Items) {
          resolve([])
        } else {
          console.log(data.Items)
          resolve(data.Items.map((item) => {
            return item.connectionId.S
          }))
        }
      })
    })
  }
}

module.exports = new LambdaWebSocket()
