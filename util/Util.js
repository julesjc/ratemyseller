var moment = require('moment');
import FirebaseDbService from '../services/FirebaseDbService';

export default class Util {

    static isDateBetweenInterval(date, startInterval, endInterval) {

        if (date >= startInterval && date <= endInterval) {
            return true;
        } else
            return false
    }

    static getTimeRemainingBetweenTwoDates(date, countDownDate) {
        // Find the distance between now and the count down date
        var distance = countDownDate - date;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return (days == 0 ? '' : days + "j ") + this.addLeadingZero(hours) + ":" + this.addLeadingZero(minutes) + ":" + this.addLeadingZero(seconds);
    }

    static addLeadingZero(strnumber) {
        number = parseInt(strnumber);
        return (number < 10 && number > -10) ? "0" + strnumber : strnumber;
    }


    static getFullDateString(date) {

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }
        var month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        var day = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

        return day[date.getDay()] + " " + pad(date.getDate()) + " " + month[date.getMonth()] + " " + date.getFullYear();

    }

    static getIndexToDayString(index) {

        var dayarr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

        return dayarr[index];

    }

    static isArrayInArray(arr, item) {
        var item_as_string = JSON.stringify(item);

        var contains = arr.some(function (ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }

    static getNow() {
        //TODO get from online

        return new Date();
    }

    static arrayAverage(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += parseFloat(arr[i], 10); //don't forget to add the base
        }

        return sum / arr.length;

    }

    static async searchForSellerData(searchValue) {
        var sellerResults = {};

        var phoneResult = await FirebaseDbService.getSellerByPhone(searchValue);

        if (phoneResult.size == 0)
            return false

        var rates = [];
        var reviews = [];

        phoneResult.forEach(function (doc) {
            reviews.push("(Vu sur " + doc.data().sellerSite + " le " + Util.getFullDateString(doc.data().createdAt.toDate()) + ") "+ doc.data().sellerRateDesc);
            rates.push(doc.data().sellerRate);
        });

        sellerResults.name = searchValue;
        sellerResults.rating = this.arrayAverage(rates);
        sellerResults.reviews = reviews;

        return sellerResults;
    }


}