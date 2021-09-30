export class ResourceAlreadyExists extends Error {
  constructor(resourceName: string) {
    super(`The resource "${resourceName}" already exists in this path`);
  }
}
