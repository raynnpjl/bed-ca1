module.exports = {
    /* Status 201 Created */
    confirmCreated(res, data, message = 'success', statusCode = 201) {
        res.status(statusCode).json({message, status: `${statusCode} Created`, data})
    },

    /* Status 200 OK */
    sendSuccess(res, data, message = 'success') {
        res.status(200).json({message, status: '200 OK', data});
    },

    /* Status 204 No Content */
    noContent(res, data, message = 'error', statusCode = 204) {
        res.status(statusCode).json({message, status: 'No Content', data})
    },
    
    /* Status 500 Error */
    sendError(res, message, error = null, statusCode = 500) {
        res.status(statusCode).json({message, status: 'error', error})
    },

    /* Status 409 Conflict */
    Conflict(res, message, statusCode = 409) {
        res.status(statusCode).json({message, status: `${statusCode} Conflict`})
    },

    /* Status 400 Bad Request */
    BadRequest(res, message, statusCode = 400) {
        res.status(statusCode).json({message, status: `${statusCode} Bad Request`})
    },

    /* Status 404 Not Found */
    NotFound(res, message, statusCode = 404) {
        res.status(statusCode).json({message, status: `${statusCode} Not Found`})
    },

    /* Status 403 Forbidden */
    Forbidden(res, message, statusCode = 403) {
        res.status(statusCode).json({message, status: `${statusCode} Forbidden`})
    }
}