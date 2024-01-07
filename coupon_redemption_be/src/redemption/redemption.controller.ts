import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { RedemptionService } from './redemption.service';
import { RedemptionDto } from './dto/redemption.dto';
import { UtilityService } from 'src/utility/utility.service';

@Controller('redemption')
export class RedemptionController {
  constructor(
    private readonly redemptionService: RedemptionService,
    private readonly utility: UtilityService,
  ) {}

  @Post()
  redeem(@Body() redemptionDto: RedemptionDto) {
    redemptionDto.hkid = this.utility.capitalizeAllLetters(redemptionDto.hkid);
    return this.redemptionService.redeem(redemptionDto);
  }
}
