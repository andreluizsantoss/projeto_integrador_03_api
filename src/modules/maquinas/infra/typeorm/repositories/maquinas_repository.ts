import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/database/data-source'
import { Maquina } from '@shared/infra/database/entities/Maquina'
import { IMaquinasRepository } from '@modules/maquinas/domain/repositories/i_maquinas_repository'

export class MaquinasRepository implements IMaquinasRepository {
  private repository: Repository<Maquina>

  constructor() {
    this.repository = AppDataSource.getRepository(Maquina)
  }

  async listAll(): Promise<Pick<Maquina, 'idMaquina' | 'nomeMaquina'>[]> {
    return this.repository.find({ select: { idMaquina: true, nomeMaquina: true } })
  }
}
