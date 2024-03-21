import express, { type Request, type Response } from "express";
import Book, { type IBook } from "../models/Book";
import Author, { type IAuthor } from "../models/Author";

const booksRouter = express.Router();

// Route to get a book by ID and populate its author
booksRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id).populate("author");
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

booksRouter.post("/add-book", async (req: Request, res: Response) => {
    try {
        const { title, authorId } = req.body;

        // Check if authorId exists
        const authorExists = await Author.findById(authorId);
        if (!authorExists) {
            return res.status(400).json({ message: "Author does not exist" });
        }

        // Create the book
        const book: IBook = new Book({ title, author: authorId });
        await book.save();

        // Add the book id to the author's books array
        authorExists.books.push(book._id);
        await authorExists.save();

        res.status(201).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

booksRouter.post("/add-author", async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const author: IAuthor = new Author({ name });
        await author.save();
        res.status(201).json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default booksRouter;
