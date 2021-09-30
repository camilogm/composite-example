import { Directory, File } from '../objects';
import { IStateManager } from '../interfaces';
import { Command } from './command';

export class Rm extends Command {
  private readonly dirEntryName: string;
  private readonly isFolder: boolean;

  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
    this.dirEntryName = args[0];
    this.isFolder = args.includes('-f');
  }

  execute(): IStateManager {
    const newDirs = this.currentState.subDirs?.filter(
      (subFolder) =>
        !(
          subFolder.name === this.dirEntryName &&
          (this.isFolder
            ? subFolder instanceof Directory
            : subFolder instanceof File)
        ),
    );

    this.currentState.subDirs = newDirs;
    return {
      currentState: this.currentState,
      folderRoot: this.folderRoot,
    };
  }
}
