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
                    <button id="sign-in-button" class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center gap-2">
                        <svg class="w-5 h-5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
                        <span>Sign in with Google</span>
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
                    Loading chat...
                </div>
                <form id="chat-form" class="hidden">
                    <input id="chat-input" type="text" class="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white placeholder-slate-500" placeholder="Type a message..." autocomplete="off">
                </form>
            </div>
        </aside>
    </div>

    <!-- Firebase SDKs -->
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
        import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

        // Your web app's Firebase configuration
        // IMPORTANT: Replace with your actual config and secure your API key!
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY", // Replace with your actual API key
            authDomain: "unusual-kalshi.firebaseapp.com",
            projectId: "unusual-kalshi",
            storageBucket: "unusual-kalshi.appspot.com",
            messagingSenderId: "525022106936",
            appId: "1:525022106936:web:203cad6c77aa7b25059dcd"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        let currentUser = null;

        // --- Firebase Authentication ---
        const googleProvider = new GoogleAuthProvider();

        function handleSignIn() {
            signInWithPopup(auth, googleProvider)
                .catch((error) => {
                    console.error("Google sign-in error:", error);
                    alert("Failed to sign in with Google. Please try again.");
                });
        }
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUser = user;
                if (!user.isAnonymous) {
                    // User signed in with Google
                    isLoggedIn = true;
                    signInButton.classList.add('hidden');
                    userAvatar.classList.remove('hidden');
                    userAvatar.classList.add('flex');
                    document.getElementById('user-name').textContent = user.displayName;
                    document.getElementById('user-img').src = user.photoURL || `https://placehold.co/40x40/4f46e5/ffffff?text=${user.displayName.charAt(0)}`;
                    delayMessage.classList.add('hidden');
                    renderAll();
                }
                
                // Common logic for both anonymous and real users
                chatSignInPrompt.classList.add('hidden');
                chatForm.classList.remove('hidden');
                chatInput.focus();
                
                const messagesQuery = query(collection(db, "messages"), orderBy("timestamp"));
                onSnapshot(messagesQuery, (snapshot) => {
                    chatMessages.innerHTML = '';
                    snapshot.forEach((doc) => {
                        const message = doc.data();
                        addChatMessage(message.user, message.text, message.uid === currentUser.uid);
                    });
                });

            } else {
                currentUser = null;
                // If there's no user at all, attempt to sign in anonymously for chat.
                signInAnonymously(auth).catch((error) => {
                    console.error("Anonymous sign-in failed:", error);
                    chatSignInPrompt.textContent = "Chat failed to load.";
                });
            }
        });

        // --- Real-time Chat with Firestore ---
        function addChatMessage(user, message, isCurrentUser = false) {
            const messageDiv = document.createElement('div');
            
            const displayName = isCurrentUser ? 'You' : (user.displayName || `User...${user.uid.slice(-4)}`);
            const photoURL = user.photoURL || `https://placehold.co/32x32/475569/ffffff?text=${displayName.charAt(0)}`;
            const nameColor = isCurrentUser ? 'text-indigo-400' : 'text-green-400';
            const bgColor = isCurrentUser ? 'bg-indigo-600' : 'bg-slate-700';
            
            messageDiv.className = `flex gap-2 items-start ${isCurrentUser ? 'justify-end flex-row-reverse' : ''}`;
            messageDiv.innerHTML = `<img src="${photoURL}" alt="avatar" class="w-8 h-8 rounded-full"><div class="flex flex-col"><span class="text-sm font-bold ${nameColor}">${displayName}</span><p class="text-sm p-2 rounded-lg ${bgColor}">${message}</p></div>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message && currentUser) {
                try {
                    await addDoc(collection(db, "messages"), {
                        text: message,
                        uid: currentUser.uid,
                        user: { // Store user info with the message
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            uid: currentUser.uid
                        },
                        timestamp: serverTimestamp()
                    });
                    chatInput.value = '';
                } catch (error) {
                    console.error("Error sending message: ", error);
                }
            }
        });

        // --- Element References ---
        const feedBody = document.getElementById('feed-body');
        const topTradesContainer = document.getElementById('top-trades-container');
        const tickerFilterInput = document.getElementById('ticker-filter');
        const premiumFilterInput = document.getElementById('premium-filter');
        const signInButton = document.getElementById('sign-in-button');
        const userAvatar = document.getElementById('user-avatar');
        const delayMessage = document.getElementById('delay-message');
        const trendingContainer = document.getElementById('trending-markets-container');

        // --- State ---
        let realtimeTrades = [];
        let delayedTrades = [];
        let isLoggedIn = false;
        const MAX_ROWS = 100;
        const SIMULATED_DELAY = 5 * 60 * 1000;
        const mockTickers = ['INFL-24', 'GAS-4', 'FED-SEP', 'OSCAR-25', 'TSLA-1T', 'SP500-5K', 'COVID-25'];
        
        // Attach event listener to the sign-in button
        signInButton.addEventListener('click', handleSignIn);

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
            
            setInterval(() => {
                const trade = generateMockTrade();
                realtimeTrades.unshift(trade);
                if (realtimeTrades.length > MAX_ROWS) realtimeTrades.pop();
                
                setTimeout(() => {
                    delayedTrades.unshift(trade);
                    if (delayedTrades.length > MAX_ROWS) delayedTrades.pop();
                    if (!isLoggedIn) {
                         renderAll();
                    }
                }, SIMULATED_DELAY);

                if (isLoggedIn) {
                    renderAll();
                }

            }, 2500);
        });
    </script>
</body>
</html>







