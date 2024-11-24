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
      name,
      contestId: ""
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

    const contests = await prisma.contests.findMany();
    let contest;
    if (updateId === 0) {
      contest = contests[0];
      await prisma.winning.update({
        where: { userWalletAddress: walletAddress, id: contest.id },
        data: {
          usdc: amount
        }
      })
    } else if (updateId === 1) {
      contest = contests[1];
      await prisma.winning.update({
        where: { userWalletAddress: walletAddress, id: contest.id },
      data: {
        sol: amount
        }
      })
    } else if (updateId === 2) {
      contest = contests[2];
      await prisma.winning.update({
        where: { userWalletAddress: walletAddress, id: contest.id },
        data: {
          agld: amount
        }
      })

      return res.json({ success: true });

    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update wins" });
  } 
});

//@ts-ignore
app.get("/get-user-position", async (req: express.Request, res: express.Response) => {
  const { walletAddress, contestId } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const contest = await prisma.contests.findUnique({
      where: { id: contestId as string },
      include: {
        participants: {
          include: {
            winning: true
          }
        }
      }
    });

    if (!contest) {
      return res.status(400).json({ error: "Contest not found" });
    }

    if (contest.tokenAddress === "USDC") {
      const sortedParticipants = contest.participants
        .filter(p => p.winning) // Filter out participants without winning records
        .sort((a, b) => {
          return (b.winning?.usdc || 0) - (a.winning?.usdc || 0); // Sort by USDC amount descending
        });

      const position = sortedParticipants.findIndex(p => p.walletAddress === walletAddress) + 1;

      if (position === 0) {
        return res.status(400).json({ error: "User not found in contest" });
      }

      return res.json({ position });
    }
    
    return res.status(400).json({ error: "Invalid contest type" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get user position" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

