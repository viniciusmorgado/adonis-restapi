import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from "App/Models/Comment";

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {

    const body = request.body();
    const comment = await Comment.create(body);
    response.status(200);

    return {
      message: 'Comentário registrado com sucesso!',
      data: comment
    }
  }
}

/*
  public async index() {

  }

  public async show({params}: HttpContextContract) {

  }

  public async destroy({params}: HttpContextContract) {

  }

  public async update({params, request}: HttpContextContract){*/
/*

  }
}
*/
