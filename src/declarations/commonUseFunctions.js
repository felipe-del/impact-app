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

    // Return the ISO 8601 format
    return dateTime.toISOString();
};

const handleTimeSetting = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
}

const isEmptyString = (string) => {
    return typeof string === 'string' && string.trim() === '';
}

export { formatTime, formatEventTime, handleTimeSetting, isEmptyString };
