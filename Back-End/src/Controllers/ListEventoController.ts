import { FastifyRequest,FastifyReply } from "fastify";
import { ListEventoService } from "../Services/ListEventoService";

class ListEventoController{
    async handle(request:FastifyRequest, reply:FastifyReply){
        const listEventoService = new ListEventoService();
        const evento = await listEventoService.execute()
        reply.send(evento)
    }
}
export {ListEventoController}