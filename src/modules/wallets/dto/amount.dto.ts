import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  Length,
  IsEnum,
} from 'class-validator';
import { AMOUNT_TYPES, AmountType } from '../constants/amount-type.enum.js';


export class AmountDto {
  @IsInt()
  @Min(1)
  @Max(1_000_000)
  amount!: number;

  @IsOptional()
  @IsString()
  @Length(0, 64)
  reason?: string;

  @IsOptional()
  @IsEnum(AMOUNT_TYPES)
  type?: AmountType;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  cid?: string;
}
