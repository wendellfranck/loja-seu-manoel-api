import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class DimensoesDTO {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Type(() => Number)
  altura!: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Type(() => Number)
  largura!: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Type(() => Number)
  comprimento!: number;
}

export class ProdutoInputDTO {
  @ApiProperty({ example: 'PS5' })
  @IsString()
  produto_id!: string;

  @ApiProperty({ type: DimensoesDTO })
  @ValidateNested()
  @Type(() => DimensoesDTO)
  dimensoes!: DimensoesDTO;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Type(() => Number)
  quantidade!: number;
}

export class PedidoInputDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  pedido_id!: number;

  @ApiProperty({ type: [ProdutoInputDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoInputDTO)
  produtos!: ProdutoInputDTO[];
}

export class PackRequestDTO {
  @ApiProperty({ type: [PedidoInputDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoInputDTO)
  pedidos!: PedidoInputDTO[];
}
