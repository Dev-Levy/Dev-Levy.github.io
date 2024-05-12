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
            document.getElementById("years-digit").innerHTML = years;
            document.getElementById("days-digit").innerHTML = days;
            document.getElementById("hours-digit").innerHTML = hours;
            document.getElementById("minutes-digit").innerHTML = minutes;
            document.getElementById("seconds-digit").innerHTML = seconds;
        }
    }, 1000);
}


const endDate = new Date(2026, 2, 28, 12).getTime();
countdown(endDate);
