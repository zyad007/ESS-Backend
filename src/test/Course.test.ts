import pool from "../db/postgres";
import Course from "../models/Course";


beforeAll(async () => {
    //Users
    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
    ,['zyad.007@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'zyad sallem', 1])

    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
    ,['bichoo004@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'bichoy atef', 2])

    //Course
    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    ,['Python v3 full course', 'This is python course', 0, 1, 'programming',1])

    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    ,['Java v8 full course', 'This is java course', 0, 1, 'programming',2])

    await pool.query('INSERT INTO user_course (id, user_id, course_id) VALUES ($1,$2,$3)',
    [1, 2, 1]);
})

test('Create Course',async () => {
    const course1 = {
        name: 'C++ with GUI full course',
        description: 'This course is about C++',
        teacher_id: 1,
        category: 'programming'
    }
    expect(await Course.newSave(course1)).toBe('Created');

    const course2 = {
        name: 'C++',
        description: 'This course is about C++',
        teacher_id: 1,
        category: 'programming'
    }
    expect(await Course.newSave(course2)).toBe('Course name must be greater than 8');
})

test('Delete Course',async () => {
    
    expect(await Course.deleteNew(2, 9999)).toBe('User is not the teacher of the course');

    expect(await Course.deleteNew(9999, 1)).toBe('Course not found');

    expect(await Course.deleteNew(2, 1)).toBe('Deleted');
})

test('Catagery founder', async () => {
    const res1 = await Course.findByCategoryNew('programming');
    expect(res1).toBe('Founded');

    const res2 = await Course.findByCategoryNew('123');
    expect(res2).toBe('Catagory not founded');
})

// test('Join Course with code', async () => {
//     const res1 = await Course.joinNew("dCIXpFzP", 1);
//     expect(res1).toBe('Joined');

//     const res2 = await Course.joinNew("dCIXpFzP", 1);
//     expect(res2).toBe('You already joined to this course');

//     const res3 = await Course.joinNew("12231as", 1);
//     expect(res3).toBe('Course not found');

//     const res4 = await Course.joinNew("dCIXpFzP", 10);
//     expect(res4).toBe("You can't join as student in your course");
// })

// test('Join Course with id', async () => {
//     const res1 = await Course.joinByIdNew(1, 14);
//     expect(res1).toBe('Joined');

//     const res2 = await Course.joinByIdNew(1, 14);
//     expect(res2).toBe('You already joined to this course');

//     const res3 = await Course.joinByIdNew(9999, 14);
//     expect(res3).toBe('Course not found');

//     const res4 = await Course.joinByIdNew(1, 10);
//     expect(res4).toBe("You can't join as student in your course");
// })

// test('Join Course with id', async () => {
//     const res1 = await Course.removeUserNew(1, 38);
//     expect(res1).toBe('Removed');

//     const res2 = await Course.removeUserNew(1, 36);
//     expect(res2).toBe('You already joined to this course');

//     const res3 = await Course.removeUserNew(9999, 1);
//     expect(res3).toBe('Course not found');

//     const res4 = await Course.removeUserNew(1, 9999);
//     expect(res4).toBe("Student not found");
// })


beforeAll(async () => {
    //Users
    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
    ,['zyad.007@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'zyad sallem', 1])

    await pool.query('INSERT INTO "user" (email,password,name,id) VALUES ($1,$2,$3,$4)'
    ,['bichoo004@gmail.com', '$2b$08$oWgHYLUSkHwMGgmBdZIQWe6ImNDsPXkhfTkwJhpXzJMXSU76Xj28a', 'bichoy atef', 2])

    //Course
    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    ,['Python v3 full course', 'This is python course', 0, 1, 'programming',1])

    await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category,id) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    ,['Java v8 full course', 'This is java course', 0, 1, 'programming',2])

    await pool.query('INSERT INTO user_course (id, user_id, course_id) VALUES ($1,$2,$3)',
    [1, 2, 1]);
})