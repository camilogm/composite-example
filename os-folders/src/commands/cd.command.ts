import { Command } from './command';
import { NotSupported, NotSuchSubDir } from '../exceptions';
import { findSubFolder } from '../helpers';
import { IStateManager } from '../interfaces';
import { Directory } from '../objects';

export class Cd extends Command {
  private readonly newTarget: string;

  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);

    this.newTarget = args[0];
  }

  private moveOnCase() {
    const stateDirectory = this.currentState.subDirs.find(
      (folder) => folder.name === this.newTarget,
    );

    if (!stateDirectory || stateDirectory instanceof File)
      throw new NotSuchSubDir(this.newTarget);

    return {
      currentState: stateDirectory as Directory,
      folderRoot: this.folderRoot,
    };
  }

  private moveBack(): IStateManager {
    const allBack = this.args.every((arg) => arg === '..');

    if (!allBack) throw new NotSupported();

    const count = this.args.length;

    const absolutePathSplited = this.currentState.absolutePath.split('/');
    const absolutePathArray = absolutePathSplited.splice(
      1,
      absolutePathSplited.length,
    );

    if (count >= absolutePathArray.length) {
      return {
        currentState: this.folderRoot,
        folderRoot: this.folderRoot,
      };
    }

    const newAbsPath = absolutePathArray.splice(
      0,
      absolutePathArray.length - count,
    );

    const newState = findSubFolder(this.folderRoot, newAbsPath);

    return {
      currentState: newState,
      folderRoot: this.folderRoot,
    };
  }

  execute(): IStateManager {
    if (this.newTarget === '.')
      return {
        currentState: this.currentState,
        folderRoot: this.folderRoot,
      };
    else if (this.args.includes('..')) {
      return this.moveBack();
    } else {
      return this.moveOnCase();
    }
  }
}
