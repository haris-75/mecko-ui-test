import { MASK_FILE, UNMASK_FILE } from "../actions";

export const maskFile = payload => ({
  type: MASK_FILE,
  payload
});

export const unmaskFile = payload => ({
  type: UNMASK_FILE,
  payload
});
