const { InternalServerErrorException } = require('../core/ErrorException')
const { NotFoundException } = require('../core/ErrorException')
const { ErrorException } = require('../core/ErrorException')

async function catchError(ctx, next) {
  try {
    await next()
    switch (ctx.status) {
      case 404:
        throw new NotFoundException()
      case 500:
        throw new InternalServerErrorException()
    }
  } catch (err) {
    console.log(err)
    if (err instanceof ErrorException)
      err.getResponse(ctx)
    else new InternalServerErrorException().getResponse(ctx)
  }
}

module.exports = catchError
