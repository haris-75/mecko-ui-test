const express = require("express");
const router = express.Router();

const JobsController = require('../controllers/jobs');
const StageController = require("../controllers/stage");
const checkAuth = require('../middleware/check-auth');

router.post("/create", checkAuth, JobsController.create_job);
router.delete("/delete/:jobId", checkAuth, JobsController.delete_job);
router.get("/all", checkAuth, JobsController.get_user_jobs);
router.post("/updateCanvas", checkAuth,  JobsController.update_canvas);
router.post("/startJob", checkAuth, JobsController.start_job);


router.post("/stage/create", checkAuth, StageController.create_stage);
router.delete("/stage/delete", checkAuth, StageController.delete_stage);
router.post("/stage/save", checkAuth, StageController.update_stage);
router.post("/stage/fetchSampleData", checkAuth, StageController.get_sample_data);

module.exports = router;