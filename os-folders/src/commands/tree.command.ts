import { Command } from '.';
import { IStateManager } from '../interfaces';
import { Directory } from '../objects';

export class Tree extends Command {
  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
  }

  private printSubDirs(directory: Directory, space: string) {
    if (!directory?.subDirs?.length) return;
    const { subDirs } = directory;

    subDirs.forEach((subDir) => {
      console.log(`${space}${subDir.toString()}`);
      if (subDir instanceof Directory) {
        return this.printSubDirs(subDir as Directory, `${space}\t`);
      }
    });
  }

  execute(): IStateManager {
    this.printSubDirs(this.currentState, `\t`);
    return {
      currentState: this.currentState,
      folderRoot: this.folderRoot,
    };
  }
}
