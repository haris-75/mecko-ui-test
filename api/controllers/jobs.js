const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Job = require("../models/job");
const _ = require("lodash");
const apiUrls = require("../helpers/api/apiUrls");
const apiCaller = require("../helpers/api/apiCaller");
// const axios = require("../helpers/api/axios");

const axios = require("axios");
const create_job = (req, res, next) => {
  const user_id = req.userData.userId;
  const job = new Job({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    user_id,
    stages: []
  });

  job
    .save()
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: "Job Created",
        result
      });
    })
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
};

const update_canvas = (req, res, next) => {
  const user_id = req.userData.userId;
  const jobId = req.body.jobId;
  const opInfo = req.body.info;

  console.log("Update canvas backend");
  console.log(req.body);

  Job.findById({ _id: jobId }, function(err, jobDoc) {
    if (!err) {
      if (opInfo) {
        const ids = opInfo.data;
        const { type } = opInfo;

        var sourceStageDoc = jobDoc.stages.id(ids.sourceId);
        var targetStageDoc = jobDoc.stages.id(ids.targetId);

        if (type === "edge_created") {
          console.log("EDGE_CREATION >>>>>");
          if (sourceStageDoc) {
            if (!(_.indexOf(sourceStageDoc.outbound, ids.targetId) > -1)) {
              sourceStageDoc.outbound.push(ids.targetId);
            }
          }

          if (targetStageDoc) {
            if (!(_.indexOf(targetStageDoc.inbound, ids.sourceId) > -1)) {
              targetStageDoc.inbound.push(ids.sourceId);
            }
          }
        } else if (type === "edge_deleted") {
          console.log("EDGE_DELETION >>>>>");
          if (sourceStageDoc) {
            const sourceIdIndex = _.indexOf(
              sourceStageDoc.outbound,
              ids.targetId.toString()
            );
            console.log(sourceIdIndex);
            console.log(typeof ids.targetId);
            if (sourceIdIndex > -1) {
              sourceStageDoc.outbound.splice(sourceIdIndex, 1);
            }
          }

          if (targetStageDoc) {
            const targetIdIndex = _.indexOf(
              targetStageDoc.inbound,
              ids.sourceId.toString()
            );

            if (targetIdIndex > -1) {
              targetStageDoc.inbound.splice(targetIdIndex, 1);
            }
          }
        } else if (type === "stage_deleted") {
          for (let i = 0; i < jobDoc.stages.length; i++) {
            let tempStage = jobDoc.stages.id(jobDoc.stages[i].id);

            if (tempStage.id !== ids.stageId.toString()) {
              if (tempStage.inbound.includes(ids.stageId.toString())) {
                console.log("Came in inbound found");
                let targetIdIndex = _.indexOf(
                  tempStage.inbound,
                  ids.stageId.toString()
                );

                console.log("Target Index inbound  >>> " + targetIdIndex);
                tempStage.inbound.splice(targetIdIndex, 1);
              }

              if (tempStage.outbound.includes(ids.stageId.toString())) {
                console.log("Came in outbound found");
                let targetIdIndex = _.indexOf(
                  tempStage.outbound,
                  ids.stageId.toString()
                );
                console.log("Target Index outbound  >>> " + targetIdIndex);
                console.log(jobDoc.stages[i].outbound.length + "   >>  Before");
                tempStage.outbound.splice(targetIdIndex, 1);
                console.log(jobDoc.stages[i].outbound.length + "   >>  After");
              }
            }
          }
        }
      }

      jobDoc.save(function(err) {
        if (!err) {
          Job.updateOne(
            { _id: jobId },
            { canvas: req.body.updatedCanvas, stages: jobDoc.stages },
            function(err) {
              if (!err) {
                return res.status(200).json({
                  message: "Canvas Updated",
                  stages: jobDoc.stages
                });
              }
            }
          );
        }
      });
    } else {
      return res.status(400).json({
        message: "Error saving.",
        err
      });
    }
  });
};
//     return res.status(200).json({
//         message: "Going to update canavs",
//         jobId: req.body.jobId
//     })
// }

const start_job = (req, res, next) => {
  const jobId = req.body.jobId;
  const url = `http://localhost:6969/api${apiUrls.START_JOB}`;
  const method = "POST";
  //for debugging
  console.log("!!!!!!Starting Job!!!!!");
  console.log(url);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!");

  var d = new Date();
  var ts = d.getTime();

  const data = {
    jobId: jobId,
    jobName: "job",
    timestamp: String(ts),
    sparkMaster: "local[*]",
    executorMemory: "2g",
    executorCores: "2",
    notificationHost: "localhost:9092"
  };

  axios({
    method,
    url,
    data
  })
    .then(response => {
      console.log(response);
      console.log("<<<<< RESPONSE FROM BACKEND >>>>>");
      Job.findOne({ _id: jobId }, function(err, job) {
        job.status = "started";
        job.stages.forEach(function(stage) {
          //iterate over array element in the current doc
          stage.status = "waiting";
        });
        job.save(function(err) {
          if (!err) {
            res.status(200).json({
              status: true,
              response: "Data received and job updated successfully",
              data: response.data
            });
          } else {
            res.status(500).json({
              status: false,
              response: "Problem updating job.",
              data: {}
            });
          }
        });
      });
    })
    .catch(error => {
      return res.status(error.response.status).json({
        error
      });
    });
};

const delete_job = (req, res, next) => {
  const user_id = req.userData.userId;
  Job.deleteOne({ user_id: user_id, _id: req.params.jobId })
    .exec()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
};

const get_user_jobs = (req, res, next) => {
  const { userId } = req.userData;
  Job.find({ user_id: userId })
    .exec()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
};
module.exports = {
  create_job,
  get_user_jobs,
  delete_job,
  update_canvas,
  start_job
};
