const Queue = function(parallelism) {
    this.parallelism = parallelism;
    this.tasks = [];
    this.inFlightTasks = [];
    if (typeof parallelism !== 'number' || parallelism < 1 ) {
        throw 'Paralellism needs to be a number greater than 1';
    }
    global.console.log('this is like this in Queue: ', this);
};
Queue.prototype.getPrallelism = function() {
    global.console.log('parallelism is: ', this.parallelism);
};

Queue.prototype.size = function() {
    global.console.log('Tasks waiting execution: ', this.tasks.length );
};

Queue.prototype.inFlight = function() {
    global.console.log('n number of tasks in flight');
};

Queue.prototype.addTask = function(task, taskCallback) {
    if (typeof task !== 'function' || typeof taskCallback !== 'function') {
        throw 'Task needs to be a function';
    }

    this.tasks.push({
        task: task,
        taskCallback: taskCallback
    });
    global.console.log('task added');
    global.console.log('this is like this in task: ', this);
    return this;
};

Queue.prototype.addCallback = function(callback) {
    if (typeof callback !== 'function') {
        throw 'callback needs to be a function';
    }
    this.callback = callback;
    return this;
};
Queue.prototype.start = function() {
    const next = function() {
        var task = tasks.shift();
    };
    while(this.inFlightTasks.length <= this.parallelism && this.tasks.length > 0 ) {
        this.inFlightTasks.push(this.tasks.shift());
    }
    let currentTask = this.inFlightTasks.shift();
    currentTask.task(currentTask.pop);
    global.console.log('this is like this in start: ', this);
    return this;
};
let q = new Queue(1);
function sayHi() {
    global.console.log('hi');
}
q.getPrallelism();
q.size();
q.inFlight();
q.addTask(global.console.log, global.console.log);
q.addTask(sayHi, global.console.log);
q.size();
q.addCallback(global.console.log);
q.start();

//
//
//
//Constructor
//
///**
// * Constructs a new Queue.
// * @constructor
// * @param {Number} [parallelism=1] Maximum number of tasks to run in parallel;
// *  cannot be less than 1 or an error is raised.
// * @returns {Queue} A new queue object.
// */
// Queue(parallelism){}
//
//Instance Methods
//
//Given:
//
//q = Queue();
//
//...the Queue object q should have the following interface:
//
///**
// * @returns {Number} Number of tasks awaiting execution. Does not count any tasks that
// * are in-flight.
// */
// q.size()
// /**
// * @returns {Boolean} Whether the queue is running or not.
// */
// q.isRunning()
//
// /**
// * @returns {Number} Number of tasks currently executing.
// */
// q.inFlight()
//
// /**
// * Adds a new task to the queue. When executed, the task will be passed a callback used to signal the task has completed:
// *
// *  task(callback)
// *
// * @param {Function} task Function which begins the asynchronous task,
// *  taking a callback to be invoked upon task completion.
// * @returns The queue object.
// */
// q.addTask(task)
//
// /**
// * Adds a callback to be invoked when all tasks have been completed:
// *
// *  callback.call(queue)
// *
// * @param {Function} callback Function to invoke when all tasks have completed;
// * it will be passed the queue object.
// * @returns The queue object.
// */
// q.addCallback(callback)
//
// /**
// * Begin executing queued tasks.
// *
// * Queued tasks execute in order queued, but tasks do not wait for prior tasks
// * to complete -- this implies the order of task completion is undefined. No more
// * than `parallelism` tasks will run at once.
// *
// * Queue will continue executing tasks until all have completed, at which point it
// * executes all registered callbacks. Calling `start` repeatedly while the queue is
// * running has no effect (though the queue can be started again with new tasks once
// * it completes).
// *
// * @returns The queue object.
// */
// q.start()
//
//Notes
//
//The queue offers no error-handling or propagation -- this is up to the programmer -- but it should not fail or stop execution due to task errors. The same is true of callbacks.
//**/
