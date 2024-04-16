require("dotenv").config({ path: "./.env" });

const { PORT } = require("./config");
const app = require("./index");

app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));
