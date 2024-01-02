import { Pool } from 'pg';
function createpool() {
    const pool = new Pool({
        host: process.env.PGHOST,
        port: 5432,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE
    });
    return pool
}
let pool: Pool | undefined = createpool();
async function closePool() {
    if (pool) {
        await pool.end();
        pool = undefined;
    }
}
function getPool(): Pool {
    if (!pool) {
        pool = createpool();
    }
    return pool;
}
// The interface is for doing query to database
async function queryPool(query: string, values: (string|number)[]) {
    if (!pool) {
        pool = createpool();
    }
    return await pool.query(query, values);
}
export default {queryPool, closePool};