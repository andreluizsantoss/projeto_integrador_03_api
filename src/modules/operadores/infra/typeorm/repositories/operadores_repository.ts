import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/database/data-source'
import { Operador } from '@shared/infra/database/entities/Operador'
import { IOperadoresRepository } from '@modules/operadores/domain/repositories/i_operadores_repository'

export class OperadoresRepository implements IOperadoresRepository {
  private repository: Repository<Operador>

  constructor() {
    this.repository = AppDataSource.getRepository(Operador)
  }

  async listAll(): Promise<Pick<Operador, 'idOperador' | 'nome'>[]> {
    return this.repository.find({ select: { idOperador: true, nome: true } })
  }
}
