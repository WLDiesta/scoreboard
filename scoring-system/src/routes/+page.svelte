<script lang="ts">
    import axios from 'axios';

    let scoreA = 0;
    let scoreB = 0;
    let round = 1;
    let playerAName = ''; 
    let playerBName = ''; 
    let savedScore: { scoreA: number, scoreB: number, round: number, playerAName: string, playerBName: string } | null = null;

    async function fetchScore() {
        if (typeof window !== 'undefined') {
            try {
                const response = await axios.get(`${window.location.origin}/api/score`);
                ({ scoreA, scoreB, round, playerAName, playerBName } = response.data);
            } catch (error) {
                console.error('Error fetching score:', error);
            }
        }
    }

    async function updateScore() {
        if (typeof window !== 'undefined') {
            try {
                await axios.post(`${window.location.origin}/api/score`, { scoreA, scoreB, round, playerAName, playerBName });
            } catch (error) {
                console.error('Error updating score:', error);
            }
        }
    }

    function resetScores() {
        scoreA = 0;
        scoreB = 0;
        round = 1;
        playerAName = '';
        playerBName = '';
        updateScore();
    }

    async function saveScore() {
        if (typeof window !== 'undefined') {
            try {
                await axios.post(`${window.location.origin}/api/score`, { scoreA, scoreB, round, playerAName, playerBName });
                fetchSavedScores();
            } catch (error) {
                console.error('Error saving score:', error);
            }
        }
    }

    async function fetchSavedScores() {
        if (typeof window !== 'undefined') {
            try {
                const response = await axios.get(`${window.location.origin}/api/score`);
                savedScore = response.data;
            } catch (error) {
                console.error('Error fetching saved scores:', error);
            }
        }
    }

    fetchScore();
</script>

<style>
    body {
        font-family: 'Roboto', sans-serif;
        background: linear-gradient(45deg, #ff6a00, #ff3366);
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        width: 100%;
        max-width: 900px;
        margin: 20px auto;
        text-align: center;
        padding: 20px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
    }

    h1 {
        font-size: 3.5rem;
        color: #fff;
        margin-bottom: 30px;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }

    .inputs {
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .inputs input {
        padding: 12px;
        font-size: 1.2rem;
        border-radius: 8px;
        border: none;
        width: 200px;
        transition: 0.3s ease;
    }

    .inputs input:focus {
        outline: none;
        box-shadow: 0 0 8px rgba(255, 100, 100, 0.8);
    }

    .scoreboard {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        border-radius: 15px;
        padding: 30px 20px;
        background: rgba(0, 0, 0, 0.8);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
    }

    .scoreboard:hover {
        transform: scale(1.05);
    }

    .player {
        flex: 1;
        text-align: center;
    }

    .player h2 {
        font-size: 1.8rem;
        color: #fff;
        margin-bottom: 15px;
    }

    .score {
        font-size: 4.5rem;
        font-weight: bold;
        color: #fff;
    }

    .round-info {
        font-size: 1.5rem;
        color: #ffb142;
        font-weight: bold;
    }

    .controls {
        margin-top: 20px;
    }

    .controls button {
        background-color: #ff7e5f;
        border: none;
        padding: 15px 30px;
        margin: 10px;
        border-radius: 10px;
        font-size: 1.2rem;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .controls button:hover {
        background-color: #feb47b;
        transform: scale(1.1);
    }

    .save-score {
        margin-top: 20px;
    }

    .save-score button {
        background-color: #4caf50;
        color: #fff;
        padding: 15px 30px;
        border-radius: 10px;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .save-score button:hover {
        transform: scale(1.1);
    }

    .saved-score {
        margin-top: 40px;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 15px;
        text-align: left;
        color: #fff;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    .saved-score h2 {
        color: #feb47b;
    }

    .saved-score p {
        font-size: 1.2rem;
        margin: 5px 0;
    }
</style>

<div class="container">
    <h1>Table Tennis Scoreboard</h1>

    <!-- Player Name Inputs -->
    <div class="inputs">
        <input type="text" bind:value={playerAName} placeholder="Player A Name" />
        <input type="text" bind:value={playerBName} placeholder="Player B Name" />
    </div>

    <div class="scoreboard">
        <div class="player">
            <h2>{playerAName || "Player A"}</h2>
            <div class="score">{scoreA}</div>
        </div>
        <div class="player">
            <h2>{playerBName || "Player B"}</h2>
            <div class="score">{scoreB}</div>
        </div>
    </div>

    <div class="round-info">
        Round: {round}
    </div>

    <div class="controls">
        <button on:click={() => { scoreA++; updateScore(); }}>Player A +1</button>
        <button on:click={() => { scoreB++; updateScore(); }}>Player B +1</button>
        <button on:click={() => { round++; updateScore(); }}>Round +1</button>
        <button on:click={resetScores}>Reset Scores</button>
    </div>

    <div class="save-score">
        <button on:click={saveScore}>Save Score</button>
    </div>

    {#if savedScore}
        <div class="saved-score">
            <h2>Saved Score</h2>
            <p>Score: {savedScore.scoreA} : {savedScore.scoreB}</p>
            <p>Round: {savedScore.round}</p>
            <p>Players: {savedScore.playerAName} vs {savedScore.playerBName}</p>
        </div>
    {/if}
</div>
