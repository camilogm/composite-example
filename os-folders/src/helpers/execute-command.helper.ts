import { UnknownCommand } from '../exceptions';
import { Directory } from '../objects';
import { IStateSystem } from '../interfaces/state-system.interface';
import { Command, Mkdir, Cd, Chmod, Ls, Rm, Touch, Tree } from '../commands';

const availableCommands: {
  commandName: string;
  BaseClass?: new (...args: any[]) => Command;
}[] = [
  {
    commandName: 'mkdir',
    BaseClass: Mkdir,
  },
  {
    commandName: 'touch',
    BaseClass: Touch,
  },
  {
    commandName: 'cd',
    BaseClass: Cd,
  },
  {
    commandName: 'ls',
    BaseClass: Ls,
  },
  {
    commandName: 'rm',
    BaseClass: Rm,
  },
  {
    commandName: 'chmod',
    BaseClass: Chmod,
  },
  {
    commandName: 'tree',
    BaseClass: Tree,
  },
  {
    commandName: 'exit',
  },
  {
    commandName: 'clear',
  },
];

export function executeCommandHelper(
  commandStr: string,
  dirRoot: Directory,
  currentState: Directory,
): IStateSystem {
  const [command, ...args] = commandStr.split(' ');
  if (!command) {
    return {
      folderRoot: dirRoot,
      currentState,
      exit: false,
    };
  }

  const availableCommand = availableCommands.find(
    (registerCommand) => registerCommand.commandName === command,
  );

  if (!availableCommand) throw new UnknownCommand(command);
  if (availableCommand.commandName === 'exit') {
    return {
      folderRoot: dirRoot,
      currentState,
      exit: true,
    };
  }
  if (availableCommand.commandName === 'clear') {
    console.clear();
    return {
      folderRoot: dirRoot,
      currentState,
      exit: false,
    };
  }

  const { BaseClass } = availableCommand;
  return {
    ...new BaseClass(dirRoot, currentState, args).execute(),
    exit: false,
  };
}
