import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'
import { ListMaquinasService } from '@modules/maquinas/services/list_maquinas_service'

@injectable()
export default class ListMaquinasController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListMaquinasService)
    const maquinas = await service.execute()
    return response.status(200).json(maquinas)
  }
}
