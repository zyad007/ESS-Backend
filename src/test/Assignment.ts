import pool from "../db/postgres"
import Assignment from "../models/Assignment"

beforeAll(async () => {
    //Users
    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
        , ['zyad.007@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'zyad sallem', 1])

    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
        , ['bichoo004@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'bichoy atef', 2])

    //Course
    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
        , ['Python v3 full course', 'This is python course', 0, 1, 'PYTH1212', 'programming', 1])
        
    await pool.query('INSERT INTO assignment (id, title, description, fule_url, course_id)'
    ,[1, 'Sheet 1', 'Sheet about python strings', 'http://drive.google.com', 1]);

    await pool.query('INSERT INTO assignment (id, title, description, fule_url, course_id)'
    ,[2, 'Sheet 2', 'Sheet about python arrays', 'http://drive.google.com', 1]);

    await pool.query('INSERT INTO user_course (id, user_id, course_id) VALUES ($1,$2,$3)',
        [1, 2, 1]);
})

test('', async () => {
    const res1 = await Assignment.saveNew({
        title: 'Sheet 3',
        course_id: 9999,
        id: 3
    })
    expect(res1).toBe('Course not found')

    const res2 = await Assignment.saveNew({
        course_id: 1,
        id: 3
    })
    expect(res1).toBe('Invalid Title')

    const res3 = await Assignment.saveNew({
        title: 'Sheet 3',
        course_id: 1,
        id: 3
    })
    expect(res1).toBe('Created')
})

afterAll(async () => {
    //Users
    await pool.query('DELETE FROM "user" WHERE id = 1 OR id = 2 OR id = 3 OR id = 4')

    //Course
    await pool.query('DELETE FROM course WHERE id = 1 OR id = 2')
    
})