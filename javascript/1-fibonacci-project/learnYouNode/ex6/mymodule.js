

const fs = require('fs');

module.exports = (dirName, fExtension, callback) => {

    const filterList = []

    fs.readdir(dirName, (err, data) => {
        if (err) return callback(err);

        for (file in data) {
            if (data[file].includes('.' + fExtension)) {
                filterList.push(data[file])
            }
        }


        return callback(null, filterList)
    })


}
