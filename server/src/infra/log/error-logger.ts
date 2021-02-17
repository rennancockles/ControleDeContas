export interface IErrorLogger {
  logError: (stack: string) => Promise<void>
}
