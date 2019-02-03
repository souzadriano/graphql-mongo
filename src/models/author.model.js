import { Schema } from 'mongoose';
import getDB from './db.config';

const AuthorSchema = new Schema({
	name: { type: String, required: true },
});

const Author = (tenant) => getDB(tenant).model('Author', AuthorSchema);

module.exports = Author;
