//Get information regarding AMIs Tags
var aws = require('aws-sdk');
var jp = require('jsonpath');
var ec2 = new aws.EC2();
exports.handler = (event, context, callback) => {
  var AmiId = event.AmiId;
  var TagName = event.TagName;
  var params = {
    DryRun: false,
    Filters: [{},
      /* more items */
    ],
    ImageIds: [
      AmiId,
    ],
  };
  ec2.describeImages(params, function(err, data) {
    if (err) // an error occurred
    {
      console.log(err, err.stack);
      callback(err);
    } else {
      var json = JSON.parse(JSON.stringify(data));
      console.log(json);
      //console.log('Tags are ' + json.Images[0].Tags[0].Name);
      //var UpdateAmi = jp.query(json, '$.Images[0].Tags[?(@.Key=="o2:update:ami")].Value');
      var UpdateAmi = jp.query(json, '$.Images[0].Tags[?(@.Key=="' + TagName + '")].Value');
      console.log("o2:update:ami value is: " + UpdateAmi);
      callback(null, "o2:update:ami value is: " + UpdateAmi);
    }
  });
};