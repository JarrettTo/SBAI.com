import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GameDisplay from '../components/GameDisplay'
import { INBAGame } from '../types/Game';
import { Odds } from '../types/Odds';
import axios from 'axios';
import dotenv from 'dotenv';
import { Predictions } from "../types/Predictions";
import styles from './index.module.css'

dotenv.config();


const HomePage = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedGame, setSelectedGame] = useState<INBAGame | null>(null);
    const [gameSchedules, setGameSchedules] = useState<INBAGame[]>([]);
    const [gameOdds, setGameOdds] = useState<Odds[]>([]);
    const [gamePreds, setGamePreds] = useState<Predictions[]>([]);
    const fetchGameSchedules = async () => {
        try {
            const response = await axios.get('/api/nba_games',{
            params: {
                api_key: process.env.ODDS_API_KEY, /// Access API key from environment variables
                },
            });
            setGameSchedules(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching game schedules:', error);
        }
    };
        
    const fetchGameOdds = async () => {
        try {
            const response = await axios.get('/api/odds',{
                params: {
                    apiKey: process.env.ODDS_API_KEY, // Include the API key as a query parameter
                    },
                });
            setGameOdds(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching game odds:', error);
        }
    };
    const fetchGamePredictions = async () => {
        const prediction1 : Predictions = {"away_team":"Golden State Warriors","home_team":"Washington Wizards","id":"0","ml_conf":"73.4%","ml_pred":"Golden State Warriors","ou_conf":"61.9%","ou_pred":"OVER 243"}

        const prediction2 : Predictions = {"away_team":"Brooklyn Nets","home_team":"Orlando Magic","id":"1","ml_conf":"72.4%","ml_pred":"Orlando Magic","ou_conf":"56.7%","ou_pred":"UNDER 215"}
        const prediction3 : Predictions = {
            "away_team": "Brooklyn Nets",
            "home_team": "Memphis Grizzlies",
            "id": "2",
            "ml_conf": "57.2%",
            "ml_pred": "Brooklyn Nets",
            "ou_conf": "67.8%",
            "ou_pred": "UNDER 214.5"
        }
        const prediction4 : Predictions = {
            "away_team": "Miami Heat",
            "home_team": "Sacramento Kings",
            "id": "3",
            "ml_conf": "52.5%",
            "ml_pred": "Sacramento Kings",
            "ou_conf": "52.8%",
            "ou_pred": "OVER 226.5"
        }
        const prediction5 : Predictions = {
            "away_team": "Denver Nuggets",
            "home_team": "Golden State Warriors",
            "id": "4",
            "ml_conf": "57.0%",
            "ml_pred": "Golden State Warriors",
            "ou_conf": "55.2%",
            "ou_pred": "UNDER 232"
        }
        const prediction6 : Predictions = {
            "away_team": "Chicago Bulls",
            "home_team": "New Orleans Pelicans",
            "id": "5",
            "ml_conf": "67.7%",
            "ml_pred": "New Orleans Pelicans",
            "ou_conf": "56.3%",
            "ou_pred": "UNDER 222.5"
        }
        const prediction7 : Predictions = {
            "away_team": "Orlando Magic",
            "home_team": "Atlanta Hawks",
            "id": "6",
            "ml_conf": "52.2%",
            "ml_pred": "Orlando Magic",
            "ou_conf": "59.0%",
            "ou_pred": "UNDER 226.5"
        }
        const prediction8 : Predictions = {
            "away_team": "Oklahoma City Thunder",
            "home_team": "Houston Rockets",
            "id": "7",
            "ml_conf": "62.6%",
            "ml_pred": "Oklahoma City Thunder",
            "ou_conf": "63.9%",
            "ou_pred": "UNDER 235.5"
        }
        const prediction9 : Predictions = {
            "away_team": "San Antonio Spurs",
            "home_team": "Utah Jazz",
            "id": "8",
            "ml_conf": "70.0%",
            "ml_pred": "Utah Jazz",
            "ou_conf": "51.6%",
            "ou_pred": "OVER 242"
        }
        const prediction10 : Predictions = {
            "away_team": "Charlotte Hornets",
            "home_team": "Portland Trail Blazers",
            "id": "9",
            "ml_conf": "54.0%",
            "ml_pred": "Charlotte Hornets",
            "ou_conf": "62.3%",
            "ou_pred": "UNDER 219.5"
        }
        const prediction11 : Predictions = {
            "away_team": "Sacramento Kings",
            "home_team": "Los Angeles Clippers",
            "id": "10",
            "ml_conf": "68.7%",
            "ml_pred": "Los Angeles Clippers",
            "ou_conf": "51.7%",
            "ou_pred": "UNDER 239"
        }
        setGamePreds([{"away_team":"Atlanta Hawks","home_team":"Brooklyn Nets","id":"0","ml_conf":"51.3%","ml_pred":"Atlanta Hawks","ou_conf":"71.9%","ou_pred":"OVER 220"},{"away_team":"Utah Jazz","home_team":"Miami Heat","id":"1","ml_conf":"72.3%","ml_pred":"Miami Heat","ou_conf":"62.3%","ou_pred":"OVER 225"},{"away_team":"Portland Trail Blazers","home_team":"Memphis Grizzlies","id":"2","ml_conf":"55.6%","ml_pred":"Memphis Grizzlies","ou_conf":"74.2%","ou_pred":"OVER 209"},{"away_team":"Denver Nuggets","home_team":"Los Angeles Lakers","id":"3","ml_conf":"53.1%","ml_pred":"Los Angeles Lakers","ou_conf":"60.4%","ou_pred":"UNDER 229.5"},{"away_team":"Houston Rockets","home_team":"Phoenix Suns","id":"4","ml_conf":"69.1%","ml_pred":"Phoenix Suns","ou_conf":"60.0%","ou_pred":"OVER 231"}])
    };
    useEffect(() => {
        // Fetch NBA game schedules when the component mounts
        fetchGameSchedules();
        fetchGameOdds();
        fetchGamePredictions();
    }, []);
    const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.classList.contains('select-game-button')) {
            // Handle the "Select an NBA Game" button action
            setAnchorEl(event.currentTarget);
          } else if (event.currentTarget.classList.contains('predict-button')) {
            // Handle the "Predict" button action
            // Add your logic for the "Predict" button action here
            console.log('Predict button clicked');
          }
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleGameSelect = (game: INBAGame) => {
        setSelectedGame(game);
        handleClose();
      };

      const formatTime = (gameDate: Date) => {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(gameDate);
      };
      
    
    return (
        
        <div style={{display : "flex", flexDirection : "column", alignItems:"center", height: "100vh", overflow: 'hidden'}} >
            <div className={styles.header_container} style={{display : "flex", flexDirection : "column",alignItems:"center",justifyContent:"center"}}>
                <p className={styles.header}>Sports Betting AI</p>
                <p className={styles.description}>Select an upcoming NBA game and click the predict button to generate a prediction using our latest AI Model!</p>
                {/*<div>
                    <Button
                        variant="contained"
                        className="select-game-button"
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleClick}
                        style={{
                            fontSize:'20px',
                            width: '50vw',
                            backgroundColor: '#fff', // Set the background color
                            color: '#aaa', // Set the text color to gray
                            borderRadius: '10px', // Rounded corners
                            textTransform: 'none', // Avoid uppercase transformation
                            marginRight:'30px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {selectedGame
                            ? `${selectedGame.homeTeam} vs ${selectedGame.awayTeam} \n${formatTime(selectedGame.schedule)}`
                            : 'Select an NBA Game'}
                    </Button>
                
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                            style: {
                                borderRadius: '10px', // Rounded corners
                                width: '50vw',
                                
                            },
                        }}
                    >
                        {gameSchedules.map((game) => (
                            <MenuItem key={game.id} onClick={() => handleGameSelect(game)} style={{justifyContent:'center'}}>
                                <GameDisplay
                                    id={game.id}
                                    homeTeam={game.homeTeam}
                                    homeTeamLogo={game.homeTeamLogo}
                                    awayTeam={game.awayTeam}
                                    awayTeamLogo={game.awayTeamLogo}
                                    schedule={game.schedule}
                                    isInDropdown={true}
                                    odds={gameOdds.find((odds) => odds.home_team === game.homeTeam)}
                                    predictions={gamePreds.find((odds) => odds.home_team === game.homeTeam)}
                                />
                            </MenuItem>
                        ))}
                    </Menu>
                    <Button
                        variant="contained"
                        className="predict-button"
                        onClick={handleClick}
                        style={{
                            fontSize:'20px',
                            width: '10vw',
                            backgroundColor: '#068FFF', // Set the background color
                            color: '#EEEEEE', // Set the text color to gray
                            borderRadius: '10px', // Rounded corners
                            textTransform: 'none', // Avoid uppercase transformation
                        }}
                    >
                        Predict
                    </Button>
                    </div>*/}
            </div>
            <div className={styles.game_display}>
                {gameSchedules.map((game) => (
                    <GameDisplay 
                        key={game.id} 
                        id={game.id} 
                        homeTeam={game.homeTeam}
                        homeTeamLogo={game.homeTeamLogo}
                        awayTeam={game.awayTeam}
                        awayTeamLogo={game.awayTeamLogo}
                        schedule={game.schedule}
                        odds={gameOdds.find((odds) => odds.home_team === game.homeTeam && odds.away_team === game.awayTeam)}
                        predictions={gamePreds.find((preds) => preds.home_team === game.homeTeam)}
                    />
                ))}
            </div>
        </div>
    )
  };
  
export default HomePage;
