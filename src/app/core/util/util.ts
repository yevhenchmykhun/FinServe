import { SelectItem } from "primeng/api/selectitem";


export const getElapsedTimeAsString = (timeDiff: number) => {

    // Convert from milliseconds to seconds
    timeDiff = timeDiff / 1000;

    // Get seconds that don't form a full minute, ignoring uncomplete seconds
    const seconds = Math.floor(timeDiff % 60);

    // Pad seconds with a zero if necessary
    const secondsAsString = seconds < 10 ? '0' + seconds : seconds + '';

    // Convert time difference from seconds to minutes
    timeDiff = Math.floor(timeDiff / 60);

    // Get minutes that don't form a full hour
    const minutes = timeDiff % 60;

    // Pad minutes with a zero if necessary
    const minutesAsString = minutes < 10 ? '0' + minutes : minutes + '';

    // Convert time difference from minutes to hours
    timeDiff = Math.floor(timeDiff / 60);

    // Get hours that don't form a full day
    const hours = timeDiff % 24;

    // Pad hours with a zero if necessary
    const hoursAsString = hours < 10 ? '0' + hours : hours + '';

    // Convert time difference from hours to days
    timeDiff = Math.floor(timeDiff / 60);

    // The rest is the number of days
    const days = timeDiff;

    const daysAsString = days + 'days';

    if (days) {
        return daysAsString + hoursAsString + ':' + minutesAsString + ':' + secondsAsString;
    } else if (hoursAsString !== '00') {
        return hoursAsString + ':' + minutesAsString + ':' + secondsAsString;
    } else {
        return minutesAsString + ':' + secondsAsString;
    }
}

export const epochMatchModeOptions: SelectItem<string>[] = [
    {
        label: 'Time is',
        value: 'epochIs'
    },
    {
        label: 'Time is not',
        value: 'epochIsNot'
    },
    {
        label: 'Time before',
        value: 'epochBefore'
    },
    {
        label: 'Time after',
        value: 'epochAfter'
    }
]