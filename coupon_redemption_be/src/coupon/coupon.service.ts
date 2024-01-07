import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponDto } from './dto/coupon.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async create(couponDto: CouponDto) {
    try {
      return await this.prisma.coupons.create({
        data: {
          couponCode: couponDto.couponCode,
          couponName: couponDto.couponName,
          startDate: new Date(couponDto.startDate).toISOString(),
          endDate: new Date(couponDto.endDate).toISOString(),
          quota: couponDto.quota,
          remainingQuota: couponDto.quota,
        },
        select: {
          couponCode: true,
          couponName: true,
          startDate: true,
          endDate: true,
          quota: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Coupon code already exists');
        }
      }

      throw error;
    }
  }

  async bulkCreate(couponDtos: CouponDto[]) {
    try {
      const transformedCouponDtos = couponDtos.map((couponDto) => ({
        ...couponDto,
        startDate: new Date(couponDto.startDate).toISOString(),
        endDate: new Date(couponDto.endDate).toISOString(),
        remainingQuota: couponDto.quota,
      }));

      return await this.prisma.coupons.createMany({
        data: transformedCouponDtos,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Coupon code already exists');
        }
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.coupons.findMany({
      select: {
        couponCode: true,
        couponName: true,
        startDate: true,
        endDate: true,
        quota: true,
        remainingQuota: true,
      },
      orderBy: [
        {
          startDate: 'asc',
        },
        {
          endDate: 'asc',
        },
      ],
    });
  }

  async delete(couponCode: string) {
    return await this.prisma.coupons.delete({
      where: {
        couponCode,
      },
    });
  }
}
