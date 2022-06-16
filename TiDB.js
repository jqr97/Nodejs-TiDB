const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function main() {

    // ... you will write your Prisma Client queries here
    const allEntry = await prisma.entry.findMany()

    console.log(allEntry)
}


main()
    .catch((e) => {
        throw e
    })
    .finally(async() => {
        await prisma.$disconnect()
    })