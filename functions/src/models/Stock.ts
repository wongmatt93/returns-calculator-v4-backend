import BuyToClose from "./BuyToClose";
import BuyToOpen from "./BuyToOpen";
import Dividend from "./Dividend";
import SellToClose from "./SellToClose";
import SellToOpen from "./SellToOpen";
import StockPurchase from "./StockPurchase";
import StockSale from "./StockSale";

export default interface Stock {
  ticker: string;
  stockPurchases: StockPurchase[];
  stockSales: StockSale[];
  buyToOpenOptions: BuyToOpen[];
  buyToCloseOptions: BuyToClose[];
  sellToOpenOptions: SellToOpen[];
  sellToCloseOptions: SellToClose[];
  dividends: Dividend[];
}
