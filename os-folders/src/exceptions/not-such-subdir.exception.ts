export class NotSuchSubDir extends Error {
  constructor(file: string) {
    super(`No such: ${file}`);
  }
}
