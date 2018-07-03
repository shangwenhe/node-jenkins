/**
 *  @file: blueOcean.js is a <js> file
 *  @date: File created 2018-07-03 15:41
 *  @author:  shangwenhe
 *  @describ Blueocean client
 */

'use strict';

/**
 * Module dependencies.
 */

var middleware = require('./middleware');
var utils = require('./utils');

function switchWithPipeline(name){
  // tirm 两端的/ 以及内部的多个//// 
  name = name.replace(/^\/*|\/*$/g,'').replace(/\/+/g,'/');
  name = name.split('/').join('/pipelines/');
  return new utils.RawParam('pipelines/' + name);
}
/**
 * Initialize a new `Blueocean` client.
 */

function Blueocean(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Blueocean.meta = {};

/**
 * Blueocean 私有方法
 */
Blueocean.prototype.__base = function(opts, callback) {

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else {
    opts = opts || {};
  }

  this.jenkins._log(['debug', 'blueocean'], opts);

  var req = Object.assign({}, opts);

  req.query = opts.query || {};
  
  return this.jenkins._get(
    req,
    middleware.body,
    callback
  );
}

// 需要在jenkins上空间 blueocean 才可以使用以下的接口
Blueocean.prototype.nodes = function(opts, callback) {
  this.__base({
    params:{
      name: switchWithPipeline(opts.name),
      number: opts.number || 0,
    },
    path: '/blue/rest/organizations/jenkins/{name}/runs/{number}/nodes/',
  } ,callback)
};

// 取得步骤
Blueocean.prototype.steps = function(opts, callback) {
  this.__base({
    params:{
      name: switchWithPipeline(opts.name),
      number: opts.number || 0,
      steps: opts.steps,
    },
    path: '/blue/rest/organizations/jenkins/{name}/runs/{number}/nodes/{steps}/steps/',
  }, callback);
}

// 取得日志信息
Blueocean.prototype.log = function(opts, callback) {
  this.__base({
    params:{
      name: switchWithPipeline(opts.name),
      number: opts.number || 0,
      steps: opts.steps,
      log: opts.log,
    },
    path: '/blue/rest/organizations/jenkins/{name}/runs/{number}/nodes/{steps}/steps/{log}/log/',
  }, callback);
}

exports.Blueocean = Blueocean;
