const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handle the default root request
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

//handle the Create operation
app.get('/create', (req, res) => {
    entry = req.query;
    console.log(entry);
    title = entry.title;
    slug = entry.slug;
    content = entry.content;
    published = parseInt(entry.published);
    var dateTime = new Date();
    timestamp = dateTime;
    Create(title, slug, content, published, timestamp)
        .finally(async() => {
                await ReadAll()
                    .then(entry => {
                        console.log(entry);
                        res.send(entry);
                    })
            }

        )
})

//handle the delete operation by identifer slug
app.get('/delete', (req, res) => {
    entry = req.query;
    console.log(entry);
    slug = entry.slug;
    Delete(slug)
        .finally(async() => {
            await ReadAll()
                .then(entry => {
                    console.log(entry);
                    res.send(entry);
                })
        })

})

//handle the update operation by identifer slug
app.get('/update', (req, res) => {
    entry = req.query;
    console.log(entry);
    slug = entry.slug;
    content = entry.content;
    published = parseInt(entry.published);
    var dateTime = new Date();
    timestamp = dateTime;
    Update(slug, content, published, timestamp)
        .finally(async() => {
            await ReadAll()
                .then(entry => {
                    console.log(entry);
                    res.send(entry);
                })
        })

})

//listen to the localhost port 3000
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

//function of display all rows in entry table in json format
async function ReadAll() {
    const allEntry = await prisma.entry.findMany()
    return allEntry
}

//function to add one new row in entry table
async function Create(title, slug, content, published, timestamp) {
    if (exists(title)) {
        console.log('the title already exists, need a new title');
    } else {
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
}

//funtion of update one row identified by the slug in entry table
async function Update(slug, content, published, timestamp) {
    if (exists(slug)) {
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
    } else {
        console.log("entry does not exists")
    }
}


//function of delete one row identified by the slug in entry table
async function Delete(slug) {
    if (exists(slug)) {
        await prisma.entry.delete({
            where: {
                slug: slug,
            },
        })
    } else {
        console.log("the title to delete doesn't exist")
    }
}


//function of show if one row already exist with the same slug
async function exists(slug) {
    var exist = await prisma.entry.findUnique({
        where: {
            slug: slug,
        },
        select: {
            slug: true,
        },
    })
    if (exist == null) {
        return false;
    } else {
        return true;
    }
}

// async function main() {
//     exists('iaesgef')
//         .then(o => {
//             console.log(o)
//         })
// }

// main()
//     .catch((e) => {
//         throw e
//     })
//     .finally(async() => {
//         await prisma.$disconnect()
//     })