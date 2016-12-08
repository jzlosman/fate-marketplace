var notAuthorized = function(res, message, data){
    sendError(res, message, data, 403);
}

var notFound = function(res, message, data){
    sendError(res, message, data, 404);
}

var conflict = function(res, message, data){
    sendError(res, message, data, 409);
}

var validationError = function(res, message, data){
    sendError(res, message, data, 409);
}


var serverError = function(res, message, data){
    sendError(res, message, data, 500);
}

var sendError = function(res, message, data, status) {
    res.status(status);
    res.send({error: message, data: data})
}

var sendSuccess = function(res, data) {
    res.json(data);
}

var returnEntity = function(res, entity) {
    sendSuccess(res, entity);
}

var returnCollection = function(res, collection) {
    sendSuccess(res, {_embedded: collection, _meta: {total: collection.length}});
}

module.exports = {
    conflict: conflict,
    notAuthorized: notAuthorized,
    notFound: notFound,
    returnEntity: returnEntity,
    returnCollection: returnCollection,
    returnJson: returnEntity,
    serverError: serverError,
    validationError: validationError
}
