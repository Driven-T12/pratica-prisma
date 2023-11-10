import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import { prisma } from "../database/index";

export async function getBooks(): Promise<Book[]> {
  // const query = `SELECT * FROM books`;
  const result = await prisma.book.findMany()
  return result;
}

export async function getBook(id: number): Promise<Book> {
  // const query = `SELECT * FROM books WHERE id = $1`;
  const result = await prisma.book.findUnique({ where: { id } })
  return result;
}

export async function createBook(book: CreateBook): Promise<void> {
  // const query = `
  //   INSERT INTO books (title, author, publisher, "purchaseDate")
  //   VALUES ($1, $2, $3, $4)`;

  await prisma.book.create({ data: {...book, purchaseDate: new Date(book.purchaseDate)} })
}

export async function reviewBook(bookReview: CreateReview): Promise<void> {
  const { bookId, grade, review } = bookReview;
  // const query = `
  //   UPDATE books 
  //   SET
  //     grade = $1,
  //     review = $2,
  //     read = true 
  //   WHERE id = $3
  // `;

  await prisma.book.update({
    where: { id: bookId },
    data: { grade, review, read: true }
  })
}