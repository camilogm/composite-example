import { Directory, File } from '../objects';
import { IStateManager } from '../interfaces';
import { ResourceAlreadyExists } from '../exceptions';
import { Command } from './command';

export class Touch extends Command {
  private readonly newFile: string;

  constructor(folderRoot: Directory, currentState: Directory, args: string[]) {
    super(folderRoot, currentState, args);
    this.newFile = args[0];
  }

  execute(): IStateManager {
    const { absolutePath } = this.currentState;
    const newFileArgs = this.newFile.split('.');

    if (newFileArgs.length === 1) {
      return {
        folderRoot: this.folderRoot,
        currentState: this.currentState,
      };
    }

    const alreadyExists = this.currentState?.subDirs?.find(
      (subDir) => subDir.name === this.newFile && subDir instanceof File,
    );

    if (alreadyExists) throw new ResourceAlreadyExists(this.newFile);
    const newFile = new File(absolutePath, this.newFile);
    this.currentState.subDirs.push(newFile);

    return {
      folderRoot: this.folderRoot,
      currentState: this.currentState,
    };
  }
}
