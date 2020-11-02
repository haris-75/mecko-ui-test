import {
  CREATE_JOB_SUCCESS,
  CREATE_JOB,
  DELETE_JOB,
  FETCH_ALL_JOBS, CREATE_STAGE,
  UPDATE_JOB_CANVAS, DELETE_STAGE,
  SAVE_STAGE, START_JOB, FETCH_SAMPLE_DATA
} from "../actions";

export const fetchAllJobs = payload => ({
  type: FETCH_ALL_JOBS,
});

export const createJob = payload => ({
  type: CREATE_JOB,
  payload
});

export const updateJobCanvas = payload => ({
  type: UPDATE_JOB_CANVAS,
  payload
})

export const startJob = payload => ({
  type: START_JOB,
  payload
})


export const createStage = payload => ({
  type: CREATE_STAGE,
  payload
});

export const saveOrUpdateStage = payload => ({
  type: SAVE_STAGE,
  payload
})

export const deleteStage = payload => ({
  type: DELETE_STAGE,
  payload
});

export const fetchStageSampleData = payload => ({
  type: FETCH_SAMPLE_DATA,
  payload
})

export const deleteJob = payload => ({
  type: DELETE_JOB,
  payload,
})
