import { Repository } from 'typeorm'
import { AppDataSource } from '@shared/infra/database/data-source'
import { Operador } from '@shared/infra/database/entities/Operador'
import {
  IOperadoresRepository,
  IOperadorListItem,
} from '@modules/operadores/domain/repositories/i_operadores_repository'

export class OperadoresRepository implements IOperadoresRepository {
  private repository: Repository<Operador>

  constructor() {
    this.repository = AppDataSource.getRepository(Operador)
  }

  async listAll(): Promise<IOperadorListItem[]> {
    const operadores = await this.repository.find({
      select: { idOperador: true, nome: true },
      relations: { idEmpresa2: true },
    })

    return operadores.map(op => ({
      idOperador: op.idOperador,
      nome: op.nome,
      idEmpresa: op.idEmpresa2?.idEmpresa ?? null,
      nomeEmpresa: op.idEmpresa2?.nome ?? null,
    }))
  }
}
