export default interface BuyToOpen {
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open: boolean;
}
