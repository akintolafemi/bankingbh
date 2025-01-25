import { IsString, IsNotEmpty, IsDecimal, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenCurrentAccountDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'c680e057-7e1f-470f-a482-e6404376b9c1',
  })
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @ApiProperty({
    type: 'string',
    example: '0.00',
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  initial_credit: number;
}
