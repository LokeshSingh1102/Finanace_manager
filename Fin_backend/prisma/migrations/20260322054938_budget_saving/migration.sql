/*
  Warnings:

  - You are about to drop the column `curr_money` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "curr_money";

-- AlterTable
ALTER TABLE "Saving" ADD COLUMN     "budgetId" INTEGER;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
