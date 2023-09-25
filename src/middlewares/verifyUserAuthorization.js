const AppError = require("../utils/AppError")

// roleToVerify = admin ou costumer
//OU
// [admin, costumer, outro(os)].includes("admin, outro")

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}

module.exports = verifyUserAuthorization