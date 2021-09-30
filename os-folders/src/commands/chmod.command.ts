import { Directory } from '../objects';
import { IStateManager } from '../interfaces';
import { Command } from './command';

export class Chmod extends Command {
  private dirName: string;
  private permissions: string;

  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
    this.permissions = args[0];
    this.dirName = args[1];
  }

  private modifyFilePermissions(
    currentPermissions: string[],
    removePermissions: boolean,
    permissions: string[],
  ): string[] {
    if (removePermissions) {
      return currentPermissions?.filter(
        (permission) => !permissions.includes(permission),
      );
    }

    const newPermissionsDuplicated = [...currentPermissions, ...permissions];

    const newPermissions = [...new Set(newPermissionsDuplicated)];
    return newPermissions;
  }

  execute(): IStateManager {
    const subDir = this.currentState.findAnySubDir(this.dirName);
    const mode = this.permissions[0];
    const permissions = this.permissions
      .substring(1, this.permissions.length)
      .split('');

    if (mode !== '-' && mode !== '+') throw new Error(`Invalid mode ${mode}`);
    const removePermissions = mode === '-';

    subDir.permissions = this.modifyFilePermissions(
      subDir.permissions,
      removePermissions,
      permissions,
    );

    return {
      folderRoot: this.folderRoot,
      currentState: this.currentState,
    };
  }
}
