// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const lws = require('lambda-websocket/index')

exports.connect = function (event, context, callback) {
  lws.setConfig(process.env.TABLE_NAME, event, context, callback)
  lws.connect()
};

exports.disconnect = function (event, context, callback) {
  lws.setConfig(process.env.TABLE_NAME, event, context, callback)
  lws.disconnect()
};
