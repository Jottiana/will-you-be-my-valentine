import { useState } from "react";
import "./ValentineApp.css";

const responsesByCategory = {
	yes: {
		names: [
			"Betty",
			"Eva",
			"Giulia",
			"Noli",
			"Julie",
			"Gégé",
			"Géraldine",
			"Annabelle",
			"Laëtitia",
			"Angélina",
			"Alex",
			"Victoria",
		],
		response: "OMG, c’est toi ? \nBien sûr que oui ! ❤️",
	},
	wait_what: {
		names: ["Benjamin", "Florian", "Léo", "Camille", "Tom"],
		response: "Ça devient sérieux ! \nTu es sûr(e) ? 😏💘",
	},
	for_life: {
		names: ["Poly", "Gustave", "Bébé"],
		response: "Toi et moi, \nc’est pour la vie ! 😍💖",
	},
	guys: {
		names: ["Julien", "Juju", "Kevin", "Sam", "Anthony", "Victor", "Mala", "Paul", "Salvia", "Thomas"],
		response: "Hahaha... \nbonne blague 😂",
	},
	others: {
		names: ["Beyoncé"],
		response: "Je vais y réfléchir... \nmais tu as une chance ! 🤔💞",
	},
};

const getResponse = (name: string): string => {
	if (!/^[A-ZÀ-ÖØ-Ÿ][a-zà-öø-ÿ]{1,}$/.test(name)) {
		return "Hmm... Ce n'est pas un vrai prénom, ça ? 😅";
	}

	for (const category of Object.keys(responsesByCategory) as Array<
		keyof typeof responsesByCategory
	>) {
		if (responsesByCategory[category].names.includes(name)) {
			return responsesByCategory[category].response;
		}
	}

	return "On apprend à se connaître d’abord ? 😊";
};

const ValentineApp = () => {
	const [name, setName] = useState("");
	const [submittedName, setSubmittedName] = useState<string | null>(null);
	const [response, setResponse] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
	const [hearts, setHearts] = useState<
		{ id: number; x: number; y: number; color: string }[]
	>([]);

	const handleSubmit = () => {
		if (name.trim() === "") {
			setError("Merci d'entrer un prénom !");
			return;
		}

		setError(null);
		setSubmittedName(name);
		setResponse(getResponse(name));
		setName("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
		}
	};

	const moveNoButton = () => {
		const maxX = window.innerWidth < 768 ? 100 : 200;
		const maxY = window.innerWidth < 768 ? 100 : 200;
		const newX = Math.random() * (maxX * 2) - maxX;
		const newY = Math.random() * (maxY * 2) - maxY;
		setNoPosition({ x: newX, y: newY });
	};

	const createHearts = (event: React.MouseEvent<HTMLButtonElement>) => {
		const buttonRect = event.currentTarget.getBoundingClientRect();
		const btnX = buttonRect.left + buttonRect.width / 2;
		const btnY = buttonRect.top;

		const colors = ["#ff4d6d", "#ff85a1", "#ffadc8", "#c75fff"];

		const newHearts = Array.from({ length: 10 }).map((_, index) => ({
			id: Date.now() + index,
			x: btnX + (Math.random() * 60 - 30),
			y: btnY + (Math.random() * 30 - 15),
			color: colors[Math.floor(Math.random() * colors.length)],
		}));

		setHearts((prev) => [...prev, ...newHearts]);

		setTimeout(() => {
			setHearts((prev) => prev.slice(10));
		}, 1000);
	};

	return (
		<div className="relative flex items-center justify-center min-h-[100vh] w-full bg-gradient-to-r from-pink-500 via-red-400 to-red-600 text-white text-center p-4">
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
				{hearts.map((heart) => (
					<div
						key={heart.id}
						className="heart absolute"
						style={{
							left: `${heart.x}px`,
							top: `${heart.y}px`,
							backgroundColor: heart.color,
						}}
					/>
				))}
			</div>

			<div className="bg-white/20 p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl flex flex-col items-center w-full max-w-lg md:max-w-2xl">
				<h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 animate-pulse">
					Will you be my Valentine? 💖
				</h1>

				<input
					type="text"
					placeholder="Ton prénom ici..."
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={handleKeyDown}
					className="mb-4 px-4 py-2 sm:py-3 w-full max-w-xs rounded-lg border border-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
				/>
				<button
					type="submit"
					onClick={handleSubmit}
					className="mb-6 px-6 py-2 sm:py-3 w-full max-w-xs bg-white text-red-600 font-semibold rounded-lg shadow-lg hover:bg-red-200 transition transform hover:scale-105"
				>
					Valider
				</button>

				{submittedName && response && (
					<p className="whitespace-pre-wrap mt-4 text-lg md:text-xl font-semibold bg-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md">
						{response}
					</p>
				)}
				{error && (
					<p className="mt-4 text-lg text-red-400 font-semibold">{error}</p>
				)}

				<div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative w-full">
					<button
						type="button"
						onClick={createHearts}
						className="relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 text-lg md:text-xl font-bold bg-red-500 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
					>
						Yes 💘
					</button>

					<button
						type="button"
						className="px-6 py-3 sm:px-8 sm:py-4 text-lg md:text-xl font-bold bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-400 transition-transform duration-300"
						onMouseEnter={moveNoButton}
						style={{
							transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
						}}
					>
						No 💔
					</button>
				</div>
			</div>
		</div>
	);
};

export default ValentineApp;
