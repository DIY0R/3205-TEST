export const requestState = new Map<
  string,
  { prepResolve: (command: string) => void }
>();
