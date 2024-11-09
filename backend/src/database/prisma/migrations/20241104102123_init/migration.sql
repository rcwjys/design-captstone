/*
  Warnings:

  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "claim_reward_trx" DROP CONSTRAINT "claim_reward_trx_reward_id_fkey";

-- DropTable
DROP TABLE "Reward";

-- CreateTable
CREATE TABLE "rewards" (
    "reward_id" TEXT NOT NULL,
    "reward_name" TEXT NOT NULL,
    "reward_stock" INTEGER NOT NULL,
    "reward_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("reward_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rewards_reward_name_key" ON "rewards"("reward_name");

-- AddForeignKey
ALTER TABLE "claim_reward_trx" ADD CONSTRAINT "claim_reward_trx_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "rewards"("reward_id") ON DELETE NO ACTION ON UPDATE CASCADE;
