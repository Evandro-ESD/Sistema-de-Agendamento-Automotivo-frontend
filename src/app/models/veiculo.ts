export interface Veiculo {
  id: string;
  associado_id: string;
  marca: string;
  modelo: string;
  placa: string;
  ano?: number;
  created_at: string;
}
