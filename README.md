🎉 Bingo Game Documentation

🎯 Table of Contents

    •	🌐 Overview
    •	✨ Key Features
    •	🛠 Technologies Used
    •	⚙️ Game Logic
    •	💡 Decision-Making Process
    •	🚀 Possible Improvements

🌐 Overview
My Bingo game interacts with a theme inspired by the bar “Landgang Brauerei (Bahrenfeld)” where real-life beer BINGO competitions brought excitement. Reimagined for a digital format, the app uses numbers and glasses as the theme and is optimized for all devices, ensuring a seamless experience on desktop, tablet, and mobile.

✨ Key Features

    •	Multiple Bingo Wins: Players can achieve multiple bingos across rows, columns, and diagonals within a single game.
    •	Responsive Layout: The game is optimized for different screen sizes to deliver a great experience across devices.
    •	Dynamic Animation: A celebratory confetti animation enhances each new bingo win.
    •	Reset Game Functionality: Players can start a fresh game with a new board and cleared bingo counts.
    •	Customizable Theme: This theme uses numbers and glasses for a fun, social “Cheers!” atmosphere inspired by real events.

🛠 Technologies Used

    •	React: For building the UI components and managing state.
    •	TypeScript: To provide type safety and improve readability.
    •	Tailwind CSS: For responsive, modern styling without complex CSS files.
    •	React-Confetti: For a confetti effect to celebrate every bingo achievement.

⚙️ Game Logic

1. Multiple Bingo Wins

my game was designed to support multiple bingos without requiring a reset. The checkBingoHandler function keeps a count of bingoCount and uses a completedLines set to track which rows, columns, and diagonals have already been completed, preventing repeated bingos for the same lines.

const completedLines = new Set<string>(); // Tracks completed rows, columns, and diagonals
let bingoCount = 0; // Total bingos achieved

2. Tracking Bingo Progress

In the handleCellClick function, the board is updated by marking each clicked cell as “selected.” The game then checks for any new bingos after each click.

const handleCellClick = (index: number) => {
const updatedBoard = board.map((cell, i) =>
i === index ? { ...cell, selected: !cell.selected } : cell
);
checkBingoHandler(updatedBoard);
};

3. Game Reset Logic

The resetGame function clears the board to a fresh state, resets the bingo count, and clears previously completed lines.

const resetGame = (setBingoCount, setBoard, setCompletedLines) => {
setBingoCount(0);
setCompletedLines(new Set());
const shuffledBoard = initializeBoard();
setBoard(shuffledBoard);
};

💡 Decision-Making Process

Why Numbers and Glasses?

The “Cheers!” theme with numbers and glasses was inspired by a social setting. This theme brings a sense of fun and adds to the celebratory, casual drinking atmosphere that’s ideal for group interactions.

Why Confetti Animation?

To make each bingo win feel rewarding, the react-confetti library was used to create a celebratory confetti effect. This provides visual feedback, enhancing the enjoyment of each achievement.

Why Use Tailwind CSS?

Tailwind CSS was selected for its rapid styling capabilities and responsive design utilities. It simplifies adjustments for responsiveness, which is especially beneficial over traditional CSS, making the design adaptive across different screen sizes with minimal setup.

🚀 Possible Improvements

    1.	Enhanced Confetti and Animation: Adding customizable themes for the confetti effect based on the number of bingos could make each milestone feel unique.
    2.	Leaderboard Functionality: Introducing a scoreboard could enable players to compete, keeping track of their bingo achievements.
    3.	Theme Customization: Allowing users to choose from a variety of themes (e.g., meeting phrases, emojis) would make the game adaptable for different occasions.
