<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalshi Whale Watcher & Community</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #020617; /* slate-950 */
            color: #f8fafc; /* slate-50 */
        }
        .mono {
            font-family: 'Roboto Mono', monospace;
        }
        /* Hide scrollbar for chat messages but allow scrolling */
        #chat-messages::-webkit-scrollbar {
            width: 0.5em;
        }
        #chat-messages::-webkit-scrollbar-track {
            background: #1e293b; /* slate-800 */
        }
        #chat-messages::-webkit-scrollbar-thumb {
            background: #475569; /* slate-600 */
            border-radius: 4px;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .new-row, .fade-in { animation: fadeIn 0.5s ease-out; }
    </style>
</head>
<body class="h-screen overflow-hidden">

    <div class="flex h-full">
        <!-- Main Content Area (Feed) -->
        <div class="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <!-- Header -->
            <header class="flex flex-col sm:flex-row justify-between items-center mb-6 shrink-0">
                <div class="flex items-center gap-3">
                    <div class="text-4xl" role="img" aria-label="Whale emoji">🐳</div>
                    <h1 class="text-2xl font-bold text-white">Unusual Whales</h1>
                </div>
                <!-- User Profile Section -->
                <div id="user-profile-section" class="relative">
                    <button id="sign-in-button" class="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.414a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.369-.444.825-.608 1.253a18.23 18.23 0 0 0-5.488 0 11.295 11.295 0 0 0-.608-1.253.074.074 0 0 0-.079-.037A19.79 19.79 0 0 0 3.683 4.414a.074.074 0 0 0-.037.079C3.683 8.35 5.567 11.62 8.448 13.826a.074.074 0 0 0 .088.016c.338-.142.662-.296.972-.458a.074.074 0 0 0 .046-.065 14.23 14.23 0 0 1-.416-2.213.074.074 0 0 1 .046-.088c.15-.059.3-.12.443-.18a.074.074 0 0 1 .065.016c.12.1.239.21.358.318a.074.074 0 0 1 0 .088 12.17 12.17 0 0 0-1.12 3.448.074.074 0 0 0 .026.075c1.432.83 3.033 1.253 4.693 1.253s3.26-.423 4.693-1.253a.074.074 0 0 0 .026-.075 12.17 12.17 0 0 0-1.12-3.448.074.074 0 0 1 0-.088c.12-.1.239-.21.358-.318a.074.074 0 0 1 .065-.016c.15.06.3.12.443-.18a.074.074 0 0 1 .046.088 14.23 14.23 0 0 1-.416 2.213.074.074 0 0 0 .046.065c.31.162.634.316.972.458a.074.074 0 0 0 .088-.016c2.88-2.207 4.765-5.477 4.802-9.333a.074.074 0 0 0-.037-.08zM8.02 10.33a1.493 1.493 0 0 1-1.493-1.493 1.493 1.493 0 1 1 2.986 0 1.493 1.493 0 0 1-1.493 1.493zm7.96 0a1.493 1.493 0 0 1-1.493-1.493 1.493 1.493 0 1 1 2.986 0 1.493 1.493 0 0 1-1.493 1.493z"/></svg>
                        <span>Sign in with Discord</span>
                    </button>
                    <div id="user-avatar" class="hidden items-center gap-2 cursor-pointer">
                        <img id="user-img" src="https://placehold.co/40x40/4338ca/ffffff?text=W" alt="User Avatar" class="w-10 h-10 rounded-full">
                        <div>
                            <p id="user-name" class="font-semibold text-white">WhaleWatcher</p>
                            <p class="text-xs text-slate-400">Online</p>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Top Trades Section -->
            <div class="mb-8 shrink-0">
                <h2 class="text-xl font-semibold text-white mb-4">Largest Recent Trades</h2>
                <div id="top-trades-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="col-span-full text-center text-slate-500 py-4">Waiting for trades...</div>
                </div>
            </div>

            <!-- Filtering Controls -->
            <div class="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
                <div class="sm:col-span-2">
                    <label for="ticker-filter" class="block text-sm font-medium text-slate-400 mb-1">Filter by Market</label>
                    <select id="ticker-filter" class="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <!-- Options will be populated by JS -->
                    </select>
                </div>
                <div>
                    <label for="premium-filter" class="block text-sm font-medium text-slate-400 mb-1">Min. Premium ($)</label>
                    <input type="number" id="premium-filter" class="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="e.g., 10000">
                </div>
            </div>

            <!-- Main Feed Table -->
            <main class="flex-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
                <div id="delay-message" class="p-2 text-center bg-amber-900 text-amber-300 text-xs font-semibold">
                    Data is delayed by 5 minutes. <button onclick="document.getElementById('sign-in-button').click()" class="font-bold hover:underline">Sign in</button> for real-time.
                </div>
                <div class="overflow-y-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-800 text-xs text-slate-400 uppercase sticky top-0">
                            <tr>
                                <th scope="col" class="px-4 py-3">Time</th>
                                <th scope="col" class="px-4 py-3">Market Ticker</th>
                                <th scope="col" class="px-4 py-3 text-right">Price</th>
                                <th scope="col" class="px-4 py-3 text-right">Volume</th>
                                <th scope="col" class="px-4 py-3 text-right">Premium</th>
                            </tr>
                        </thead>
                        <tbody id="feed-body">
                            <tr id="initial-message"><td colspan="5" class="text-center text-slate-500 py-12">Waiting for incoming trades...</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
            
            <!-- Trending Markets Section -->
            <div class="mt-8 shrink-0">
                <h2 class="text-xl font-semibold text-white mb-4">Trending Markets</h2>
                <div id="trending-markets-container" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div class="col-span-full text-center text-slate-500 py-4">Waiting for data...</div>
                </div>
            </div>
        </div>

        <!-- Chat Sidebar -->
        <aside id="chat-sidebar" class="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full shrink-0">
            <div class="p-4 border-b border-slate-800">
                <h2 class="font-bold text-white text-lg">Community Chat</h2>
            </div>
            <div id="chat-messages" class="flex-1 p-4 space-y-4 overflow-y-auto">
                <!-- Chat messages will be injected here -->
            </div>
            <div class="p-4 border-t border-slate-800">
                <div id="chat-sign-in-prompt" class="text-center text-sm text-slate-400">
                    <button class="font-bold text-indigo-400 hover:underline" onclick="document.getElementById('sign-in-button').click()">Sign in with Discord</button> to chat.
                </div>
                <form id="chat-form" class="hidden">
                    <input id="chat-input" type="text" class="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500" placeholder="Type a message..." autocomplete="off">
                </form>
            </div>
        </aside>
    </div>

    <script>
        // --- Element References ---
        const feedBody = document.getElementById('feed-body');
        const topTradesContainer = document.getElementById('top-trades-container');
        const tickerFilterInput = document.getElementById('ticker-filter');
        const premiumFilterInput = document.getElementById('premium-filter');
        const signInButton = document.getElementById('sign-in-button');
        const userAvatar = document.getElementById('user-avatar');
        const chatSignInPrompt = document.getElementById('chat-sign-in-prompt');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        const delayMessage = document.getElementById('delay-message');
        const trendingContainer = document.getElementById('trending-markets-container');

        // --- State ---
        let realtimeTrades = [];
        let delayedTrades = [];
        let isLoggedIn = false;
        const MAX_ROWS = 100;
        const SIMULATED_DELAY = 5 * 60 * 1000; // 5 minutes in ms
        const mockTickers = ['INFL-24', 'GAS-4', 'FED-SEP', 'OSCAR-25', 'TSLA-1T', 'SP500-5K', 'COVID-25'];

        // --- User Authentication Simulation ---
        function handleSignIn() {
            isLoggedIn = true;
            signInButton.classList.add('hidden');
            userAvatar.classList.remove('hidden');
            userAvatar.classList.add('flex');
            chatSignInPrompt.classList.add('hidden');
            chatForm.classList.remove('hidden');
            delayMessage.classList.add('hidden');
            chatInput.focus();
            renderAll(); // Re-render everything with real-time data
        }
        signInButton.addEventListener('click', handleSignIn);

        // --- Chat Simulation ---
        const mockUsers = [{ name: 'TraderTom', color: 'text-green-400'}, { name: 'KalshiKate', color: 'text-sky-400' }];
        function addChatMessage(user, message, isCurrentUser = false) {
            const messageDiv = document.createElement('div');
            const nameColor = user.color || 'text-slate-300';
            const bgColor = isCurrentUser ? 'bg-indigo-600' : 'bg-slate-700';
            const nameDisplay = isCurrentUser ? 'You' : user.name;
            messageDiv.className = `flex gap-2 items-start ${isCurrentUser ? 'justify-end flex-row-reverse' : ''}`;
            messageDiv.innerHTML = `<img src="https://placehold.co/32x32/${isCurrentUser ? '5865F2' : '475569'}/ffffff?text=${user.name.charAt(0)}" alt="avatar" class="w-8 h-8 rounded-full"><div class="flex flex-col"><span class="text-sm font-bold ${nameColor}">${nameDisplay}</span><p class="text-sm p-2 rounded-lg ${bgColor}">${message}</p></div>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addChatMessage({ name: 'You', color: 'text-indigo-400' }, message, true);
                chatInput.value = '';
            }
        });

        // --- Live Feed Simulation ---
        function generateMockTrade() {
            const ticker = mockTickers[Math.floor(Math.random() * mockTickers.length)];
            const price = Math.floor(Math.random() * 98) + 1;
            const volume = Math.floor(Math.random() * 25000) + 500;
            const premium = Math.round((price / 100) * volume);
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            return { time, ticker, price, volume, premium };
        }
        
        function renderTopTrades(trades) {
            const sortedTrades = [...trades].sort((a, b) => b.premium - a.premium);
            const topTrades = sortedTrades.slice(0, 3);
            topTradesContainer.innerHTML = '';
            if (topTrades.length === 0) {
                 topTradesContainer.innerHTML = `<div class="col-span-full text-center text-slate-500 py-4">Waiting for trades...</div>`;
                 return;
            }
            topTrades.forEach(trade => {
                const card = document.createElement('div');
                card.className = 'bg-slate-800 border border-slate-700 rounded-lg p-4 transition-all hover:border-slate-600 fade-in';
                const priceColor = trade.price >= 50 ? 'text-cyan-400' : 'text-pink-400';
                card.innerHTML = `<div class="flex justify-between items-start mb-2"><span class="font-bold text-white">${trade.ticker}</span><span class="mono text-lg font-bold ${priceColor}">${trade.price}¢</span></div><div class="text-right"><p class="mono text-xl font-bold text-yellow-300">$${trade.premium.toLocaleString()}</p><p class="text-xs text-slate-400">Premium (Vol: ${trade.volume.toLocaleString()})</p></div>`;
                topTradesContainer.appendChild(card);
            });
        }

        function renderTrendingMarkets(trades) {
            if (trades.length === 0) {
                trendingContainer.innerHTML = `<div class="col-span-full text-center text-slate-500 py-4">Waiting for data...</div>`;
                return;
            }
            const counts = trades.reduce((acc, trade) => {
                acc[trade.ticker] = (acc[trade.ticker] || 0) + 1;
                return acc;
            }, {});
            const sorted = Object.entries(counts).sort(([,a],[,b]) => b-a).slice(0,5);
            trendingContainer.innerHTML = '';
            sorted.forEach(([ticker, count]) => {
                const card = document.createElement('div');
                card.className = 'bg-slate-800 border border-slate-700 rounded-lg p-3 text-center fade-in';
                card.innerHTML = `<p class="font-bold text-white">${ticker}</p><p class="text-xs text-slate-400">${count} trades</p>`;
                trendingContainer.appendChild(card);
            });
        }

        function renderFeed(trades) {
            const tickerFilter = tickerFilterInput.value;
            const premiumFilter = parseFloat(premiumFilterInput.value) || 0;
            const initialMessage = document.getElementById('initial-message');
            if(initialMessage) initialMessage.remove();
            feedBody.innerHTML = '';
            const filteredTrades = trades.filter(trade => 
                (tickerFilter === "ALL" || trade.ticker === tickerFilter) && trade.premium >= premiumFilter
            );
            if (filteredTrades.length === 0 && trades.length > 0) {
                 feedBody.innerHTML = `<tr><td colspan="5" class="text-center text-slate-500 py-12">No trades match your filters...</td></tr>`;
                 return;
            }
            filteredTrades.forEach(trade => {
                const newRow = document.createElement('tr');
                newRow.className = 'bg-slate-900 border-b border-slate-800 new-row';
                const priceColor = trade.price >= 50 ? 'text-cyan-400' : 'text-pink-400';
                const premiumColor = trade.premium > 10000 ? 'text-yellow-300 font-bold' : 'text-slate-300';
                newRow.innerHTML = `<td class="px-4 py-3 mono text-slate-500">${trade.time}</td><td class="px-4 py-3 font-medium text-white">${trade.ticker}</td><td class="px-4 py-3 mono text-right ${priceColor}">${trade.price}¢</td><td class="px-4 py-3 mono text-right text-slate-300">${trade.volume.toLocaleString()}</td><td class="px-4 py-3 mono text-right ${premiumColor}">$${trade.premium.toLocaleString()}</td>`;
                feedBody.appendChild(newRow);
            });
        }
        
        function renderAll() {
            const tradesToDisplay = isLoggedIn ? realtimeTrades : delayedTrades;
            renderFeed(tradesToDisplay);
            renderTopTrades(tradesToDisplay);
            renderTrendingMarkets(tradesToDisplay);
        }

        function populateTickerFilter() {
            tickerFilterInput.innerHTML = `<option value="ALL">All Markets</option>`;
            mockTickers.forEach(ticker => {
                const option = document.createElement('option');
                option.value = ticker;
                option.textContent = ticker;
                tickerFilterInput.appendChild(option);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            populateTickerFilter();
            tickerFilterInput.addEventListener('change', renderAll);
            premiumFilterInput.addEventListener('input', renderAll);
            addChatMessage(mockUsers[1], "Welcome to the chat! Sign in to participate.");
            
            // Main trade generation loop
            setInterval(() => {
                const trade = generateMockTrade();
                realtimeTrades.unshift(trade);
                if (realtimeTrades.length > MAX_ROWS) realtimeTrades.pop();
                
                // Simulate the delay for non-logged-in users
                setTimeout(() => {
                    delayedTrades.unshift(trade);
                    if (delayedTrades.length > MAX_ROWS) delayedTrades.pop();
                    if (!isLoggedIn) { // Only render for delayed feed if user is not logged in
                         renderAll();
                    }
                }, SIMULATED_DELAY);

                if (isLoggedIn) { // Render immediately for logged-in users
                    renderAll();
                }

            }, 2500); // Generate a trade every 2.5 seconds
        });
    </script>
</body>
</html>





