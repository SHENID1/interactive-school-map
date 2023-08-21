import * as uuid from 'uuid';
import * as path from "path";
import * as fs from "fs";

class fileService{
    async saveFile(file){
        try{
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve("static", fileName)
            await file.mv(filePath)
            return fileName;
        }
        catch (e) {
            console.error(e)
        }
    }
    async updateFile(file, fileName) {
        try {
            const filePath = path.resolve("static", fileName)
            fs.rmSync(filePath);
            await file.mv(filePath)
        }
        catch (e) {
            console.error(e)
        }
    }
    async deleteFile(fileName) {
        try {
            const filePath = path.resolve("static", fileName)
            fs.rmSync(filePath);
        }
       catch (e) {
           console.error(e)
       }
    }
}

export default new fileService();