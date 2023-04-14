import * as path from "path";

class fileService{
    saveFile(file, name){
        try{
            const fileName = name + ".jpg";
            const filePath = path.resolve("static", fileName)
            file.mv(filePath)
            return fileName;
        }
        catch (e) {

        }
    }
}

export default new fileService();