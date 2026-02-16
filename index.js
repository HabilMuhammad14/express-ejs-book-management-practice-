import express from 'express';  
import cors from 'cors';
import db from './db.js';
import booksRouter from './routes/books.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
    res.render('pages/home.ejs');
});
app.use("/books", booksRouter)

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})