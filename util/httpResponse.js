
module.exports = {
    responseFormatter (res, statusCode, success, message, payload) {
     res.status(statusCode).json({
        success: success,
        message: message,
        payload: payload
    })
}
}


