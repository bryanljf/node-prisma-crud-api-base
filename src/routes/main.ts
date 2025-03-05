import { Router } from 'express';
import { createUser, createUsers } from '../services/user';

export const mainRouter = Router();

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Test 1',
        email: 'test1@gmail.com',
        posts: {
            create: {
                title: 'Test 1 Title',
                body: 'Test 1 Post'
            }
        }
    });
    if(user)res.status(201.).json({ user });
    else res.status(500).json({ error: 'An error has ocurred!'})
});

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        {name: 'João', email: 'joao@gmail.com'},
        {name: 'Luiz', email: 'luiz@gmail.com'},
        {name: 'Fulano', email: 'fulano@gmail.com'},
        {name: 'Julio 1', email: 'fulano@gmail.com'}
    ]);

    res.json({ count:result });
});