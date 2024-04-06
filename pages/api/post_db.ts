import mysql from "mysql2/promise";
import dotenv from "dotenv";
import axios from "axios";
import { Bookmaker } from '../../types/Odds';

dotenv.config();

export default async function handler(req, res) {
    let connection;
    const url = process.env.URL;


    const gamePredictions = [
        {"away_team":"Cleveland Cavaliers","home_team":"Denver Nuggets","id":"0","ml_conf":"64.8%","ml_pred":"Denver Nuggets","ou_conf":"53.3%","ou_pred":"UNDER 215.5"},{"away_team":"Los Angeles Lakers","home_team":"Brooklyn Nets","id":"1","ml_conf":"60.3%","ml_pred":"Los Angeles Lakers","ou_conf":"54.9%","ou_pred":"OVER 226.5"},{"away_team":"LA Clippers","home_team":"Charlotte Hornets","id":"2","ml_conf":"72.2%","ml_pred":"LA Clippers","ou_conf":"59.1%","ou_pred":"UNDER 214.5"},{"away_team":"Philadelphia 76ers","home_team":"Toronto Raptors","id":"3","ml_conf":"61.5%","ml_pred":"Philadelphia 76ers","ou_conf":"57.4%","ou_pred":"OVER 218.5"},{"away_team":"Miami Heat","home_team":"Washington Wizards","id":"4","ml_conf":"73.0%","ml_pred":"Miami Heat","ou_conf":"56.4%","ou_pred":"OVER 217.5"},{"away_team":"Oklahoma City Thunder","home_team":"New York Knicks","id":"5","ml_conf":"50.9%","ml_pred":"Oklahoma City Thunder","ou_conf":"55.7%","ou_pred":"UNDER 215"},{"away_team":"Dallas Mavericks","home_team":"Houston Rockets","id":"6","ml_conf":"50.1%","ml_pred":"Dallas Mavericks","ou_conf":"64.6%","ou_pred":"OVER 230.5"},{"away_team":"Chicago Bulls","home_team":"Minnesota Timberwolves","id":"7","ml_conf":"73.8%","ml_pred":"Minnesota Timberwolves","ou_conf":"59.6%","ou_pred":"OVER 214"},{"away_team":"Golden State Warriors","home_team":"San Antonio Spurs","id":"8","ml_conf":"60.0%","ml_pred":"Golden State Warriors","ou_conf":"54.6%","ou_pred":"OVER 227"},{"away_team":"Utah Jazz","home_team":"Sacramento Kings","id":"9","ml_conf":"69.2%","ml_pred":"Sacramento Kings","ou_conf":"54.8%","ou_pred":"OVER 222"}
    ];
    try {
        const responseGames = await axios.get(`${url}today_games`, {
            params: {
              api_key: process.env.API_KEY, // Include the API key as a query parameter
            },
        });
        const gamesFromApi = responseGames.data[0]; // Access the inner array
        console.log("RESPONSE Games:", gamesFromApi);
 
        const responseOdds = await axios.get(`${url}odds`, {
            params: {
              apiKey: process.env.ODDS_API_KEY, // Include the API key as a query parameter
            },
        });
        const oddsFromApi = Array.isArray(responseOdds.data) ? responseOdds.data : [];
        console.log("RESPONSE Odds:", oddsFromApi);



        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: parseInt(process.env.DB_PORT), // Convert port to a number
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Insert games and predictions
        for (const game of gamesFromApi) {
            
            // Convert schedule to Chicago time in MySQL timestamp format
            const mysqlTimestamp = new Date(game.schedule).toISOString().slice(0, 19).replace('T', ' ');


            // Insert into Games table
            const gameQuery = `
                INSERT INTO Games (id, home_team, away_team, schedule)
                VALUES (?, ?, ?, ?)
            `;
            await connection.execute(gameQuery, [game.id, game.homeTeam, game.awayTeam, mysqlTimestamp]);

            // // Find matching predictions
            // const matchingPrediction = gamePredictions.find(p => 
            //     p.home_team === game.homeTeam && p.away_team === game.awayTeam);

            // if (matchingPrediction) {
            //     // Remove percent symbol from ml_conf and ou_conf
            //     const mlConf = parseFloat(matchingPrediction.ml_conf.replace('%', '')) / 100;
            //     const ouConf = parseFloat(matchingPrediction.ou_conf.replace('%', '')) / 100;

            //     // Insert into Predictions table
            //     const predictionsQuery = `
            //         INSERT INTO Predictions (id, ml_pred, ml_conf, ou_pred, ou_conf)
            //         VALUES (?, ?, ?, ?, ?)
            //     `;
            //     await connection.execute(predictionsQuery, [game.id, matchingPrediction.ml_pred, mlConf, matchingPrediction.ou_pred, ouConf]);
            // }
            //     const matchingOdds = oddsFromApi.find(o =>
            //         o.home_team === game.homeTeam && o.away_team === game.awayTeam);
            //         if (matchingOdds) {
            //             try {
            //                 const awaySpreadPoint = matchingOdds.bookmakers[0].markets[1].outcomes[0].point
            //                 const awaySpreadPrice= matchingOdds.bookmakers[0].markets[1].outcomes[0].price
            //                 const awayTotalsName= matchingOdds.bookmakers[0].markets[2].outcomes[0].name
            //                 const awayTotalsPoint= matchingOdds.bookmakers[0].markets[2].outcomes[0].point
            //                 const awayTotalsPrice= matchingOdds.bookmakers[0].markets[2].outcomes[0].price
            //                 const awayH2hPrice= matchingOdds.bookmakers[0].markets[0].outcomes[0].price
            //                 const homeSpreadPoint = matchingOdds.bookmakers[0].markets[1].outcomes[1].point
            //                 const homeSpreadPrice= matchingOdds.bookmakers[0].markets[1].outcomes[1].price
            //                 const homeTotalsName= matchingOdds.bookmakers[0].markets[2].outcomes[1].name
            //                 const homeTotalsPoint= matchingOdds.bookmakers[0].markets[2].outcomes[1].point
            //                 const homeTotalsPrice= matchingOdds.bookmakers[0].markets[2].outcomes[1].price
            //                 const homeH2hPrice= matchingOdds.bookmakers[0].markets[0].outcomes[1].price
            //                 const oddsQuery = `
            //                 INSERT INTO Odds (id, provider, away_spread_point, away_spread_price, away_totals_name, away_totals_point, away_totals_price, away_h2h_price, home_spread_point, home_spread_price, home_totals_name, home_totals_point, home_totals_price, home_h2h_price)
            //                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            //                 `;
            //                 await connection.execute(oddsQuery, [game.id, matchingOdds.bookmakers[0].key,awaySpreadPoint,awaySpreadPrice,awayTotalsName,awayTotalsPoint, awayTotalsPrice, awayH2hPrice, homeSpreadPoint, homeSpreadPrice, homeTotalsName, homeTotalsPoint, homeTotalsPrice, homeH2hPrice]);
            //             } catch (error) {
            //                 console.error("Error inserting odds data:", error.message);
            //                 // Handle the error, e.g., log it or send an error response
            //             }
            // }
        }
        res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
