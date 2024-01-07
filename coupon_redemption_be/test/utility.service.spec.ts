import { Test, TestingModule } from '@nestjs/testing';
import { UtilityService } from '../src/utility/utility.service';

describe('UtilityService', () => {
  let utilityService: UtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilityService],
    }).compile();

    utilityService = module.get<UtilityService>(UtilityService);
  });

  it('should be defined', () => {
    expect(utilityService).toBeDefined();
  });

  describe('capitalizeAllLetters', () => {
    it('should capitalize all alphabetical characters', () => {
      const inputString = 'ab123';
      const expectedResult = 'AB123';

      const result = utilityService.capitalizeAllLetters(inputString);

      expect(result).toEqual(expectedResult);
    });

    it('should handle an empty string', () => {
      const inputString = '';
      const expectedResult = '';

      const result = utilityService.capitalizeAllLetters(inputString);

      expect(result).toEqual(expectedResult);
    });

    it('should handle a null string', () => {
      const inputString = null;
      const expectedResult = null;

      const result = utilityService.capitalizeAllLetters(inputString);

      expect(result).toEqual(expectedResult);
    });
  });
});
