import Dividend from "./Dividend";
import StockPurchase from "./StockPurchase";
import StockSale from "./StockSale";

interface Option {
  transactionDate: string;
  callPut: string;
  type: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open?: boolean;
}

export default interface Stock {
  ticker: string;
  stockPurchases: StockPurchase[];
  stockSales: StockSale[];
  options: Option[];
  dividends: Dividend[];
}
