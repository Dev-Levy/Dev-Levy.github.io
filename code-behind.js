function countdown(endDate) {
    const intervalId = setInterval(function () {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance > 0) {
            const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor(distance / (1000 * 60 * 60 * 24) - (years * 365));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            console.log(`${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
            //document.getElementById("timer").innerHTML = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }
    }, 1000);
}


const endDate = new Date(2026, 0, 15).getTime();
countdown(endDate);
