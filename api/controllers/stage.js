const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JobModel = require("../models/job");
const _ = require("lodash");
const stageUtils = require("../utils/stageUtils");
// const axios = require("../helpers/api/axios");
const axios = require("axios");
const create_stage = (req, res, next) => {
  const jobId = req.body.jobId;
  JobModel.findById({ _id: jobId }, function(err, jobDoc) {
    if (!err) {
      let stageDoc = jobDoc.stages.create(
        stageUtils.getDefaultStageAttributes({
          user_id: req.userData._id,
          stage_attr: req.body
        })
      );
      jobDoc.stages.push(stageDoc);

      JobModel.updateOne({ _id: jobId }, { stages: jobDoc.stages }, function(
        err
      ) {
        // embedded comment with id `my_id` removed!
        if (!err) {
          res.status(200).json({
            message: "Stage created successfully",
            data: stageDoc
          });
        }
      });
    } else {
      res.status(500).json({
        message: "Error saving",
        err
      });
    }
  });
};

const update_connections_on_delete = (jobId, stageId) => {
  console.log("In updating connections");
  console.log({ jobId, stageId });
  JobModel.findById({ _id: jobId }, function(err, jobDoc) {
    console.log("FPoin");
    if (!err) {
      for (let i = 0; i < jobDoc.stages.length; i++) {
        var tempStage = jobDoc.stages.id(jobDoc.stages[i].id);

        if (tempStage.inbound.includes(stageId)) {
          console.log("Came in inbound found");
          let targetIdIndex = _.indexOf(tempStage.inbound, stageId);

          jobDoc.stages[i].inbound.splice(targetIdIndex, 1);
        }

        if (tempStage.outbound.includes(stageId)) {
          console.log("Came in outbound found");
          let targetIdIndex = _.indexOf(tempStage.outbound, stageId);
          console.log("Target Index outbound  >>> " + targetIdIndex);
          console.log(tempStage.outbound.length + "   >>  Before");
          tempStage.outbound.splice(targetIdIndex, 1);
          console.log(tempStage.outbound.length + "   >>  After");
        }
      }

      JobModel.updateOne({ _id: jobId }, { stages: jobDoc.stages }, function(
        err
      ) {
        console.log("came in upating internal");
        if (!err) {
          return { isError: false };
        } else {
          return { isError: true, err };
        }
      });
    }
  });
};

const delete_stage = (req, res, next) => {
  const jobId = req.body.jobId;
  JobModel.findById({ _id: jobId }, function(err, jobDoc) {
    if (!err) {
      // Removing the stage.
      console.log(jobDoc.stages.id(req.body.stageId));

      if (jobDoc.stages.id(req.body.stageId)) {
        jobDoc.stages.id(req.body.stageId).remove();

        JobModel.updateOne({ _id: jobId }, { stages: jobDoc.stages }, function(
          err
        ) {
          // embedded comment with id `my_id` removed!
          if (!err) {
            res.status(200).json({
              message: "Stage deleted successfully",
              stageId: req.body.stageId
            });
          }
        });
      }
    } else {
      return res.status(400).json({
        message: "Error deleting stage"
      });
    }
  });
};

const update_stage = (req, res, next) => {
  const stage = req.body;

  JobModel.findById({ _id: stage.jobId }, function(err, jobDoc) {
    if (!err) {
      let stageDoc = jobDoc.stages.id(stage.stageId);
      stageDoc.stage_attributes = stage.stage_attributes;
      console.log("stageDoc.stage_attributes ");
      console.log(stageDoc.stage_attributes);
      stageDoc.name = stage.name;
      stageDoc.user_selected_schema = stage.user_selected_schema;
      stageDoc.default_schema = stage.default_schema;
      stageDoc.comment = stage.comment;
      JobModel.updateOne(
        { _id: stage.jobId },
        { stages: jobDoc.stages },
        function(err) {
          // embedded comment with id `my_id` removed!
          if (!err) {
            res.status(200).json({
              message: "Stage Saved Successfully",
              data: {
                ...stageDoc
              }
            });
            // res.send({status: true, response: "Stage updated successfully.", data:{}});
          }
        }
      );
    } else {
      res.send({
        status: false,
        response: "Error while saving Stage.",
        data: {}
      });
    }
  });
};

const get_sample_data = (req, res, next) => {
  const { jobId, stageId } = req.body;
  const url = `http://localhost:6969/api/stage/sample?jobId=${jobId}&stageId=${stageId}`;
  console.log("FETCH URL ");
  console.log(url);
  const method = "GET";
  axios({
    method,
    url
  })
    .then(response => {
      return res.status(200).json({
        response
      });
    })
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
};
module.exports = { create_stage, delete_stage, update_stage, get_sample_data };
