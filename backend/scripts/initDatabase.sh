#!/bin/bash
echo "Script start"
pg_dump $PGDATABASE > $PGDUMPPATH 
dropdb $PGDATABASE
createdb $PGDATABASE
psql -f $PGSCHEMAPATH $PGDATABASE
echo "Script end"