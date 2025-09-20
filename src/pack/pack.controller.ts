import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PackService } from './pack.service';
import { PackResponseDTO } from './dto/pack-response.dto';
import { PackRequestDTO } from './dto/pack-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Pack')
@Controller('pack')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PackController {
  constructor(private readonly packService: PackService) {}

  @Post()
  @ApiOperation({ summary: 'Empacotar pedidos' })
  @ApiResponse({
    status: 201,
    description: 'Pedidos empacotados',
    type: PackResponseDTO,
  })
  packOrder(@Body() packRequestDto: PackRequestDTO): PackResponseDTO {
    return this.packService.packOrder(packRequestDto);
  }
}
