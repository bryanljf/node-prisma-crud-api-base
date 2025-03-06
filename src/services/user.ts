import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
    /* Método tradicional, sempre vai tentar criar um usuário
    try{ 
        const user = await prisma.user.create({ data }) ;
        return user;
    } catch (error){
        return false;
    }
    */
    //Tenta encontrar o usuário e retornar-lo, caso não tenha é criado
    try{
        const user = await prisma.user.upsert({
            where: {
                email: data.email
            },
            update: {},
            create: data
        });

        return user;
    }catch (error){
        console.log(error);
        return false;
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try{
        const result = await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        });
        return result;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getAllUsers = async () => {
    try{
        const users = await prisma.user.findMany({
            /*
            where: {
                Condicional para valores exclusivos (E) :
                email: {
                    endsWith: '@gmail.com'
                }
                
                Condicionais para valores não exclusivos (OU) :
                OR: [
                    {email: { endsWith:'@hotmail.com' }},
                    //{email: { endsWith:'@gmail.com' }},
                    {name:  { startsWith:'Luiz' }}
                ]
            },
            */
            //FILTRAGEM DE RELACIONAMENTO:
            //where: {posts:{every:{title:{ startsWith: 'Titulo' }}}},
            select: {
                id: true,
                name: true,
                email: true,
                _count: {select:{ posts:true }}
            },
            orderBy: [{ name:'asc' }, { id:'asc' }]
        });
        return users;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const getUserByEmail = async (email: string) => {
    try{ 
        const user = await prisma.user.findUnique({where: { email } });
        return user;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

export const getAllUsers_Page = async () => {
    let page = 1;
    let perPage = 2;

    try{
        const users = await prisma.user.findMany({
            skip: ((page - 1) * perPage),
            take: 2,
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return users;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

export const updateUser = async () => {
    //updateMany para atualizar em massa 
    const updatedUser = await prisma.user.update({
        where: {
            email: 'luiz@gmail.com'
        },
        data: {
            role: 'ADMIN'
        }
    });

    return updatedUser;
}

export const deleteUser = async (email: string) => {
    try{ 
        const result = await prisma.user.delete({ where: { email } });

    }catch (error){
        console.log(error);
        return false;
    }
}