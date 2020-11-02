import {
  FETCH_JOBS_SUCCESS,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  SAVE_STAGE_SUCCESS,
  CREATE_STAGE_SUCCESS,
  DELETE_STAGE_SUCCESS,
  UPDATE_CANVAS_SUCCESS
} from "../actions";

const INIT_STATE = {
  jobs: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.data
      };

    case CREATE_JOB_SUCCESS:
      const newJob = action.data;
      let updatedJobs = [...state.jobs];
      updatedJobs.push(newJob);
      return {
        ...state,
        jobs: updatedJobs
      };

    case DELETE_JOB_SUCCESS:
      const uJobs = state.jobs.filter(job => {
        return job._id !== action.jobId;
      });

      return {
        ...state,
        jobs: uJobs
      };
    case CREATE_STAGE_SUCCESS:
      const job_id = action.payload.job_id;

      let aJs = [...state.jobs];

      let targetJobIndex = aJs.findIndex(k => k._id == job_id);

      if (targetJobIndex !== -1) {
        const tJob = aJs[targetJobIndex];

        let allStg = [...tJob.stages];

        allStg.push(action.payload);

        const updatedJb = {
          ...aJs[targetJobIndex],
          stages: allStg
        };

        aJs[targetJobIndex] = updatedJb;
      }

      return {
        ...state,
        jobs: aJs
      };
    case DELETE_STAGE_SUCCESS:
      let allJs = [...state.jobs];

      const jIndex = allJs.findIndex(k => k._id === action.payload.jobId);

      if (jIndex !== -1) {
        const allStgs = [...allJs[jIndex].stages];

        const updtStages = allStgs.filter(k => k._id != action.payload.stageId);

        const updatedJb = {
          ...allJs[jIndex],
          stages: updtStages
        };

        allJs[jIndex] = updatedJb;
      }

      return {
        ...state,
        jobs: allJs
      };

    case SAVE_STAGE_SUCCESS:
      const { jobId, stageId, stage_attributes } = action.payload;

      let allJobs = [...state.jobs];

      let targetJobIdx = allJobs.findIndex(k => k._id == jobId);

      if (targetJobIdx !== -1) {
        const targetJob = allJobs[targetJobIdx];
        const allStages = [...targetJob.stages];

        let targetStageIdx = allStages.findIndex(k => k._id == stageId);

        if (targetStageIdx !== -1) {
          const updatedStage = {
            ...allStages[targetStageIdx],
            name: action.payload.name,
            comment: action.payload.comment,
            stage_attributes
          };

          allStages[targetStageIdx] = updatedStage;

          const updatedJob = {
            ...allJobs[targetJobIdx],
            stages: allStages
          };

          allJobs[targetStageIdx] = updatedJob;
        }
      }
      return {
        ...state,
        jobs: allJobs
      };

    case UPDATE_CANVAS_SUCCESS:
      const { updatedStages } = action.payload;
      let jobs = [...state.jobs];

      const jobIndex = jobs.findIndex(k => k._id === action.payload.jobId);

      if (jobIndex !== -1) {
        jobs[jobIndex] = {
          ...jobs[jobIndex],
          stages: updatedStages
        };
      }

      return {
        ...state,
        jobs
      };

    default:
      return { ...state };
  }
};
