const axios = require('axios')

module.exports = {

    getCars: function( url ) {
        return axios.get( url ).then( res => {
            return res.data
        })
    },

    getRandomNumber: function() {
        return Math.floor(Math.random() * 10 ) + 1
    }, 

    getfilterCarsById: function( num, cars ) {
        return cars.filter( car => {
            return car.id === +num
        })
}
}