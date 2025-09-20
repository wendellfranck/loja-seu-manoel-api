import { Injectable } from '@nestjs/common';
import { PackRequestDTO, ProdutoInputDTO } from './dto/pack-request.dto';
import {
  PackedBoxDTO,
  PackResponseDTO,
  ProdutoOutputDTO,
} from './dto/pack-response.dto';
import { BOX_TYPES, BoxType } from './models/box-types';

type ProdutoExpandido = ProdutoInputDTO & { volume: number };

@Injectable()
export class PackService {
  packOrder(order: PackRequestDTO): PackResponseDTO {
    const produtos: ProdutoExpandido[] = order.pedidos.flatMap((pedido) =>
      pedido.produtos.flatMap((produto) =>
        Array(produto.quantidade ?? 1)
          .fill(null)
          .map(() => ({
            ...produto,
            volume:
              produto.dimensoes.altura *
              produto.dimensoes.largura *
              produto.dimensoes.comprimento,
          })),
      ),
    );

    // ordenar por volume decrescente
    produtos.sort((a, b) => b.volume - a.volume);

    const caixasUsadas: PackedBoxDTO[] = [];

    for (const produto of produtos) {
      let encaixotado = false;
      for (const caixa of caixasUsadas) {
        const caixaTipo = BOX_TYPES.find((b) => b.id === caixa.idCaixa);
        if (!caixaTipo) continue;
        const volumeProdutosNaCaixa = caixa.produtos.reduce((acc, p) => {
          return (
            acc +
            p.dimensoes.altura * p.dimensoes.largura * p.dimensoes.comprimento
          );
        }, 0);
        if (volumeProdutosNaCaixa + produto.volume <= caixaTipo.volume) {
          caixa.produtos.push(this.mapToOutput(produto));
          encaixotado = true;
          break; // produto encaixotado, sai do loop de caixas
        }
      }
      if (!encaixotado) {
        const caixaTipo = this.encontrarCaixaQueCabe(produto);
        if (!caixaTipo) {
          throw new Error(
            `Produto ${produto.produto_id} não cabe em nenhuma caixa disponível.`,
          );
        }
        caixasUsadas.push({
          idCaixa: caixaTipo.id,
          produtos: [this.mapToOutput(produto)],
        });
      }
    }
    return { caixas: caixasUsadas };
  }

  private encontrarCaixaQueCabe(produto: ProdutoExpandido): BoxType | null {
    return (
      BOX_TYPES.find(
        (caixa) =>
          produto.dimensoes.altura <= caixa.altura &&
          produto.dimensoes.largura <= caixa.largura &&
          produto.dimensoes.comprimento <= caixa.comprimento,
      ) || null
    );
  }

  private mapToOutput(produto: ProdutoExpandido): ProdutoOutputDTO {
    return {
      id: produto.produto_id,
      nome: produto.produto_id, // se não tiver outro nome
      quantidade: produto.quantidade ?? 1,
      dimensoes: produto.dimensoes,
    };
  }
}
