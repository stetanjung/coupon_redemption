import { Module } from '@nestjs/common';
import { CouponModule } from './coupon/coupon.module';
import { RedemptionModule } from './redemption/redemption.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UtilityModule } from './utility/utility.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CouponModule,
    RedemptionModule,
    PrismaModule,
    UtilityModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
