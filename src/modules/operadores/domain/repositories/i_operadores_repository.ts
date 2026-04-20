export interface IOperadorListItem {
  idOperador: number
  nome: string | null
  idEmpresa: number | null
  nomeEmpresa: string | null
}

export interface IOperadoresRepository {
  listAll(): Promise<IOperadorListItem[]>
}
