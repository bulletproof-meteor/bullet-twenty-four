printMetrics = function() {
  Meteor.call('getMetrics', function(err, result) {
    if(err) throw err;

    for(var date in result) {
      console.log("Response Time on %s: %s ms", date, result[date].avg.toFixed(2));
    }
  });
};

var stop = false;
stopLoadTest = function() {
  stop = true;
}; 

startLoadTest = function(concurrency) {
  concurrency = concurrency || 1;
  stop = false;
  function get() {
    Meteor.call('getMetrics', function(err) {
      if(err) {
        throw err;
      } else if(stop) {
        console.log("Load Test has been stopped!");
        stop = false;
      } else {
        get();
      }
    });
  }

  for(var lc=0; lc<concurrency; lc++) {
    get();
  }

  console.log("Load Test has been started!");
};