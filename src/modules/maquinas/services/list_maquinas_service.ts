import { inject, injectable } from 'tsyringe'
import { Maquina } from '@shared/infra/database/entities/Maquina'
import { IMaquinasRepository } from '@modules/maquinas/domain/repositories/i_maquinas_repository'

@injectable()
export class ListMaquinasService {
  constructor(
    @inject('MaquinasRepository')
    private maquinasRepository: IMaquinasRepository,
  ) {}

  async execute(): Promise<Pick<Maquina, 'idMaquina' | 'nomeMaquina'>[]> {
    return this.maquinasRepository.listAll()
  }
}
