export default interface SellToOpen {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open: boolean;
}
