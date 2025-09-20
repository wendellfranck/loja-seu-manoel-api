import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProdutoOutputDTO {
  @ApiProperty({ example: 'prod-123' })
  @IsString()
  id!: string;

  @ApiProperty({ example: 'Produto A' })
  @IsString()
  nome!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantidade!: number;

  @ApiProperty({
    example: { altura: 10, largura: 20, comprimento: 30 },
  })
  dimensoes!: {
    altura: number;
    largura: number;
    comprimento: number;
  };
}

export class PackedBoxDTO {
  @ApiProperty({ example: 'Caixa 1' })
  @IsString()
  idCaixa!: string;

  @ApiProperty({ type: [ProdutoOutputDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoOutputDTO)
  produtos!: ProdutoOutputDTO[];
}

export class PackResponseDTO {
  @ApiProperty({ type: [PackedBoxDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackedBoxDTO)
  caixas!: PackedBoxDTO[];
}
