import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteEventoService } from "../Services/DeleteEventoService";

class DeleteEventoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const eventoService = new DeleteEventoService();
        const evento = await eventoService.execute({id})

        reply.send({ message: "Evento deletado com sucesso" });
    }
}

export { DeleteEventoController };
