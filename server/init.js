Meteor.startup(function() {
  var millisForDay = 1000 * 3600 * 24;
  var now = Date.now();

  if(!Metrics.findOne()) {
    console.log("Adding Sample Data for a week!");
    for(var lc=0; lc<7; lc++) {
      var time = new Date(now - (millisForDay * lc));
      for(var i=0; i<300; i++) {
        var metric = {
          time: time, 
          resTime: Math.ceil(Math.random() * 1000)
        };
        Metrics.insert(metric);
      }
    }
    console.log("Sample data added!");
  }

});