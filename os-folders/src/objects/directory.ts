import { NotSuchSubDir } from '../exceptions/not-such-subdir.exception';
import { DirEntry } from './dir-entry';

export class Directory extends DirEntry {
  constructor(
    parentPath: string,
    nameDir: string,
    private directorySubDirs?: DirEntry[],
  ) {
    super(parentPath, nameDir);
  }

  public get subDirs() {
    return this.directorySubDirs;
  }

  public set subDirs(newDirs: DirEntry[]) {
    this.directorySubDirs = newDirs;
  }

  findSubFolder(subFolderName: string): Directory {
    return this.directorySubDirs?.find(
      (subFolder) =>
        subFolder.name === subFolderName && subFolder instanceof Directory,
    ) as Directory;
  }

  findAnySubDir(subDirName: string): DirEntry {
    const subDir = this.directorySubDirs?.find(
      (subDir) => subDir.name === subDirName,
    );

    if (!subDir) throw new NotSuchSubDir(subDirName);

    return subDir;
  }
}

export const RootDirectory = () => new Directory('/', 'root', []);
