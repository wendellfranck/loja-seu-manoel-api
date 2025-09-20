export interface BoxType {
  id: string;
  altura: number;
  largura: number;
  comprimento: number;
  volume: number;
}

export const BOX_TYPES: BoxType[] = [
  {
    id: 'Caixa 1',
    altura: 30,
    largura: 40,
    comprimento: 80,
    volume: 30 * 40 * 80,
  },
  {
    id: 'Caixa 2',
    altura: 50,
    largura: 50,
    comprimento: 40,
    volume: 50 * 50 * 40,
  },
  {
    id: 'Caixa 3',
    altura: 50,
    largura: 80,
    comprimento: 60,
    volume: 50 * 80 * 60,
  },
];
