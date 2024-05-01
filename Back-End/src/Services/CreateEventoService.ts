import prismaClient from "../Prisma";

interface CreateEventosProsp{
    titulo: string;
    descricao:string; 
    horario:string;
    data:string;
}

class CreateEventoService{
    async execute({titulo,descricao,horario,data}:CreateEventosProsp){
        const evento =await prismaClient.evento.create({
            data:{
                titulo,
                descricao,
                horario,
                data,
            }
        })
        return evento
    }
}
export {CreateEventoService}