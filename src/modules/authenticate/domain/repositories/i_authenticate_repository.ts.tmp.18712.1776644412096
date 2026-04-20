import { Operador } from '@modules/operadores/infra/typeorm/entities/Operador'

export interface IAuthenticateRepository {
  findOperadorByNome(nome: string): Promise<Operador | null>
  findOperadorById(id: number): Promise<Operador | null>
}
