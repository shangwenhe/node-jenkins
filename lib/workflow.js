/**
 * Workflow client
 */

'use strict';

/**
 * Module dependencies.
 */

var middleware = require('./middleware');
var utils = require('./utils');

/**
 * Initialize a new `Workflow` client.
 */

function Workflow(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Workflow.meta = {};

/**
 * Trigger job build
 */

Workflow.prototype.describe= function(opts, callback) {

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    var req = { name: 'Workflow.describe' };
    req.path = '{folder}/{number}/wfapi/describe';
    req.params = { folder: folder.path(), number: opts.number };
    req.query = opts.query || {};
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }
  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};

Workflow.prototype.logs = function (opts, callback){

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (opts.number) throw new Error('number required');
    var req = { name: 'Workflow.log' };
    req.path = '{folder}/{number}/consoleText';
    req.params = { folder: folder.path(), number: opts.number};
    req.query = opts.query || {};
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }
  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};


Workflow.prototype.node_log = function (opts, callback){

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (opts.id) throw new Error('id required');
    if (opts.number) throw new Error('number required');
    var req = { name: 'Workflow.node_log' };
    req.path = '{folder}/{number}/execution/node/{id}/wfapi/log';
    req.params = { folder: folder.path(), number: opts.number, id: opts.id };
    req.query = opts.query || {};
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }
  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );
};


Workflow.prototype.node_describe = function (opts, callback){
  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (opts.id) throw new Error('id required');
    if (opts.number) throw new Error('number required');
    var req = { name: 'Workflow.node_describe' };
    req.path = '{folder}/{number}/execution/node/{id}/wfapi/describe';
    req.params = { folder: folder.path(), number: opts.number, id: opts.id };
    req.query = opts.query || {};
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }
  return this.jenkins._get(
    req,
    middleware.notFound(opts.name),
    middleware.body,
    callback
  );

};

/**
 * Module exports.
 */

exports.Workflow = Workflow;
