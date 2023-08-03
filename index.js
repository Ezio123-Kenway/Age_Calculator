const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const button = document.getElementById('btn');

const yearTag = document.querySelector('.years');
const monthTag = document.querySelector('.months');
const dayTag = document.querySelector('.days');

const resultContainer = document.querySelector('.resultContainer');

const errorTag = document.createElement('div')
errorTag.style.color = "red";
errorTag.style.fontWeight = "bold";
errorTag.style.fontSize = "18px";

resultContainer.append(errorTag);

let dayInputValue = "";
let monthInputValue = "";
let yearInputValue = "";

button.addEventListener('click', () => {
     dayInputValue = day.value;
     monthInputValue = month.value;
     yearInputValue = year.value;

    const parsedDayInputValue = parseInt(dayInputValue);
    const parsedMonthInputValue = parseInt(monthInputValue);
    const parsedYearInputValue = parseInt(yearInputValue);

    yearTag.innerHTML = "";
    monthTag.innerHTML = "";
    dayTag.innerHTML = "";

    // Error Handling
    // errorTag.innerHTML = "";

    if (dayInputValue === "" || monthInputValue === "" || yearInputValue === "") {
        errorTag.innerHTML = "Please submit your date of birth completely";
        return;
    }

    if(isNaN(dayInputValue) || isNaN(monthInputValue) || isNaN(yearInputValue)) {
        errorTag.innerHTML = "Invalid Data Type";
        return;
    }

    const currentYear = new Date().getFullYear();

    if (parsedDayInputValue > 31 || parsedMonthInputValue > 11 || parsedYearInputValue > currentYear) {
        errorTag.innerHTML = "Your data is impossible";
        return;
    }

    // Restriction
    if (parsedMonthInputValue === 3 || 5 || 8 || 10) {
        if (parsedDayInputValue > 30) {
            errorTag.innerHTML = "Your data is invalid! Try again";
            return;
        }
    }

    if (parsedMonthInputValue === 1) {
        if (parsedDayInputValue > 29) {
            errorTag.innerHTML = "There cannot be 30 days in February! Try again";
            return;
        }

        const isLeapYear = parsedYearInputValue%4 === 0 ;
        if (!isLeapYear) {
            if(parsedDayInputValue === 29) {
                errorTag.innerHTML = "Impossible! Your year of birth is not leap year";
            }
            return;
        }
    }

    // Age Calculating

    const currentTime = new Date().getTime();
    const birthTime = new Date(parsedYearInputValue, parsedMonthInputValue, parsedDayInputValue).getTime();
    const totalDurationTime = currentTime - birthTime ;

    const totalYears = Math.floor(totalDurationTime/(86400000*365));
    
    const remainder1 = totalDurationTime%(86400000*365);
    const totalMonths = Math.floor(remainder1/(86400000*30));

    const remainder2 = remainder1%(86400000*30);
    const totalDays = Math.floor(remainder2/86400000);

    if(totalMonths >= 12) {
        const yearsToAdd = Math.floor(totalMonths/12);
        totalYears += yearsToAdd;

        totalMonths = totalMonths%12 ;
    }

    yearTag.innerHTML = `${totalYears}years`;

    if(totalMonths < 2) {
        monthTag.innerHTML = `${totalMonths}month`;
    }else {
        monthTag.innerHTML = `${totalMonths}months`;
    }

    dayTag.innerHTML = `${totalDays}days`;

});

window.addEventListener('load', () => {
    day.value = "";
    month.value = "";
    year.value = "";
})