import { Directory } from '../objects';
import { IStateManager } from '../interfaces';
import { Command } from './command';

export class Ls extends Command {
  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
  }

  execute(): IStateManager {
    this.currentState?.subDirs?.forEach((dirEntry) =>
      console.log(`* ${dirEntry.toString()}`),
    );

    return {
      currentState: this.currentState,
      folderRoot: this.folderRoot,
    };
  }
}
