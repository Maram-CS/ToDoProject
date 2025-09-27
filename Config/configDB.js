import { connect } from "mongoose";

const ConfigDb = async (dataBase) => {
    try {
        await connect(`mongodb://localhost:27017/${dataBase}`);
        console.log(`database is connecting as ${dataBase}`);
    }catch(err) {
        console.error(err);
    }
}

export default ConfigDb;