const Yup = require('yup');
const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Laptop API",
            version: "1.0.0",
            description: "Laptop CRUD API"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: ["./app.js"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const laptop = [
    {
        id: 1,
        name: 'Macbook air',
        xotira: '1T',
        narxi: 6000,
        img: 'https://cdn.asaxiy.uz/asaxiy-content/product/items/desktop/8d76d19c430550d0bcc345ca69fc77da2025010917472633314FkuoEwKLqS.png.webp'
    },
    {
        id: 2,
        name: 'Macbook air',
        xotira: '1T',
        narxi: 6000,
        img: 'https://cdn.asaxiy.uz/asaxiy-content/product/items/desktop/8d76d19c430550d0bcc345ca69fc77da2025010917472633314FkuoEwKLqS.png.webp'
    },
    {
        id: 3,
        name: 'Macbook air',
        xotira: '1T',
        narxi: 6000,
        img: 'https://cdn.asaxiy.uz/asaxiy-content/product/items/desktop/8d76d19c430550d0bcc345ca69fc77da2025010917472633314FkuoEwKLqS.png.webp'
    },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Laptop:
 *       type: object
 *       required:
 *         - name
 *         - xotira
 *         - narxi
 *         - img
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Macbook air
 *         xotira:
 *           type: string
 *           example: 1T
 *         narxi:
 *           type: number
 *           example: 6000
 *         img:
 *           type: string
 *           example: https://example.com/image.png
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Bosh sahifa
 *     responses:
 *       200:
 *         description: Welcome message
 */
app.get('/', (req, res) => {
    res.send("Salom Sen o'zingga xush kelding ....")
});

/**
 * @swagger
 * /laptop:
 *   get:
 *     summary: Barcha laptoplarni olish
 *     responses:
 *       200:
 *         description: Laptoplar ro'yxati
 */
app.get('/laptop', (req, res) => {
    res.json(laptop)
});

/**
 * @swagger
 * /laptop/{id}:
 *   get:
 *     summary: Bitta laptopni id orqali olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bitta laptop
 *       404:
 *         description: Laptop topilmadi
 */
app.get('/laptop/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const get_Laptop = laptop.find(izla => izla.id === id);

    if (!get_Laptop) {
        return res.status(404).json({ message: 'Sizda id olinshda xatolik bor' });
    }

    res.json(get_Laptop);
});

/**
 * @swagger
 * /laptop:
 *   post:
 *     summary: Yangi laptop qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laptop'
 *     responses:
 *       201:
 *         description: Laptop qo'shildi
 *       400:
 *         description: Validation error
 */
app.post('/laptop', async (req, res) => {
    const validdationschexems = Yup.object({
        name: Yup.string().required().min(3),
        xotira: Yup.string().required(),
        narxi: Yup.number().required().min(100),
        img: Yup.string().required().min(20)
    });

    try {
        await validdationschexems.validate(req.body);
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const laptops = {
        id: laptop.length + 1,
        name: req.body.name,
        xotira: req.body.xotira,
        narxi: req.body.narxi,
        img: req.body.img
    };

    laptop.push(laptops);
    res.status(201).send(laptops);
});

/**
 * @swagger
 * /laptop/{id}:
 *   put:
 *     summary: Laptopni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laptop'
 *     responses:
 *       200:
 *         description: Laptop yangilandi
 *       404:
 *         description: Laptop topilmadi
 */
app.put('/laptop/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const topildi = laptop.find(l => l.id === id);

    if (!topildi) {
        return res.status(404).send("Laptop topilmadi");
    }

    topildi.name = req.body.name;
    topildi.xotira = req.body.xotira;
    topildi.narxi = req.body.narxi;
    topildi.img = req.body.img;

    res.send(topildi);
});

/**
 * @swagger
 * /laptop/{id}:
 *   delete:
 *     summary: Laptopni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Laptop o'chirildi
 *       404:
 *         description: Laptop topilmadi
 */
app.delete('/laptop/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const izla = laptop.find(ls => ls.id === id);

    if (!izla) {
        return res.status(404).send("Sizda id olishda xatolik mavjud ..");
    }

    const bookindex = laptop.indexOf(izla);
    laptop.splice(bookindex, 1);

    res.send(laptop);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Salom men ${port} ishlashni boshladim ...`)
});