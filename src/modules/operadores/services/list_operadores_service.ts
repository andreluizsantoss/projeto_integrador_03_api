import { inject, injectable } from 'tsyringe'
import { Operador } from '@shared/infra/database/entities/Operador'
import { IOperadoresRepository } from '@modules/operadores/domain/repositories/i_operadores_repository'

@injectable()
export class ListOperadoresService {
  constructor(
    @inject('OperadoresRepository')
    private operadoresRepository: IOperadoresRepository,
  ) {}

  async execute(): Promise<Pick<Operador, 'idOperador' | 'nome'>[]> {
    return this.operadoresRepository.listAll()
  }
}
