import pool from '../db/postgres';
import User from '../models/User';
import initTable from './init';

beforeAll(async () => {
    // await initTable();
    //INIT
pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
,['zyad.007@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'zyad sallem', 1])
})

//Find User By Id
test('Find User By Id', async () => { 
    const resUser1 = await User.find(1);

    const expUser1 = new User({
        id: 1,
        email: 'zyad.007@gmail.com',
        name: 'zyad sallem',
        password: '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a'
    });

    expect(resUser1).toStrictEqual(expUser1);


    const resUser2 = await User.find(99999);
    const expUser2 = null;

    expect(resUser2).toStrictEqual(expUser2);
})

//Save new User 
test('Create new User',async () => {

    const user1 = {
        email: 'anas@mail.com',
        password: 'anas1234',
        name: 'anas hesham'
    }
    expect(await User.newSave(user1)).toBe('Created');


    const user2 = {
        email: 'bichoy@com',
        password: '010271042',
        name: 'bichoy'
    }
    expect(await User.newSave(user2)).toBe('Email not valid');

    const user3 = {
        email: 'adham@mail.com',
        password: '123',
        name: 'adham'
    }
    expect(await User.newSave(user3)).toBe('Password is too short');
})


//Check Password
test('Check user password with hashing',async () => {
    const user = await User.find('adham@mail.com');

    const res1 = await user.checkPassword('adham12312');
    expect(res1).toBe(true);

    const res2 = await user.checkPassword('1233111');
    expect(res2).toBe(false);
})


//Delete User
test('Delete User By Email', async () => {

    const resDelete1 = await User.newDelete('adham@mail.com');
    expect(resDelete1).toBe('Deleted');


    const resDelete2 = await User.newDelete('adham@mail.com123');
    expect(resDelete2).toBe('No User With this email');

})


afterAll(() => {
    return pool.query('DELETE FROM "user" WHERE id = 1')
  });