import { Operador } from '@shared/infra/database/entities/Operador'

export interface IOperadoresRepository {
  listAll(): Promise<Pick<Operador, 'idOperador' | 'nome'>[]>
}
