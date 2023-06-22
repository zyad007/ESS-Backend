import pool from "../db/postgres"

const initTable = async () => {
    await pool.query('DROP TABLE "user"')
    await pool.query('CREATE TABLE "user" ( id SERIAL PRIMARY KEY NOT NULL, email VARCHAR(50) NOT NULL, name VARCHAR(50), password VARCHAR(255) );');
    
    await pool.query('DROP TABLE course')
    await pool.query('CREATE TABLE course ( id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(50), description VARCHAR(255), no_participants INT, category VARCHAR(25), code VARCHAR(8), teacher_id INT, CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE );')
    
    await pool.query('DROP TABLE user_course')
    await pool.query('CREATE TABLE user_course ( id SERIAL PRIMARY KEY NOT NULL, role VARCHAR(50), course_id INT, CONSTRAINT fk_course FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE CASCADE, user_id INT, CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE );');
    
    await pool.query('DROP TABLE assignemnt')
    await pool.query('CREATE TABLE assignment ( id SERIAL PRIMARY KEY NOT NULL, title VARCHAR(50), description VARCHAR(255), file_url VARCHAR(255), course_id INT, CONSTRAINT fk_course FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE CASCADE );')
}



export default initTable;