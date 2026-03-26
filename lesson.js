const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
app.use(express.json())


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zumar Lesson",
      version: "1.0.0",
      description: "Zumar o'quv markazi uchun mojalangan maxsus api"
    },
    servers: [
      {
        url: "http://localhost:8000"
      }
    ]
  },
  apis: ["./lesson.js"]
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const lesson = [
     {
        "id" : 1,
        "name" : "Data sayns va Sunʼiy intellekt",
        "description" : "Bu basic python organadiganlar uchun juda qulay online darslik hisoblanadi.",
        "author" : "Jaloliddin G'anijonov",
        "author_Img" : "https://assets.mohirdev.uz/testimonials/653b6d4bcd59348a62b03ed5/fe53c1e0-eb66-4b55-bcfa-b8e03bcb184c.original.webp",
        "narxi" : 2000,
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGvG4WYec-t-6imGDy-IotFH1pKBcQfHKpg&s"
     },
      {
        "id" : 2,
        "name" : "Kiberxavfsizlik: Pentesting kursi o'quvchisi",
        "description" : "Bu basic python organadiganlar uchun juda qulay online darslik hisoblanadi.",
        "author" : "Izzat Abduqodirov",
        "author_Img" : "https://assets.mohirdev.uz/testimonials/653b6c1dcd59348a62afd0a2/31b4233d-3d7c-4667-b6c2-42314cf1805e.original.webp",
        "narxi" : 1000,
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGvG4WYec-t-6imGDy-IotFH1pKBcQfHKpg&s"
     },
      {
        "id" : 3,
        "name" : "Data Science va Sun'iy intellekt kursi bitiruvchisi",
        "description" : "Bu basic python organadiganlar uchun juda qulay online darslik hisoblanadi.",
        "author" : "Mavludaxon Nugmanova",
        "author_Img" : "https://assets.mohirdev.uz/testimonials/653658dbcd59348a626c8d5e/c421e7cd-14e8-45d8-a231-a703554e9597.original.webp",
        "narxi" : 2000,
        "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGvG4WYec-t-6imGDy-IotFH1pKBcQfHKpg&s"
     },
]

/**
 * @openapi
 * /:
 *   get:
 *     summary: Home route
 *     description: Server ishlayotganini tekshiradi
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/' , (req ,res)=>{
    res.redirect('/docs')
});

/**
 * @openapi
 * /lesson:
 *   get:
 *     summary: Barcha darslarni olib va uni korish
 *     responses:
 *       200:
 *         description: Darslar ro'yxati
 */
app.get('/lesson' , (req , res)=>{
     res.json(lesson)
})
/**
 * @openapi
 * /lesson/{id}:
 *   get:
 *     summary: Bitta darsni ID orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dars IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bitta dars ma'lumoti
 */
app.get('/lesson/:id' , (req , res)=>{
    const id = parseInt(req.params.id);
    const get_Lesson = lesson.find(i => i.id === id)
     if(get_Lesson == false){
        res.status(404).send("Sizning darsliginiz bu id yoq qayta uruning ...")
     }
    res.json(get_Lesson)
})
/**
 * @openapi
 * /lesson:
 *   post:
 *     summary: Yangi dars qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               author_Img:
 *                 type: string
 *               narxi:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yangi dars muvaffaqiyatli qo'shildi
 *       400:
 *         description: Name yoki description kiritilmagan
 */
app.post('/lesson', (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send("Name yoki description yozing..");
    }
    const izla = {
        id: lesson.length + 1 ,   //Date.now() - ozi api id beradi
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        author_Img: req.body.author_Img,
        narxi: req.body.narxi,
        image: req.body.image
    };

    lesson.push(izla);
    res.status(201).send(izla);
});

/**
 * @openapi
 * /lesson/{id}:
 *   put:
 *     summary: Darsni ID orqali yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan dars idsi orqali
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               author_Img:
 *                 type: string
 *               narxi:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dars muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri ma'lumot yuborildi
 *       404:
 *         description: Dars topilmadi
 */
app.put('/lesson/:id' , (req , res)=>{
    const id = parseInt(req.params.id);
    const put = lesson.find(search => search.id === id);
    
    if(!put){
        res.status(404).send("Sizda buday id malumot yoq ..")
    }

    put.name = req.body.name,
    put.description = req.body.description,
    put.author = req.body.author,
    put.author_Img = req.body.author_Img,
    put.narxi = req.body.narxi,
    put.image = req.body.image

    res.json(put)
});

/**
 * @swagger
 * /lesson/{id}:
 *   delete:
 *     summary: Darslarni id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: darsni o'chirildi
 *       404:
 *         description: darsni topilmadi
 */
app.delete('/lesson/:id' , (req , res)=>{
   const id = parseInt(req.params.id);
   const deletes = lesson.find(resorcher => resorcher.id === id);
    if(!deletes){
        res.status(404).send("Sizda buday id dagi element mavjud emas ..")
    }
    const lessons = lesson.indexOf(deletes);
    lesson.splice(lessons , 1);

    res.send(lesson)
});

const port = process.env.PORT || 8000;
app.listen(port , ()=>{
    console.log(`Sizning websitingiz : ${port} da ochib bermoqda ....`)
});