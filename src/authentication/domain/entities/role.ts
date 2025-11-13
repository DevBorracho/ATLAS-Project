// domain/entities/Role.ts

export class Role {
  constructor(
    public readonly id: string,
    public name: string,
    public level: string,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.description = description;
  }
  static create(
    id: string,
    name: string,
    level: string,
    description: string
  ): Role {
    return new Role(id, name, level, description);
  }
}
