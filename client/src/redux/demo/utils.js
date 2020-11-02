export function getFileNameFromHeaders(disposition) {
  let filename = "";
  if (disposition && disposition.indexOf("attachment") !== -1) {
    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  } else {
    filename = "output";
  }
  return filename;
}
