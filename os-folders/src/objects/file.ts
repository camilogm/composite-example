import { DirEntry } from '.';

export class File extends DirEntry {
  constructor(parentPath: string, nameDir: string) {
    super(parentPath, nameDir);
  }
}
