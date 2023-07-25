

const timeUtils = {
    secondsToMinutes: function (seconds) {
        let secs = Math.floor(seconds % 60);
        secs = secs < 10 ? "0" + secs : "" + secs;

        let min = Math.floor(seconds / 60);
        min = min < 10 ? "0" + min : "" + min;

        return min + ":" + secs;
    },
};

export default timeUtils;
