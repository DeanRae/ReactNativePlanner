const months = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
/**
 * Returns NZ ISO Date when given a javascript date object.
 */
export default getNZDateTime = (date) => {
    const isoDate = date.toISOString();
    const tIndex = isoDate.indexOf('T');
    const hr = isoDate.slice(tIndex + 1, tIndex + 3);
    const extractedTime = getNZHour(hr) + isoDate.slice(tIndex + 3, tIndex + 6) + "+12:00";

    return (isoDate.slice(0, tIndex + 1) + extractedTime);
}

/**
 * Returns friendly 12 hr time with am and pm when given
 * and ISO date.
 * @param {*} date 
 */
export const get12HrTime = (date) => {
    const tIndex = date.indexOf('T');
    const plusIndex = date.indexOf('+');
    const min = date.slice(tIndex + 4, plusIndex);
    const hr = date.slice(tIndex + 1, tIndex + 3);

    if (+hr > 12) {
        let formattedHr = getNZHour(hr);
        return formattedHr + ":" + min + " pm";
    } else if (+hr < 12 && +hr > 0) {
        return date.slice(tIndex + 1, plusIndex) + " am";
    } else {
        return hr == '12' ? "12:" + min + " pm" : "12:" + min + " am";
    }
}

/**
 * Given a date object, returns the date string in yyyy-mm-dd format
 */
export const getDateString = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export const getFriendlyDateString = (date) => {
    const d = date.getDate();
    const m = months[date.getMonth()] ;
    const y = date.getFullYear();
    return d + " " + m + " " + y;
}

/**
 * Returns the correct hour format for NZ time when
 * given a javascript Date obj.
 * 
 * @param {*} hr 
 */
const getNZHour = (hr) => {
    if (+hr >= 1 && +hr <= 11) {
        return (+hr + 12);
    } else if (+hr >= 13 && +hr <= 23) {
        const time = (+hr - 12).toString();
        return time.length < 2 ? "0" + time : time;
    } else if (hr == 12) {
        return '00';
    } else {
        return '12';
    }
}