import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

//@ts-ignore
app.post("/create-user", async (req: express.Request, res: express.Response) => {
  const { walletAddress, name } = req.body;

  if (!walletAddress || !name) {
    return res.status(400).json({ error: "Wallet address and name are required" });
  }

  try {
    const user = await prisma.user.create({
    data: {
      walletAddress,
      name
    },
  });

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
});

//@ts-ignore
app.post("/updateWins", async (req: express.Request, res: express.Response) => {
  const { walletAddress, updateId, amount }: { walletAddress: string; updateId: number; amount: number } = req.body;
  if (!walletAddress || updateId !== 0 && updateId !== 1 && updateId !== 2) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {

    if (updateId === 0) {
      await prisma.winning.create({
        data: {
          userWalletAddress: walletAddress,
          usdc: amount
        }
      })
    } else if (updateId === 1) {
      await prisma.winning.update({
        where: { userWalletAddress: walletAddress },
      data: {
        sol: amount
        }
      })
    } else if (updateId === 2) {
      await prisma.winning.update({
        where: { userWalletAddress: walletAddress },
        data: {
          agld: amount
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update wins" });
  } 

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

