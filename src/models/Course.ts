import pool from "../db/postgres";
import CourseType from "../types/Course";
import utils from "../utils/utils";
import User from "./User";
import User_Course from "./User_Course";

class Course {
    id: Number;
    name: String;
    description: String;
    no_participants: number;
    teacher_id: Number;
    code: String;
    category: String;
    img: String;

    constructor(course: CourseType) {
        this.id = course.id as Number;
        this.description = course.description as String;
        this.name = course.name as String;
        this.no_participants = course.no_participants as number;
        this.teacher_id = course.teacher_id as Number;
        this.code = course.code as String;
        this.category = course.category as String;
        this.img = course.img as String;
    }

    //CRUD
    static async find(id: number): Promise<Course | null> {
        let courseDb : CourseType | undefined;
        
        const {rows} =  await pool.query('SELECT * FROM course WHERE id = $1', [id]);
        courseDb = rows[0];

        if(!courseDb) return null;

        return new Course(courseDb);
    }

    static async findAll(): Promise<Course[]> {
        const courses: Course[] = [];

        const {rows} = await pool.query('SELECT * FROM course');

        rows.forEach(row => {
            const course: CourseType = row;
            courses.push(new Course(course));
        })
        
        return courses;
    }

    static async save(course: CourseType): Promise<Course> {

        const courses = await Course.findAll()
        let code = utils.makeid(8);
        
        let flag = true;

        while(flag) {
            code = utils.makeid(8);
            
            if(courses.length === 0) break;

            for(let i=0; i<courses.length; i++) {
                flag = false;
                if(courses[i].code === code){
                    code = utils.makeid(8);
                    flag = true;
                    break;
                }
            }
        }

        const {rows} = await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', 
        [course.name,course.description,0,course.teacher_id,code,course.category]);
        
        const courseDb = rows[0];

        return new Course(courseDb);
    }

    static async newSave(course: CourseType): Promise<String> {

        if(Number(course.name?.length) < 8) return 'Course name must be greater than 8'

        const courses = await Course.findAll()
        let code = utils.makeid(8);
        
        let flag = true;

        while(flag) {
            code = utils.makeid(8);
            
            if(courses.length === 0) break;

            for(let i=0; i<courses.length; i++) {
                flag = false;
                if(courses[i].code === code){
                    code = utils.makeid(8);
                    flag = true;
                    break;
                }
            }
        }

        const {rows} = await pool.query('INSERT INTO course (name,description,no_participants,teacher_id,code,category) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', 
        [course.name,course.description,0,course.teacher_id,code,course.category]);
        
        const courseDb = rows[0];

        return 'Created';
    }

    static async joinNew(code:string, user_id:number) {

        const course = await Course.findByCode(code);

        if(!course) return 'Course not found'

        if(course.teacher_id === user_id) return "You can't join as student in your course"

        const user_course = await User_Course.findByUserIdAndCourseId(course.id as number, user_id);

        if(user_course) return "You already joined to this course"

        await User_Course.save({
            user_id: user_id,
            course_id: course.id
        });

        return 'Joined'
    }

    static async joinByIdNew(id:number, user_id:number) {

        const course = await Course.find(id);

        if(!course) return 'Course not found'

        if(course.teacher_id === user_id) return "You can't join as student in your course"

        const user_course = await User_Course.findByUserIdAndCourseId(course.id as number, user_id);

        if(user_course) return "You already joined to this course"

        await User_Course.save({
            user_id: user_id,
            course_id: course.id
        });

        return 'Joined'
    }

    static async removeUserNew(id:number, studentId:number) {
        const courseId = Number(id);
        const userId = Number(studentId)

        const course = await Course.find(courseId);

        if(!course) return 'Course not found'

        if(!await User.find(studentId)) return 'Student not found';

        const user_course = await User_Course.findByUserIdAndCourseId(courseId, userId);

        if(!user_course) return "Studnet is not assigned in course"

        await user_course.delete();

        return 'Removed'
    }

    static async findByCode(code:string): Promise<Course> {
        const {rows} = await pool.query('SELECT * FROM course WHERE code = $1',
        [code]);

        return rows[0];
    }

    static async findByCategory(category:string): Promise<Course[]> {
        const courses: Course[] = [];

        const {rows} = await pool.query('SELECT * FROM course WHERE category = $1 LIMIT 5',
        [category]);

        rows.forEach(row => {
            const course: CourseType = row;
            courses.push(new Course(course));
        })
        
        return courses;
    }

    static async findByCategoryNew(category:string): Promise<String> {
        const courses: Course[] = [];

        const {rows} = await pool.query('SELECT * FROM course WHERE category = $1 LIMIT 5',
        [category]);

        rows.forEach(row => {
            const course: CourseType = row;
            courses.push(new Course(course));
        })

        if(rows.length == 0) return 'Catagory not founded'
        
        return 'Founded';
    }

    async save(): Promise<void> {
        await pool.query('UPDATE course SET name = $1, description = $2, no_participants = $3   WHERE id = $4'
        ,[this.name, this.description, this.no_participants, this.id]);
    }

    static async delete(id: Number): Promise<void> {
        await pool.query('DELETE FROM course WHERE id = $1', [id]);
    }

    static async deleteNew(id: Number, teacher_id:Number): Promise<String> {
        const course = await Course.find(id as number);

        if(!course) return 'Course not found'

        if(course.teacher_id !== teacher_id) return 'User is not the teacher of the course'
        
        await pool.query('DELETE FROM course WHERE id = $1', [id]);

        return 'Deleted'
    }

    async delete(): Promise<void> {
        await Course.delete(this.id);
    }

    //User Relation
    static async getTeacherCourses(teacher_id:Number): Promise<Course[]> {
        const {rows} = await pool.query('SELECT * FROM course WHERE teacher_id = $1',
        [teacher_id]);

        rows.map(row => new Course(row as CourseType))

        return rows
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            no_participants:this.no_participants,
            teacher_id:this.teacher_id,
            code:this.code,
            category:this.category
        }
    }

}

export default Course;