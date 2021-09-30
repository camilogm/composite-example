import * as prompt from 'prompt';
import { RootDirectory } from './objects';
import { executeCommandHelper } from './helpers';
import { IStateManager, IStateSystem } from './interfaces';
prompt.start();

async function getCommand(opt: IStateManager): Promise<IStateSystem> {
  return new Promise((resolve) => {
    prompt.get([opt.currentState.absolutePath], (err, result) => {
      const { currentState, folderRoot } = opt;

      if (err) resolve({ folderRoot, currentState, exit: false });
      const { absolutePath } = currentState;
      const { [absolutePath]: command } = result;

      try {
        resolve(
          executeCommandHelper(command as string, folderRoot, currentState),
        );
      } catch (error) {
        console.log(error.message);
        resolve({
          folderRoot,
          currentState,
          exit: false,
        });
      }
    });
  });
}

async function bootstrap() {
  async function helperBoostraping(opt: IStateSystem) {
    const { folderRoot, exit, currentState } = opt;

    if (exit) return { folderRoot, exit };
    else
      return helperBoostraping(await getCommand({ folderRoot, currentState }));
  }

  const initRoot = RootDirectory();
  const exit = false;
  await helperBoostraping({
    folderRoot: initRoot,
    currentState: initRoot,
    exit,
  });
}

bootstrap();
