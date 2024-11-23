const mongoose = require("mongoose");
// const { MONGO_URI } = process.env;
// const { MONGO_URI_LOCALHOST } = process.env;

exports.connect = () => {
	mongoose
		.connect("mongodb+srv://bissamintyene:SzUOei0OcspxzVwR@cluster0.twbur.mongodb.net/dsp4-cdp-s23-g4", {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
		})
		.then(() => {
			console.log("Successfully connected to database");
		})
		.catch((error) => {
			console.log("Database connection failed");
			console.log(error);
			process.exit(1);
		});
};
