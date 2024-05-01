import { FastifyRequest, FastifyReply } from "fastify";
import { EditeEventoService } from "../Services/EditeEventoService";

interface EditEventosProsp {
    id: string;
    titulo: string;
    descricao: string;
    horario: string;
    data: string;
}

class EditeEventoController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, titulo, descricao, horario, data } = request.body as EditEventosProsp;
        const eventoService = new EditeEventoService();
        const evento = await eventoService.execute({ id, titulo, descricao, horario, data });

        reply.send(evento);
    }
}

export { EditeEventoController };
