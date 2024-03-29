import multer from "multer";
import path from "path";
import AtividadeController from "./routes/AtividadeController";

export const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.resolve("image_uploads"));
	},
	filename: (req, file, callback) => {
		const time = new Date().getTime();

		callback(null, `${time}_${file.originalname}`);
		AtividadeController.postImageAtt(req.params.id, `${time}_${file.originalname}`);
	}
})