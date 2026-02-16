import express from "express";
import db from "../db.js";
const router = express.Router();

// /books → daftar buku
router.get("/", async (req, res) => {
  try{
    if(req.query.sort === "desc"){
    const result = await db.query("SELECT * FROM books ORDER BY rating DESC");
    res.status(200).render("pages/books", {books: result.rows});
  }else{
    const result = await db.query("SELECT * FROM books ORDER BY rating ASC");
    res.status(200).render("pages/books", {books: result.rows});
    }
  }catch(err){
    console.error("Error fetching books:", err);
    res.status(500).json({status: "Internal server error"});
  }
});


router.get("/new", (req, res) => {
    res.render("pages/new-book");
});

router.post("/new", async (req, res) => {
    const {title, author, rating, notes, read_date, cover_url} = req.body;
    try{
        const result = await db.query(
            "INSERT INTO books (title, author, rating, notes, read_date, cover_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, author, rating, notes, read_date, cover_url]
        );
        res.status(201).json({status: "success", book: result.rows[0]});

    }catch (err){
        console.error("Error adding book:", err);
        res.status(500).json({status: "Internal server error"});
    }
});


router.get("/edit/:id", async (req,res) => {
  try{
    const id = req.params.id;
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    res.status(200).render("pages/edit-book", {book: result.rows[0]});
  }catch (err){
    console.error("Error fetching book:", err);
    res.status(500).json({status: "Internal server error"});
  }
})
router.put('/edit/:id', async(req,res) => {
  try{
    const body = req.body;
    const id = req.params.id;
    const result = await db.query("UPDATE books SET title = $1, author = $2, rating = $3, notes = $4, read_date = $5, cover_url = $6 WHERE id = $7 RETURNING *",
    [body.title, body.author, body.rating, body.notes, body.read_date, body.cover_url, id]);
    res.status(200).json({status: "success", book: result.rows[0]});
  }catch(err){
    console.error("Error updating book:", err);
    res.status(500).json({status: "Internal server error"});
    
  }
})


export default router;
