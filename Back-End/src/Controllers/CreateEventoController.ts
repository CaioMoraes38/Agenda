import { FastifyRequest,FastifyReply } from "fastify";
import { CreateEventoService } from "../Services/CreateEventoService";
import prismaClient from "../Prisma";

class CreateEventoController{
    async handle(request:FastifyRequest, reply:FastifyReply){
        const {titulo,descricao,horario, data} = request.body as {titulo:string, descricao:string, horario:string,data:string}
        const eventoService =new CreateEventoService();
        const evento = await eventoService.execute({titulo, descricao, horario, data});

        reply.send(evento);
    }
}
export  {CreateEventoController}