import { Router } from 'express';
import { createUser, createUsers, deleteUser, getAllUsers, getAllUsers_Page, getUserByEmail, updateUser } from '../services/user';
import { parse } from 'path';

export const mainRouter = Router();

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Test 5',
        email: 'test5@gmail.com',
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

mainRouter.get('/users', async (req, res) => {
    const users = await getAllUsers();

    if (users) res.status(200).json({ users });
    else res.status(500).json({ error:'An error has ocurred!' });
});

mainRouter.get('/user', async (req, res) => {
    const { email } = req.query;
    const user = await getUserByEmail(email as string);

    if (user) res.status(200).json({ user });
    else res.status(500).json({ error:'An error has ocurred!' });
});

mainRouter.get('/users_page', async (req, res) => {
    const users = await getAllUsers_Page();

    if (users) res.status(200).json({ users });
    else res.status(500).json({ error:'An error has ocurred!' });
});

mainRouter.put('/user', async (req, res) => {
    const result = await updateUser();

    if (result) res.status(200).json({ result });
    else res.status(500).json({ error:'An error has ocurred!' });
});

mainRouter.delete('/user', async (req, res) => {
    const { email } = req.query;
    const result = await deleteUser(email as string);

    if (result) res.status(200).json({ deletion_sucess:true });
    else res.status(500).json({ error:'An error has ocurred!' });    
});

