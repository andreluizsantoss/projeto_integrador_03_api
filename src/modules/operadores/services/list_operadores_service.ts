import { inject, injectable } from 'tsyringe'
import {
  IOperadoresRepository,
  IOperadorListItem,
} from '@modules/operadores/domain/repositories/i_operadores_repository'

@injectable()
export class ListOperadoresService {
  constructor(
    @inject('OperadoresRepository')
    private operadoresRepository: IOperadoresRepository,
  ) {}

  async execute(): Promise<IOperadorListItem[]> {
    return this.operadoresRepository.listAll()
  }
}
