import { Maquina } from '@shared/infra/database/entities/Maquina'

export interface IMaquinasRepository {
  listAll(): Promise<Pick<Maquina, 'idMaquina' | 'nomeMaquina'>[]>
}
