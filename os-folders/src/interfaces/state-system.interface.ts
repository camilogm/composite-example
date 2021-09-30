import { Directory } from '../objects';

export interface IStateSystem {
  folderRoot: Directory;
  currentState: Directory;
  exit: boolean;
}
