/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
    // `dbPool` is accessible within this function scope
    return {
        create: (pokemon, callback) => {
            // set up query
            const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
      VALUES ($1, $2, $3, $4, $5)`;
            const values = [
                pokemon.name,
                pokemon.num,
                pokemon.img,
                pokemon.weight,
                pokemon.height
            ];

            // execute query
            dbPool.query(queryString, values, (err, queryResult) => {
                // invoke callback function with results after query has executed
                callback(err, queryResult);
            });
        },

        get: (id, callback) => {
            const values = [id];

            dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        // SQL logic to update pokemon data of a specific id
        update: (pokemon, callback) => {
            console.log("Inside update pokemon models...");
            const queryString = 'UPDATE pokemons SET name=$1, img=$2, height=$3, weight=$4 WHERE pokemons.id = $5';
            const values = [pokemon.name, pokemon.img, pokemon.height, pokemon.weight, parseInt(pokemon.id)];

            // set up query to update data of a specific pokemon
            console.log("Before updating database...");
            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
            console.log("After updating database...");
        }
    };
};