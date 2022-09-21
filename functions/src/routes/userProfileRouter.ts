import express from "express";
import { getClient } from "../db";
import Dividend from "../models/Dividend";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import UserProfile from "../models/UserProfile";

const userProfileRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

userProfileRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<UserProfile>("user_profiles").find();
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).send("Users Not Found");
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = client
      .db()
      .collection<UserProfile>("user_profiles")
      .findOne({ uid });
    result
      ? res.status(200).json(result)
      : res.status(404).json("Id not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.post("/", async (req, res) => {
  try {
    const newProfile: UserProfile = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .insertOne(newProfile);
    res.status(200).json(newProfile);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.put("/stocks/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const newStock: Stock = req.body;
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .updateOne({ uid }, { $push: { stocks: newStock } });
    res.status(200).json(newStock);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.put("/stocks/purchase/:uid/:ticker", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const ticker: string | undefined = req.params.ticker;
    const purchase: StockPurchase | undefined = req.body;
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .updateOne(
        { uid, stocks: { $elemMatch: { ticker } } },
        {
          $push: {
            "stocks.$[stock].stockPurchases": purchase,
          },
        },
        { arrayFilters: [{ "stock.ticker": ticker }] }
      );
    res.status(200).json(purchase);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.put("/stocks/sale/:uid/:ticker", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const ticker: string | undefined = req.params.ticker;
    const sale: StockSale | undefined = req.body;
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .updateOne(
        { uid, stocks: { $elemMatch: { ticker } } },
        {
          $push: {
            "stocks.$[stock].stockSales": sale,
          },
        },
        { arrayFilters: [{ "stock.ticker": ticker }] }
      );
    res.status(200).json(sale);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.put("/stocks/dividend/:uid/:ticker", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const ticker: string | undefined = req.params.ticker;
    const dividend: Dividend | undefined = req.body;
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .updateOne(
        { uid, stocks: { $elemMatch: { ticker } } },
        {
          $push: {
            "stocks.$[stock].dividends": dividend,
          },
        },
        { arrayFilters: [{ "stock.ticker": ticker }] }
      );
    res.status(200).json(dividend);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userProfileRouter;