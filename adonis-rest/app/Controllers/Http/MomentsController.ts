import {v4 as uuidv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
  private ValidationsOptions = {
    types: ["image"],
    size: '2mb'
  }
  // Nosso método store é um verbo post, ele sempre recebe uma
  // request e uma response, nesse caso utilizamos o HttpContextContract
  // para pegar esses valores do corpo da requisição.
  public async store({ request, response }: HttpContextContract) {
    // O valor de body é salvo na constante body
    const body = request.body();
    // Aqui salvamos a imagem que vem no corpo da request
    // porém aplicamos as validações definidas na propriedade privada
    // da classe MomentsController chamada ValidationsOptions
    const image = request.file('image', this.ValidationsOptions)
    // Esse bloco if altera o nome da imagem para um uuid gerado
    // automaticamente, para evitar risco de sobreposição.
    if(image){
      // Interpola o nome da imagem com o uuid
      const imageName = `${uuidv4()}.${image.extname}`
      // Move a imagem para o diretório do servidor que
      // a mesma será armazenada, e passa o novo nome
      // da imagem para a mesma.
      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })
      body.image = imageName;
    }
    // Cria o item no banco de dados, e armazena o valor
    // do objeto criado em uma variável
    const moment = await Moment.create(body);
    // retorna o status http bem sucedido
    response.status(201);
    // Retornar uma mensagem de bem sucedido junto
    // a uma cópia dos dados inseridos
    return {
      message: 'Momento criado com sucesso!',
      data: moment
    }
  }
}
