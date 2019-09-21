export default getNZDateTime = (date) => {
    const isoDate = date.toISOString();
    const tIndex = isoDate.indexOf('T');
    const hr = isoDate.slice(tIndex + 1, tIndex + 3);
    console.log("un hr", hr);
    console.log("NZ hr", getNZHour(hr));
    const extractedTime = getNZHour(hr) + isoDate.slice(tIndex + 3).replace("Z", "+12:00");

    return (isoDate.slice(0, tIndex+1) + extractedTime);
}

const getNZHour = (hr) => {
    if (+hr >= 1 && +hr <= 11) {
        return (+hr + 12);
    } else if (+hr >= 13 && +hr <= 23) {
        return (+hr - 12);
    } else if (hr == 12) {
        return '00';
    } else {
        return '12';
    }
}