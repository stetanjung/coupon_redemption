import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CouponDto {
  @IsString()
  couponCode: string;
  @IsString()
  couponName: string;
  @IsNotEmpty()
  quota: number;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
}
