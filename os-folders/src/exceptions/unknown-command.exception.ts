export class UnknownCommand extends Error {
  constructor(commandString: string) {
    super(`Not such that command ${commandString}`);
  }
}
