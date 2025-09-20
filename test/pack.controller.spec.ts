import { Test, TestingModule } from '@nestjs/testing';
import { PackController } from '../src/pack/pack.controller';
import { PackService } from '../src/pack/pack.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

// Mock do PackService
const mockPackService = {
  pack: jest.fn().mockReturnValue({ message: 'Produto embalado com sucesso' }),
};

// Mock do Guard para não precisar gerar token real
class MockJwtAuthGuard {
  canActivate(context: ExecutionContext) {
    return true; // sempre permite
  }
}

describe('PackController', () => {
  let controller: PackController;
  let service: PackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackController],
      providers: [
        { provide: PackService, useValue: mockPackService },
      ],
    })
      .overrideGuard(JwtAuthGuard) // substitui o guard real pelo mock
      .useClass(MockJwtAuthGuard)
      .compile();

    controller = module.get<PackController>(PackController);
    service = module.get<PackService>(PackService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service.pack e retornar a resposta', async () => {
    const dto = { product: 'PS5' };

    const result = await controller.pack(dto);

    expect(service.pack).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ message: 'Produto embalado com sucesso' });
  });
});
