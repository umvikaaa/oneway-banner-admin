import express from "express";
import uploadHandler from "./api/upload.js";

const app = express();
const port = 3001;

app.use(express.json());

app.post("/api/upload", uploadHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
