Meteor.methods({
  "getMetrics": function() {
    var resTime = {};
    var sevenDaysAgo = new Date(Date.now() - 1000 * 3600 * 24 * 7);

    var result = Metrics.aggregate([
      {$match: {time: {$gt: sevenDaysAgo}}},
      {$group: {
        _id: {$dayOfMonth: "$time"},
        avg: {$avg: "$resTime"}
      }}
    ]);

    var resTime = {};
    result.forEach(function(doc) {
      resTime[doc._id] = {avg: doc.avg}
    });
    
    return resTime;
  }
});