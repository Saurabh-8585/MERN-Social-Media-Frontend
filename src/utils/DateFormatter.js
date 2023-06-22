export const DayFormatter = (date) => {
    let postDay = new Date(date).toLocaleDateString('en-us',
        {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    return postDay

}

export const TimeFormatter = (date) => {
    let postTime = new Date(date).toLocaleTimeString('en-US');
    return postTime
}