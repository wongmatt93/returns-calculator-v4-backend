import { ObjectId } from "mongodb";
import Stock from "./Stock";

export default interface UserProfile {
  _id?: ObjectId;
  name: string;
  email: string;
  photo: string;
  uid: string;
  stocks: Stock[];
}
