import pool from "../db/postgres"

const initTable = async () => {
    await pool.query('DROP TABLE "user"')

    await pool.query("CREATE TABLE IF NOT EXISTS public.user_course(id integer NOT NULL DEFAULT nextval('user_course_id_seq'::regclass),course_id integer,user_id integer,CONSTRAINT user_course_pkey PRIMARY KEY (id),CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES public.course (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,CONSTRAINT fk_user FOREIGN KEY (user_id)    REFERENCES public.\"user\" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE)TABLESPACE pg_default; ALTER TABLE IF EXISTS public.user_course OWNER to postgres;");

    await pool.query('DROP TABLE course')
    await pool.query("CREATE TABLE IF NOT EXISTS public.course ( id integer NOT NULL DEFAULT nextval('course_id_seq'::regclass), name character varying(50) COLLATE pg_catalog.\"default\", description character varying(255) COLLATE pg_catalog.\"default\", no_participants integer, code character varying(8) COLLATE pg_catalog.\"default\", teacher_id integer, category character varying(25) COLLATE pg_catalog.\"default\", CONSTRAINT course_pkey PRIMARY KEY (id), CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.\"user\" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE ) TABLESPACE pg_default; ALTER TABLE IF EXISTS public.course OWNER to postgres;")

    await pool.query('DROP TABLE user_course')
    await pool.query("CREATE TABLE IF NOT EXISTS public.user_course ( id integer NOT NULL DEFAULT nextval('user_course_id_seq'::regclass), course_id integer, user_id integer, CONSTRAINT user_course_pkey PRIMARY KEY (id), CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES public.course (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.\"user\" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE ) TABLESPACE pg_default; ALTER TABLE IF EXISTS public.user_course OWNER to postgres;")

    await pool.query('DROP TABLE assignemnt')
    await pool.query("CREATE TABLE IF NOT EXISTS public.assignment ( id integer NOT NULL DEFAULT nextval('assignment_id_seq'::regclass), title character varying(50) COLLATE pg_catalog.\"default\", description character varying(255) COLLATE pg_catalog.\"default\", file_url character varying(255) COLLATE pg_catalog.\"default\", course_id integer, CONSTRAINT assignment_pkey PRIMARY KEY (id), CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES public.course (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE ) TABLESPACE pg_default; ALTER TABLE IF EXISTS public.assignment OWNER to postgres;")

}

export default initTable;