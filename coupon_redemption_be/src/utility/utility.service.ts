import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  capitalizeAllLetters(input: string): string {
    return input.toUpperCase();
  }
}
