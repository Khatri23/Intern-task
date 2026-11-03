import * as roleInterface from "../services/roles.js";
import * as roleSchema from "../validation/roleSchema.js";

export async function displayRoles(ctx) {
    ctx.status = 200;
    ctx.body = await roleInterface.fetchAllRoles();
}

export async function getRoleById(ctx) {
    const {id} = await roleSchema.idValidate.validate({id: ctx.params.id}, {abortEarly: false});
    const data = await roleInterface.fetchRoleById(id);
    if (!data) ctx.throw(404, "Role not found");
    ctx.status = 200;
    ctx.body = data;
}

export async function addRole(ctx) {
    const {role} = await roleSchema.roleValidate.validate(ctx.request.body, {abortEarly: false});
    const data = await roleInterface.createRole(role);
    ctx.status = 201;
    ctx.body = {
        message: "Created successfully",
        data
    };
}

export async function updateRole(ctx) {
    const {id} = await roleSchema.idValidate.validate({id: ctx.params.id}, {abortEarly: false});
    const {role} = await roleSchema.roleValidate.validate(ctx.request.body, {abortEarly: false});
    const data = await roleInterface.updateRole(id, role);
    if (!data) ctx.throw(404, "Role not found");
    ctx.status = 200;
    ctx.body = {
        message: "Updated successfully",
        data
    };
}

export async function removeRole(ctx) {
    const {id} = await roleSchema.idValidate.validate({id: ctx.params.id}, {abortEarly: false});
    const deleted = await roleInterface.deleteRole(id);
    if (!deleted) ctx.throw(404, "Role not found");
    ctx.status = 204;
}
