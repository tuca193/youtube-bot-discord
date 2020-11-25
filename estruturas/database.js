const firebase = require('firebase')

class databaseInit {
    constructor(firebaseConfig) {
        this.init = function init() {
            firebase.default.initializeApp(firebaseConfig)
            console.log(`Database online.`)
        }
    }
}

module.exports = databaseInit