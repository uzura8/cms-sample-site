export default {
  validateFileObj: function(fileObj, acceptTypes = [], sizeLimit = 0) {
    if (!('name' in fileObj) || !fileObj.name) {
      return 'Input required'
    }

   const fileType = fileObj.type.replace('image/', '')
    if (acceptTypes.length > 0 && acceptTypes.includes(fileType) === false) {
      return 'notAcceptedTypeOnUpload'
    }

    if (sizeLimit > 0 && fileObj.size > sizeLimit) {
      return 'overMaxSizeOnUpload'
    }
  },
}
