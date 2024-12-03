import { json, type RequestHandler } from '@sveltejs/kit';

let state = {
    scoreA: 0,
    scoreB: 0,
    round: 1,
    playerAName: '',
    playerBName: ''
};

let savedScores: { scoreA: number, scoreB: number, round: number, playerAName: string, playerBName: string }[] = [];

// GET method to retrieve the current state
export const GET: RequestHandler = () => {
    return json(state);
};

// POST method to update the state or save the score
export const POST: RequestHandler = async ({ request }) => {
    const data: Partial<typeof state> = await request.json();

    const updatedState = {
        scoreA: data.scoreA ?? state.scoreA,  // Default to current state if undefined
        scoreB: data.scoreB ?? state.scoreB,  // Default to current state if undefined
        round: data.round ?? state.round,      // Default to current state if undefined
        playerAName: data.playerAName ?? state.playerAName,  // Default to current name if undefined
        playerBName: data.playerBName ?? state.playerBName   // Default to current name if undefined
    };

    if (data.scoreA !== undefined || data.scoreB !== undefined || data.round !== undefined || data.playerAName !== undefined || data.playerBName !== undefined) {
        // If there's a new score, round, or player name, update the state
        state = { ...state, ...updatedState };
    } else {
        // If no new score or round, save the current state as a saved score
        savedScores.push(updatedState);
    }

    return json({ success: true });
};