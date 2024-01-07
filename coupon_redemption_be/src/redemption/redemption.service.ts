import { ConflictException, Injectable } from '@nestjs/common';
import { RedemptionDto } from './dto/redemption.dto';

import { PrismaService } from 'src/prisma/prisma.service';

import * as idValidation from 'validid';

@Injectable()
export class RedemptionService {
  constructor(private prisma: PrismaService) {}

  async redeem(redemptionDto: RedemptionDto) {
    if (!idValidation.hkid(redemptionDto.hkid)) {
      throw new ConflictException('HKID is not valid');
    }

    const validCoupon = await this.prisma.coupons.findFirst({
      where: {
        couponCode: redemptionDto.couponCode,
      },
    });

    if (!validCoupon) {
      throw new ConflictException('Coupon is not found');
    }

    if (validCoupon.remainingQuota === 0) {
      throw new ConflictException('Coupon has no remaining quota');
    }

    const currDate = new Date();
    currDate.setUTCHours(currDate.getUTCHours() + 8, 0, 0, 0);

    if (
      validCoupon.startDate >= new Date(currDate) ||
      validCoupon.endDate <= new Date(currDate)
    ) {
      throw new ConflictException('Coupon cannot be redeem at this time');
    }

    const redeemed = await this.prisma.redemptions.findFirst({
      where: {
        hkid: redemptionDto.hkid,
        couponCode: redemptionDto.couponCode,
      },
    });

    if (redeemed) {
      throw new ConflictException('Coupon has already been redeemed');
    }

    const redemption = await this.prisma.redemptions.create({
      data: {
        hkid: redemptionDto.hkid,
        couponCode: redemptionDto.couponCode,
      },
      select: {
        hkid: true,
        couponCode: true,
        createdAt: true,
      },
    });

    validCoupon.remainingQuota -= 1;
    await this.prisma.coupons.update({
      where: {
        couponCode: redemptionDto.couponCode,
      },
      data: {
        remainingQuota: validCoupon.remainingQuota,
      },
    });

    return redemption;
  }
}
