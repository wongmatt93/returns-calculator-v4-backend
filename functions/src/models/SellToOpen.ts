export default interface SellToOpen {
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open: boolean;
}
