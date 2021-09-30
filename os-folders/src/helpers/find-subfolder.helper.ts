import { NotSuchSubDir } from '../exceptions';
import { Directory } from '../objects';

export function findSubFolder(
  directory: Directory,
  inputPath: string[] | string,
) {
  function findDirectory(
    directory: Directory,
    absolutePath: string[],
    subFolderName: string,
    index: number,
    lastIndex: number,
  ) {
    if (!directory) throw new NotSuchSubDir(subFolderName);

    if (index >= lastIndex) return directory;
    else
      return findDirectory(
        directory.findSubFolder(subFolderName),
        absolutePath,
        absolutePath[index],
        index + 1,
        lastIndex,
      );
  }

  const absolutePath =
    inputPath instanceof String
      ? inputPath.split('/')
      : (inputPath as string[]);

  return findDirectory(
    directory.findSubFolder(absolutePath[0]),
    absolutePath,
    absolutePath[1],
    1,
    absolutePath.length,
  );
}
