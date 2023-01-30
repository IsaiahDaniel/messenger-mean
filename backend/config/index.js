const { connect } = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log("MongoDB running");
    } catch (err) {
        console.log("err", err);
        process.exit(1);
    }
}

module.exports = connectDB;