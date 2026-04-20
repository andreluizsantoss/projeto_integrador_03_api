import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'
import { ListOperadoresService } from '@modules/operadores/services/list_operadores_service'

@injectable()
export default class ListOperadoresController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListOperadoresService)
    const operadores = await service.execute()
    return response.status(200).json(operadores)
  }
}
