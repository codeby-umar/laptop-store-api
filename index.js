const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Book = mongoose.model("Book", bookSchema);

async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("MongoDB ma'lumotlar ombori ishlamoqda...");

        await createBook();
        await getBooks()
    } catch (err) {
        console.error("MongoDB ulanishda xatolik mavjud...", err);
    }
}

async function createBook() {
    const book = new Book({
        name: "Javascript va node js asoslari",
        author: "Turg'unboyov Muhammad Umar",
        tags: ["laravel", "js", "javascript", "dasturlash"],
        isPublished: true
    });

    const savedBook = await book.save();
    console.log(savedBook);
}

async function getBooks(){
    const books = await Book.find({
        name : "Javascript va node js asoslari"
    }).limit(10) // limit berib qoyish objectdan hozir 1 element olmoqda
    .find({author : /^T/}) // mualifni ismi f boshlansa author ni olib beradi hammsaini
    .select({name : 1 , tags: 1})  // tanlab olsih objectni tanlab olish
    .or([{name : 'Javascript va node js asoslari'} , {isPublished : true}])
    // .countDocuments(); malunotlarni sanab beradi
    console.log( "men manaman" ,  books);
}



start();