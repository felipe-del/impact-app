const formatTime = (timeToDisplay) => {
    const time = new Date(`1970-01-01T${timeToDisplay}Z`);
    return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
};

const formatEventTime = (eventDate, time) => {
    // Combine the date with the given time
    const dateTime = new Date(`${eventDate}T${time}:00Z`);

    return dateTime.toISOString();
};

const handleTimeSetting = (time, timeAdjustment = 0, add = false) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();

    date.setHours(hours);
    (add) ? date.setMinutes(minutes + timeAdjustment) : date.setMinutes(minutes - timeAdjustment);

    const adjustedHours = String(date.getHours()).padStart(2, '0');
    const adjustedMinutes = String(date.getMinutes()).padStart(2, '0');

    return `${adjustedHours}:${adjustedMinutes}`;
};

const isEmptyString = (string) => {
    return typeof string === 'string' && string.trim() === '';
}

export { formatTime, formatEventTime, handleTimeSetting, isEmptyString };
