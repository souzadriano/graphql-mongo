import Author from '../models/author.model';
import Book from '../models/book.model';

export default {
	Query: {
		authors: async (_, args, { user }) => {
			console.log(user);
			const authors = await Author('tenant1').find({});
			return authors;
		},
		books: async () => {
			const books = await Book('tenant1').find({});
			return books;
		},
	},
	Author: {
		books: async (author) => {
			const books = await Book('tenant1').find({ authorId: author.id });
			return books;
		},
	},
	Mutation: {
		createAuthor: async (parent, { name }) => {
			try {
				const author = await Author('tenant1').create({ name });
				return author;
			} catch (e) {
				throw new Error('Cannot Save Author!!!');
			}
		},
		updateAuthor: async (parent, { id, name }) => {
			try {
				await Author('tenant1').updateOne({ id, name });
				const author = Author('tenant1').findOne({ _id: id });
				return author;
			} catch (e) {
				throw new Error('Cannot Save Author!!!');
			}
		},
	},
};
