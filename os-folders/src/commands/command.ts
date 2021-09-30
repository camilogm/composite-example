import { Directory } from '../objects';
import { IStateManager } from '../interfaces';

export abstract class Command {
  constructor(
    public folderRoot: Directory,
    public currentState: Directory,
    public args: string[],
  ) {}

  public abstract execute(): IStateManager;
}
