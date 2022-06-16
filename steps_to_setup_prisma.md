1. change the provider = in prisma/schema.prisma file: \n
    provider = "mysql"

2. change the .env file:
    DATABASE_URL="mysql://[username]:[password]@[hostip url]:[port number]/[database name]"

3. Introspect the database
    run the following code in terminal:
        npx prisma db pull
4. Install the Prisma API:
    run the following code in terminal:
        npm install @prisma/client
        npx prisma generate

