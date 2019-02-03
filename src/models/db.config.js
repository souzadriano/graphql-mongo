import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const dbs = {};

const rootDB = mongoose.createConnection('mongodb://rails:rails@localhost/admin', {
	poolSize: 10,
	useNewUrlParser: true,
});

const getDB = (tenant) => {
	if (!tenant) {
		throw new Error('Tenant required.');
	}
	let db = dbs[tenant];
	if (!db) {
		db = rootDB.useDb(tenant);
		dbs[tenant] = db;
	}
	return db;
};

export { getDB as default };
