// const express = require("express");
// const router = express.Router();
//
//
// router.post('/jobNotify',function(req,res,next){
//     console.log("notifiactions recieved");
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     console.log(req.body);
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     var level = req.body.level;
//     var data = '';
//     var progress = req.body.progress;
//     var timestamp = req.body.timestamp;
//     var stage_id = req.body.stage_id;
//     var status = req.body.status;
//     var exception = req.body.exception;
//     var job_id = req.body.job_id;
//     var total_time_taken = req.body.total_time_taken;
//     var socketName = 'job_status_'+job_id;
//
//     utility.parseJson(req.body.data,function(json,err) {
//         if (err) {
//             data = [];
//         }
//         else {
//             data = json;
//         }
//     });
//     var socketData = {
//         data: data,
//         level: level,
//         progress: progress,
//         status: status,
//         stageId:stage_id,
//         jobId: job_id,
//         //userId: user_id,
//         exception: exception,
//         total_time_taken: total_time_taken
//     };
//
//     if(level == 'stage') {
//         io.emit(socketName,socketData);
//         JobModel.update(
//             { _id: job_id , "stages._id":stage_id },
//             { $set:{ "stages.$.status": status, "stages.$.data": data, "stages.$.exception": exception,  "stages.$.time_elapsed": total_time_taken, progress : progress } },
//             function(err){
//                 if(!err){
//                     console.log("status updated");
//                 }
//                 else{
//                     console.log(err);
//                 }
//             }
//         );
//     }
//     else if(level == 'job') {
//         io.emit(socketName,socketData);
//         if(status == 'failed') {
//             JobModel.findOne({ _id: job_id},function(err,job){
//                 job.status = 'failed';
//                 job.stages.forEach(function(stage){ //iterate over array element in the current doc
//                     if(stage.status == 'started'){
//                         stage.status = 'waiting';
//                     }
//                 });
//                 job.save(function(err){
//                     if(!err){
//                         console.log("Status updated")
//                     }
//                     else{
//                         console.log(err);
//                     }
//                 });
//             });
//         }
//         else {
//             JobModel.update(
//                 { _id: job_id },
//                 { status: status },
//                 function(err){
//                     if(!err){
//                         console.log("Status updated")
//                     }
//                     else{
//                         console.log(err);
//                     }
//                 }
//             );
//         }
//     }
//
//     res.json({status: 'Received'});
// });
