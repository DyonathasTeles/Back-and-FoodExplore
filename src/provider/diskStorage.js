const path = require("path")
const uploadsConfigs = require("../configs/upload")
const fs = require("fs")

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadsConfigs.TPM_FOLDER, file),
      path.resolve(uploadsConfigs.UPLOADS_FOLDER, file)
    )

    return file
    console.log(file);
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadsConfigs.UPLOADS_FOLDER, file)

    try{
      await fs.promises.stat(filePath)
    } catch {
      return false
    }

    return await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage