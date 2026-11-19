export default async function roleGuard(ctx,next) {
    if(!ctx.state.user) {
        ctx.throw(401,"Unauthorized");
    }
    else if(ctx.state.user.role.role !== "admin"){
        ctx.throw(403,"Not allowed");
    }
    await next();
}