import multer, { diskStorage, memoryStorage } from "multer";
import { InternalError } from "../core/ApiError";

export const storage = diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "evidence":
        cb(null, "public/evidence");
        break;
      case "reward":
        cb(null, "public/reward");
        break;
      case "trx":
        cb(null, "public/trx");
        break;
      default:
        cb(new InternalError("Invalid fieldname"), "");
    }
  },

  filename: (req, file, cb) => {
    switch (file.fieldname) {
      case "evidence":
        cb(null, "EV".concat(Date.now().toString().concat(`.png`)));
        break;
      case "reward":
        cb(null, "RW".concat(Date.now().toString().concat(`.png`)));
        break;
      case "trx":
        cb(null, "TRXE".concat(Date.now().toString().concat(`.png`)));
        break;
      default:
        cb(new InternalError("Invalid fieldname"), "");
        break;
    }
  },
});

const upload = multer({ storage });

export default upload;
