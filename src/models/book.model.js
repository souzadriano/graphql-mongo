import { Schema } from 'mongoose';
import getDB from './db.config';

const BookSchema = new Schema({
	title: { type: String, required: true, unique: true },
	desc: { type: String },
	year: { type: Number, required: true },
	author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
	createdOn: { type: Date, default: Date.now },
});

const Book = (tenant) => getDB(tenant).model('Book', BookSchema);

module.exports = Book;
