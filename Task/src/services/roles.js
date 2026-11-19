import { AppDataSource } from "../data-source.js";
import Role from "../Entity/Role.js";

const roleRepository = AppDataSource.getRepository(Role);

export async function fetchAllRoles() {
    return roleRepository.find();
}

export async function fetchRoleById(id) {
    return roleRepository.findOne({where: {id}});
}

export async function createRole(role) {
    const data = roleRepository.create({role});
    await roleRepository.save(data);
    return data;
}

export async function updateRole(id, role) {
    const data = await fetchRoleById(id);
    if (!data) return null;
    data.role = role;
    await roleRepository.save(data);
    return data;
}

export async function deleteRole(id) {
    const result = await roleRepository.delete({id});
    return result.affected > 0;
}
