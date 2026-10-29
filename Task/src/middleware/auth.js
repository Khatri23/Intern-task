import koajwt from "koa-jwt";

const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});

export default auth;