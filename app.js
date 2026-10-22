document.addEventListener('DOMContentLoaded', () => {

    const quizQuestions = [
        {
            title: "Cum arată dimineața ta ideală în vacanță?",
            options: [
                { label: "A. Mă trezesc devreme și plec la o drumeție", type: "A" },
                { label: "B. Dorm până târziu și iau micul dejun pe terasă", type: "B" },
                { label: "C. Plec să descopăr străzile și cafenelele orașului", type: "C" },
                { label: "D. Mic dejun în pat, cu vedere spre ocean", type: "D" }
            ]
        },
        {
            title: "Cum ți-ai descrie personalitatea într-un cuvânt?",
            options: [
                { label: "A. Curajos/curajoasă", type: "A" },
                { label: "B. Calm/calmă", type: "B" },
                { label: "C. Curios/curioasă", type: "C" },
                { label: "D. Rafinat/rafinată", type: "D" }
            ]
        },
        {
            title: "Ce ai pune primul în bagaj?",
            options: [
                { label: "A. Bocancii și rucsacul", type: "A" },
                { label: "B. Costumul de baie și crema de soare", type: "B" },
                { label: "C. Aparatul foto și un ghid de oraș", type: "C" },
                { label: "D. Hainele elegante și ochelarii de soare", type: "D" }
            ]
        },
        {
            title: "Cu cine ai merge în vacanță?",
            options: [
                { label: "A. Cu prietenii, să facem ceva nebunesc", type: "A" },
                { label: "B. Cu familia sau cu partenerul/partenera, ca să ne liniștim", type: "B" },
                { label: "C. Cu un grup mic, care iubește să exploreze", type: "C" },
                { label: "D. În cuplu, pentru o experiență de neuitat", type: "D" }
            ]
        },
        {
            title: "Ce activitate ți se pare cea mai tentantă?",
            options: [
                { label: "A. Rafting, escaladă sau tiroliană", type: "A" },
                { label: "B. Plajă, carte bună și un cocktail", type: "B" },
                { label: "C. Vizitarea muzeelor și a monumentelor", type: "C" },
                { label: "D. Croazieră sau masaj la spa", type: "D" }
            ]
        },
        {
            title: "Ce fel de cazare preferi?",
            options: [
                { label: "A. Cabană sau camping în natură", type: "A" },
                { label: "B. Hotel la malul mării, cu all inclusive", type: "B" },
                { label: "C. Un apartament central, în inima orașului", type: "C" },
                { label: "D. Resort de lux sau vilă privată", type: "D" }
            ]
        },
        {
            title: "Ce fel de mâncare vrei să încerci?",
            options: [
                { label: "A. Mâncare tradițională la un foc de tabără sau la o stână", type: "A" },
                { label: "B. Fructe de mare proaspete, direct pe plajă", type: "B" },
                { label: "C. Street food și specialități locale din piețe", type: "C" },
                { label: "D. Cină gourmet într-un restaurant exclusivist", type: "D" }
            ]
        },
        {
            title: "Cum ți-ai dori să te simți la întoarcerea acasă?",
            options: [
                { label: "A. Plin/plină de energie și de povești de aventură", type: "A" },
                { label: "B. Odihnit/odihnită și relaxat/relaxată", type: "B" },
                { label: "C. Inspirat/inspirată, cu o mulțime de lucruri noi învățate", type: "C" },
                { label: "D. Răsfățat/răsfățată, ca după un vis", type: "D" }
            ]
        }
    ];

    const quizResults = {
        A: { title: "Aventură la Munte", destinations: "Carpații, Transfăgărășan, Alpi sau Dolomiți." },
        B: { title: "Relaxare la Mare", destinations: "Grecia, Turcia, Bulgaria sau Litoralul Românesc." },
        C: { title: "City Break și Cultură", destinations: "Roma, Paris, Viena, Praga sau Barcelona." },
        D: { title: "Escapadă Exotică și Luxoasă", destinations: "Maldive, Dubai, Bali sau Mauritius." }
    };

    let currentQuestionIndex = 0;
    let userAnswers = [];

    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const progressBar = document.getElementById('quiz-progress-bar');
    const stepCountEl = document.getElementById('quiz-step-count');
    const quizContainer = document.getElementById('quiz-container');
    const quizResultView = document.getElementById('quiz-result-view');

    if (questionEl) {
        function renderQuestion() {
            const currentQ = quizQuestions[currentQuestionIndex];
            questionEl.textContent = currentQ.title;
            stepCountEl.textContent = `Întrebarea ${currentQuestionIndex + 1} din ${quizQuestions.length}`;
            progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

            prevBtn.classList.toggle('invisible', currentQuestionIndex === 0);

            optionsEl.innerHTML = '';
            currentQ.options.forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option-card border border-slate-200 rounded-xl p-5 font-semibold text-slate-800 flex items-center justify-between cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition';
                btn.innerHTML = `<span>${opt.label}</span><i class="fa-solid fa-chevron-right text-slate-300 text-sm"></i>`;
                btn.onclick = () => selectOption(opt.type);
                optionsEl.appendChild(btn);
            });
        }

        function selectOption(type) {
            userAnswers[currentQuestionIndex] = type;
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                showQuizResults();
            }
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                }
            };
        }

        function showQuizResults() {
            const counts = { A: 0, B: 0, C: 0, D: 0 };
            userAnswers.forEach(ans => counts[ans]++);

            let majority = 'A';
            let maxCount = 0;
            for (const key in counts) {
                if (counts[key] > maxCount) {
                    maxCount = counts[key];
                    majority = key;
                }
            }

            const result = quizResults[majority];
            quizContainer.classList.add('hidden');
            quizResultView.classList.remove('hidden');

            document.getElementById('result-category-title').textContent = result.title;
            document.getElementById('result-destinations').textContent = result.destinations;
        }

        renderQuestion();
    }

    const destinationsList = [
        { name: "Transfăgărășan, RO", budget: "low", price: "250€" },
        { name: "Thassos, Grecia", budget: "low", price: "400€" },
        { name: "Praga, Cehia", budget: "medium", price: "650€" },
        { name: "Roma, Italia", budget: "medium", price: "750€" },
        { name: "Barcelona, Spania", budget: "medium", price: "850€" },
        { name: "Dubai, EAU", budget: "luxury", price: "1400€" },
        { name: "Bali, Indonezia", budget: "luxury", price: "1800€" },
        { name: "Maldive", budget: "luxury", price: "2200€" }
    ];

    const canvas = document.getElementById('wheel-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const spinBtn = document.getElementById('spin-btn');
        let currentBudget = 'all';
        let filteredDestinations = [...destinationsList];
        let startAngle = 0;
        let isSpinning = false;

        const colors = ['#b89a55', '#777771', '#d8c89f', '#454540', '#c5b37e', '#a28b52', '#e8e5dc', '#6b6b64'];

        function drawWheel() {
            const numOptions = filteredDestinations.length;
            const arcSize = (2 * Math.PI) / numOptions;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < numOptions; i++) {
                const angle = startAngle + i * arcSize;
                ctx.beginPath();
                ctx.fillStyle = colors[i % colors.length];
                ctx.moveTo(250, 250);
                ctx.arc(250, 250, 240, angle, angle + arcSize);
                ctx.lineTo(250, 250);
                ctx.fill();

                ctx.save();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
                ctx.translate(250 + Math.cos(angle + arcSize / 2) * 150, 250 + Math.sin(angle + arcSize / 2) * 150);
                ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
                ctx.fillText(filteredDestinations[i].name, -ctx.measureText(filteredDestinations[i].name).width / 2, 0);
                ctx.restore();
            }
        }

        const budgetButtons = Array.from(document.querySelectorAll('.budget-btn'));
        budgetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isSpinning) return;

                // Keep exactly one selected budget and remove stale Tailwind classes.
                budgetButtons.forEach(button => {
                    button.classList.remove('active', 'bg-slate-900', 'text-white');
                    button.classList.add('bg-white', 'text-slate-700');
                    button.setAttribute('aria-pressed', 'false');
                });
                btn.classList.remove('bg-white', 'text-slate-700');
                btn.classList.add('active', 'bg-slate-900', 'text-white');
                btn.setAttribute('aria-pressed', 'true');

                currentBudget = btn.dataset.budget;
                filteredDestinations = currentBudget === 'all'
                    ? [...destinationsList]
                    : destinationsList.filter(destination => destination.budget === currentBudget);

                // Reset rotation so the selected slices are drawn consistently.
                startAngle = 0;
                drawWheel();
            });
        });

        spinBtn.onclick = () => {
            if (isSpinning) return;
            isSpinning = true;

            const spinDuration = 4000;
            const totalRotation = Math.PI * 2 * 5 + Math.random() * Math.PI * 2;
            const startTime = performance.now();

            function animateWheel(now) {
                const elapsed = now - startTime;
                if (elapsed < spinDuration) {
                    const easeOut = 1 - Math.pow(1 - elapsed / spinDuration, 3);
                    startAngle = easeOut * totalRotation;
                    drawWheel();
                    requestAnimationFrame(animateWheel);
                } else {
                    isSpinning = false;
                    const numOptions = filteredDestinations.length;
                    const arcSize = (2 * Math.PI) / numOptions;
                    // The pointer is fixed at the top of the wheel (-PI/2).
                    // Select the slice that actually ends up beneath that pointer.
                    const fullTurn = 2 * Math.PI;
                    const pointerAngle = -Math.PI / 2;
                    const normalizedAngle = ((pointerAngle - (startAngle % fullTurn)) % fullTurn + fullTurn) % fullTurn;
                    const selectedIndex = Math.min(numOptions - 1, Math.floor(normalizedAngle / arcSize));
                    const winner = filteredDestinations[selectedIndex];

                    showModal(winner);
                }
            }

            requestAnimationFrame(animateWheel);
        };

        function showModal(winner) {
            const modal = document.getElementById('wheel-modal');
            document.getElementById('modal-destination-title').textContent = winner.name;
            document.getElementById('modal-destination-price').textContent = `Buget Estimat: ${winner.price}`;
            modal.classList.remove('hidden');
        }

        document.getElementById('close-modal-btn')?.addEventListener('click', () => {
            document.getElementById('wheel-modal').classList.add('hidden');
        });

        drawWheel();
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Mesajul tău a fost trimis cu succes!');
            contactForm.reset();
        };
    }
});
