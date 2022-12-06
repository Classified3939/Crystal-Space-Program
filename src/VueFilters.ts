import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.filter('numberFormat', function (value: number) {
    if (value == undefined) {
        return "";
    }
    if (value == Infinity){
        return "Infinity"
    }
    const len = String(Math.floor(value)).length;
    if (len < 4){
        return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else if (len < 7){
        return (value/1e3).toFixed(2) + "K"
    }
    else if (len < 10){
        return (value/1e6).toFixed(2) + "M"
    }
    else if (len < 13){
        return (value/1e9).toFixed(2) + "B"
    }
    else if (len < 16){
        return (value/1e12).toFixed(2) + "T"
    }
    else{
        return value.toExponential(2).replace("e+","e");
    }
})

Vue.filter('dateFormat', function (date: Date) {
    if (date == undefined) {
        return "";
    }

    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {month: 'long'}).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

    const hours = date.getHours();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = date.getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${day} ${month} ${year} ${hoursString}:${minutesString}`;

})

Vue.filter('humanizeString', function (string: string) {
    if (string == undefined) {
        return "";
    }
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string.replace("_", " ").replace("-", " ");
    return string;
})
