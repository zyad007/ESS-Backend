import pool from "./postgres"


export default async () => {

    await pool.query('INSERT INTO "user" (id,email,password,name) VALUES ($1,$2,$3,$4)',
    );

}