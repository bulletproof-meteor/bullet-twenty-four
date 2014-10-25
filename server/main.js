Meteor.methods({
  "getMetrics": function() {
    var resTime = {};
    var sevenDaysAgo = new Date(Date.now() - 1000 * 3600 * 24 * 7);
    Metrics.find({time: {$gt: sevenDaysAgo}}).forEach(function(doc) {
      var date = doc.time.getDate();
      if(!resTime[date]) {
        resTime[date] = {total: 0, count: 0};
      }

      resTime[date].total += doc.resTime;
      resTime[date].count++;
    });

    for(var date in resTime) {
      resTime[date].avg = resTime[date].total / resTime[date].count;
    }

    return resTime;
  }
});