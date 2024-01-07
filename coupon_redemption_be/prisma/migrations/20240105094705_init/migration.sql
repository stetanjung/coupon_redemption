-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "couponCode" TEXT NOT NULL,
    "couponName" TEXT NOT NULL,
    "quota" INTEGER NOT NULL,
    "remainingQuota" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redemptions" (
    "id" SERIAL NOT NULL,
    "hkid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "couponCode" TEXT NOT NULL,

    CONSTRAINT "redemptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_couponCode_key" ON "coupons"("couponCode");

-- AddForeignKey
ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "coupons"("couponCode") ON DELETE RESTRICT ON UPDATE CASCADE;
