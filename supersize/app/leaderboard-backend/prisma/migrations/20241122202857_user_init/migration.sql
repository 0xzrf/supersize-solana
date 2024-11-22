-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "Winning" (
    "id" TEXT NOT NULL,
    "usdc" INTEGER NOT NULL DEFAULT 0,
    "sol" INTEGER NOT NULL DEFAULT 0,
    "agld" INTEGER NOT NULL DEFAULT 0,
    "userWalletAddress" TEXT NOT NULL,

    CONSTRAINT "Winning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Winning" ADD CONSTRAINT "Winning_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
