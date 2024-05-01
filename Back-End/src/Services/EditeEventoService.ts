import prismaClient from "../Prisma";

interface EditEventosProsp {
    id: string;
    titulo: string;
    descricao: string;
    horario: string;
    data: string;
}
class EditeEventoService {
    async execute({ id, titulo, descricao, horario, data }: EditEventosProsp) {
        const evento = await prismaClient.evento.update({
            where: { id }, 
            data: {
                titulo,
                descricao,
                horario,
                data,
            },
        });
        return evento;
    }
}

export { EditeEventoService };
