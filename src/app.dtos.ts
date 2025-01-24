import { IsString, IsNotEmpty, IsDecimal, IsOptional } from 'class-validator';

export class OpenCurrentAccountDto {
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsDecimal()
  @IsOptional()
  initial_credit: number;
}
