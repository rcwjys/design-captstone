-- CreateTable
CREATE TABLE "Staff" (
    "staff_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "CleaningProcess" (
    "activity_id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CleaningProcess_pkey" PRIMARY KEY ("activity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_name_key" ON "Staff"("email", "name");

-- AddForeignKey
ALTER TABLE "CleaningProcess" ADD CONSTRAINT "CleaningProcess_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Staff"("staff_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningProcess" ADD CONSTRAINT "CleaningProcess_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("report_id") ON DELETE NO ACTION ON UPDATE CASCADE;
