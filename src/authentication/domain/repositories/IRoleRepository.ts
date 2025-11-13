import type { Role } from "../entities/role";

interface IRoleRepository {
  findByName(name: string): Promise<Role | null>;
  createRole(role: Role): Promise<Role>;
}
export default IRoleRepository;
