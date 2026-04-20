import { Request, Response } from 'express'
import { injectable } from 'tsyringe'
import { container } from 'tsyringe'
import { FindOperadorByTokenService } from '@authenticate/services/find_operador_by_token_service'

@injectable()
export default class FindOperadorByTokenController {
  public async show(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(FindOperadorByTokenService)
    const operador = await service.execute(request.user!.id)
    return response.status(200).json(operador)
  }
}
