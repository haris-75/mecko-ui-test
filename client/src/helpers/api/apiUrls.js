export const FETCH_SEARCH_RESULTS = "/search";
export const AUTHENTICATE_USER = "/user/login";
export const SINGUP_USER = "/user/signup";
export const FORGOT_PASSWORD_INITIATE = "/user/forgot-password";
export const VALIDATE_NEW_USER = "user/verify";
export const GET_EMAIL_FROM_TOKEN = "user/getEmailByPasswordResetToken";
export const UPDATE_PASSWORD = "user/newPassword";

/* Jobs related endpoints */

export const FETCH_ALL_JOBS = "/jobs/all";
export const CREATE_JOB = "/jobs/create";
export const DELETE_JOB = "/jobs/delete";
export const UPDATE_CANVAS = "/jobs/updateCanvas";
export const START_JOB = "/jobs/startJob";

export const CREATE_STAGE = "/jobs/stage/create";
export const DELETE_STAGE = "/jobs/stage/delete";
export const SAVE_STAGE = "/jobs/stage/save";
export const FETCH_SAMPLE_DATA = "/jobs/stage/fetchSampleData";
