-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "payment_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Saving" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Saving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graph" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "savings" INTEGER NOT NULL,
    "expend" INTEGER NOT NULL,

    CONSTRAINT "Graph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Graph_label_key" ON "Graph"("label");

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
