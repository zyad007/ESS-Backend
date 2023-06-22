import pool from "../db/postgres"
import Assignment from "../models/Assignment"
import initTable from "./init"

beforeAll(async () => {
    // INIT
    // await initTable();

    //Users
    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
        , ['zyad.007@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'zyad sallem', 5])

    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
        , ['bichoo004@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'bichoy atef', 6])

    //Course
    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
        , ['Python v3 full course', 'This is python course', 0, 5, 'PYTH1212', 'programming', 5])
        
    await pool.query('INSERT INTO assignment (id, title, description, file_url, course_id) VALUES ($1,$2,$3,$4,$5)'
    ,[1, 'Sheet 1', 'Sheet about python strings', 'http://drive.google.com', 5]);

    await pool.query('INSERT INTO assignment (id, title, description, file_url, course_id) VALUES ($1,$2,$3,$4,$5)'
    ,[2, 'Sheet 2', 'Sheet about python arrays', 'http://drive.google.com', 5]);

    await pool.query('INSERT INTO user_course (id, user_id, course_id) VALUES ($1,$2,$3)',
        [1, 5, 5]);
})

test('Create Assignment', async () => {
    const res1 = await Assignment.saveNew({
        title: 'Sheet 3',
        description: '1',
        file_url: 'drive',
        course_id: 9999,
        id: 50
    })
    expect(res1).toBe('Course not found')

    const res2 = await Assignment.saveNew({
        course_id: 5,
        description: '1',
        file_url: 'drive',
        id: 30
    })
    expect(res2).toBe('Invalid Title')

    const res3 = await Assignment.saveNew({
        title: 'Sheet 3',
        description: '1',
        file_url: 'drive',
        course_id: 5,
        id: 10
    })
    expect(res3).toBe('Created')
})

afterAll(async () => {
    //Users
    await pool.query('DELETE FROM "user" WHERE id = 1 OR id = 2 OR id = 3 OR id = 4 OR id =5 OR id=6')

    //Course
    await pool.query('DELETE FROM course WHERE id = 1 OR id = 2 OR id=5')

    //Assigment
    await pool.query('DELETE FROM assignment WHERE id = 1 OR id = 2 OR id=3')
    
})