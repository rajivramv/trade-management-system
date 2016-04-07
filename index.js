const cp = require('child_process'),
  MAX_WORKERS = 5;

function Manager(module){
  this._currWorkerId = 0;
  this._workers = [];
}

// workflows = [workflow]
// workflow = {name: '', params: []}

Manager.prototype.exec = function(workflows){

  var workerId = this._currWorkerId = ++this._currWorkerId % MAX_WORKERS;
  var worker = this._workers[workerId];

  if(!(worker instanceof cp.ChildProcess)){
    worker = this._workers[workerId] = sp.fork('./worker')
  }


  workflows.forEach(function())
    var cmd = {
    id : Date.now(),
    name: workflow,
    params: parms
  },
    freeLen = freeWorkers.length;

  if(freeLen > 0){

  }


};
