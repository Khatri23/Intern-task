// Centralized error handler
export default async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name === "ValidationError") {
            ctx.status = 422;
            ctx.body = {
                message: "Validation failed",
                details: err.errors
            };
            return;
        }
        ctx.status = err.status || err.statusCode || 500;
        const expose = ctx.status < 500;
        ctx.body = {
            status: ctx.status,
            message: expose ?  err.message : "Internal server error",
        };
    }
}