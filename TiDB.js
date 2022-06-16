const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function ReadAll() {

    // ... you will write your Prisma Client queries here
    const allEntry = await prisma.entry.findMany()

    console.log(allEntry)
}

async function Create(title, slug, content, published, timestamp) {

    const maxIdList = await prisma.$queryRaw `SELECT max(id) FROM entry`;
    const maxId = maxIdList[0]
    const nextId = maxId["max(id)"] + 1
    await prisma.entry.create({
        data: {
            id: nextId,
            title: title,
            slug: slug,
            content: content,
            published: published,
            timestamp: timestamp,
        },
    })

}

async function Update(slug, content, published, timestamp) {
    await prisma.entry.update({
        where: {
            slug: slug,
        },
        data: {
            content: content,
            published: published,
            timestamp: timestamp,
        },
    })
}

async function Delete(slug) {
    await prisma.entry.delete({
        where: {
            slug: slug,
        },
    })
}

async function main() {
    await Update('aaaaaaa', 'asdfa', 1, new Date("2022-06-15T15:05:54.000Z"))
    ReadAll()

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async() => {
        await prisma.$disconnect()
    })