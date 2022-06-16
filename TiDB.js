const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
    ReadAll()
        .then(entry => {
            console.log(entry);
            res.send(entry);
        })
});

app.get('/entry', (req, res) => {
    ReadAll()
        .then(entry => {
            console.log(entry);
            res.send(entry);
        })
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

async function ReadAll() {
    const allEntry = await prisma.entry.findMany()

    // console.log(allEntry)
    return allEntry
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
    ReadAll()

}

// main()
//     .catch((e) => {
//         throw e
//     })
//     .finally(async() => {
//         await prisma.$disconnect()
//     })