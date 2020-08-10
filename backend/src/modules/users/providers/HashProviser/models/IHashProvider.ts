export default interface IHashProvider {
  generateHah(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
