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


/**
 * Module exports.
 */

exports.Workflow = Workflow;
