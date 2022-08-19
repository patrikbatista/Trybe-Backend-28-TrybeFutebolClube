export default interface IError extends Error {
  status: number;
  message: string;
}
