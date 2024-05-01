
import prismaClient from '../Prisma';

class ListEventoService {
    async execute() {
        const eventos = await prismaClient.evento.findMany();
        return eventos;
    }
}

export  {ListEventoService};
