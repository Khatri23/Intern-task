// Centralized error handler
import fs from "fs/promises";
export default async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name === "ValidationError") {
            ctx.status = 400;
            ctx.body = {
                message: "Validation failed",
                details: err.errors
            };
            return;
        }
        if(ctx.file) {
            await fs.unlink(ctx.file.path).catch(()=>{});
        }
        ctx.status = err.status || err.statusCode || 500;
        const expose = ctx.status < 500;
        ctx.body = {
            status: ctx.status,
            message: expose ?  err.message : "Internal server error",
        };
    }
}