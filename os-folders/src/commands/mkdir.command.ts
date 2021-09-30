import { Directory } from '../objects';
import { IStateManager } from '../interfaces';
import { ResourceAlreadyExists } from '../exceptions';
import { Command } from './command';

export class Mkdir extends Command {
  private newRootName: string;

  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
    this.newRootName = args[0];
  }

  public execute(): IStateManager {
    const { absolutePath } = this.currentState;
    const alreadyExists = this.currentState?.subDirs?.find(
      (subDir) =>
        subDir.name === this.newRootName && subDir instanceof Directory,
    );

    if (alreadyExists) throw new ResourceAlreadyExists(this.newRootName);

    const newDir = new Directory(absolutePath, this.newRootName, []);
    this.currentState.subDirs.push(newDir);

    return {
      folderRoot: this.folderRoot,
      currentState: this.currentState,
    };
  }
}
