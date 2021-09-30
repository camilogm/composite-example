export abstract class DirEntry {
  private chmod: string[];

  constructor(
    private readonly parentPath: string,
    private readonly nameDir: string,
  ) {
    this.chmod = ['r', 'w'];
  }

  public get path() {
    return this.parentPath;
  }

  public get name() {
    return this.nameDir;
  }

  public get absolutePath() {
    if (this.name === 'root') return `/`;

    return `${this.parentPath}/${this.nameDir}`.replace(/\/\//g, '/');
  }

  public get permissions() {
    return this.chmod;
  }

  public set permissions(newPermissions: string[]) {
    this.chmod = newPermissions;
  }

  public toString() {
    const typeClass = (this as any).constructor.name;
    return `[${typeClass}] ${
      this.nameDir
    } ::   permissions : [${this.chmod?.join(',')}]`;
  }
}
