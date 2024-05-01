import prismaClient from "../Prisma";

interface DeleteEventoProps {
    id: string;
}

class DeleteEventoService {
    async execute({ id }: DeleteEventoProps) {
        const findEventos= await prismaClient.evento.findFirst({
            where: {
                id: id
            }
        });
        if(!findEventos){
            throw new Error ("Cliente não existe")
        }

        await prismaClient.evento.delete({
            where: {
                id: findEventos.id
            }
        });
        return{message: "Deletado com sucesso: "}
    }
}

export { DeleteEventoService };
