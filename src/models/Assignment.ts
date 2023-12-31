import pool from "../db/postgres";
import AssignmentType from "../types/Assignemnt";
import Course from "./Course";

class Assignment {
    id: Number;
    title: String;
	description: String;
	file_url: String;
    course_id: Number;

    constructor(asssignment: AssignmentType) {
        this.id = asssignment.id as Number;
        this.title = asssignment.title as String;
        this.description = asssignment.description as String;
        this.file_url = asssignment.file_url as String;
        this.course_id = asssignment.course_id as Number;
    }

    static async save(asssignment: AssignmentType): Promise<Assignment> {

        const {rows} = await pool.query('INSERT INTO assignment (title,description,file_url,course_id) VALUES ($1,$2,$3) RETURNING *', 
        [asssignment.title, asssignment.description, asssignment.file_url, asssignment.course_id ]);
        
        const userCourseDb = rows[0];

        return new Assignment(userCourseDb);
    }

    static async saveNew(asssignment: AssignmentType): Promise<String> {

        if(!asssignment.title) return 'Invalid Title';

        if(!await Course.find(asssignment.course_id as number)) return 'Course not found';

        await pool.query('INSERT INTO assignment (title,description,file_url,course_id) VALUES ($1,$2,$3,$4)', 
        [asssignment.title, asssignment.description, asssignment.file_url, asssignment.course_id ]);
        

        return 'Created'
    }

    async save(): Promise<void> {
        await pool.query('UPDATE assignment SET title = $1, description = $2, file_url = $3 WHERE id = $4'
        ,[this.title, this.description, this.file_url , this.id]);
    }

    static async delete(id: Number): Promise<void> {
        await pool.query('DELETE FROM assignment WHERE id = $1', 
        [id]);
    }

    async delete(): Promise<void> {
        Assignment.delete(this.id);
    }

}

export default Assignment;