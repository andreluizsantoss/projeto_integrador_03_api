import { AppDataSource } from '@shared/infra/database/data-source'
import { Operador } from '@shared/infra/database/entities/Operador'
import { IAuthenticateRepository } from '@authenticate/domain/repositories/i_authenticate_repository'
import { Repository } from 'typeorm'

export class AuthenticateRepository implements IAuthenticateRepository {
  private repository: Repository<Operador>

  constructor() {
    this.repository = AppDataSource.getRepository(Operador)
  }

  async findOperadorByNome(nome: string): Promise<Operador | null> {
    return this.repository.findOne({ where: { nome } })
  }

  async findOperadorById(id: number): Promise<Operador | null> {
    return this.repository.findOne({ where: { idOperador: id } })
  }
}
