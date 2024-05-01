import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import {CreateEventoController} from '../Controllers/CreateEventoController'
import { ListEventoController } from "../Controllers/ListEventoController";
import { DeleteEventoController } from "../Controllers/DeleteEventoController";
import { EditeEventoController } from "../Controllers/EditeEventoController";


export async function routes(fastify:FastifyInstance, options:FastifyPluginOptions){


    fastify.post("/evento", async (request:FastifyRequest,reply:FastifyReply)=>{
        return new CreateEventoController().handle(request,reply)
    })
    fastify.get("/evento", async (request:FastifyRequest,reply:FastifyReply)=>{
        return new ListEventoController().handle(request,reply)
    })
    fastify.delete("/evento", async (request:FastifyRequest,reply:FastifyReply)=>{
        return new DeleteEventoController().handle(request,reply)
    })
    fastify.put("/evento/", async (request: FastifyRequest, reply: FastifyReply) => {
        return new EditeEventoController().handle(request, reply);
    });
}