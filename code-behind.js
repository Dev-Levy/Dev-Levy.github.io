//Copyrigth (c) 2021 by Luis Eduardo Sánchez González
function countdown(endDate) {
    const intervalId = setInterval(function () {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
    }, 1000);
}
const endDate = new Date(2026, 1, 15).getTime();
countdown(endDate);