// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const lws = require('./lambda-websocket')

exports.handler = function (event, context, callback) {
  lws.setConfig(process.env.CONNECTION_TABLE_NAME, event, context, callback)

  let controller
  try {
    controller = require('./controllers/' + event.requestContext.routeKey)
  } catch (e) {
    return lws.response('Error', 'This route does not define.')
  }

  if (process.env.DEVELOPMENT === 'true') {
    try {
     controller.call(lws)
    } catch (e) {
      lws.response('Error', e.stack)
    }
  } else {
     controller.call(lws)
  }
}