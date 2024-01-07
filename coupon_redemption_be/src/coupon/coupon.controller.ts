import { Controller, Get, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponDto } from './dto/coupon.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() couponDto: CouponDto) {
    return this.couponService.create(couponDto);
  }

  @Post('bulk')
  @UseGuards(AuthGuard)
  bulkCreate(@Body() couponDtos: CouponDto[]) {
    return this.couponService.bulkCreate(couponDtos);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.couponService.findAll();
  }

  @Delete(':couponCode')
  @UseGuards(AuthGuard)
  delete(@Param('couponCode') couponCode: string) {
    return this.couponService.delete(couponCode);
  }
}
