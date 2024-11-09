-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "lecture" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "page_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "reports" (
    "report_id" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location_detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "reward_id" TEXT NOT NULL,
    "reward_name" TEXT NOT NULL,
    "reward_stock" INTEGER NOT NULL,
    "reward_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("reward_id")
);

-- CreateTable
CREATE TABLE "claim_reward_trx" (
    "claim_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reward_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "claim_reward_trx_pkey" PRIMARY KEY ("claim_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_name_email_page_id_key" ON "users"("username", "name", "email", "page_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_reward_name_key" ON "Reward"("reward_name");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_reward_trx" ADD CONSTRAINT "claim_reward_trx_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Reward"("reward_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_reward_trx" ADD CONSTRAINT "claim_reward_trx_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE CASCADE;
