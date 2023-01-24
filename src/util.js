export const doFetch = (url, opts, returnJson = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opts);
            if (response.ok) {
                let data;
                if (returnJson) {
                    data = await response.json();
                } else {
                    data = "Valid";
                }
                resolve({
                    status: "ok",
                    data,
                });
            } else {
                resolve({
                    status: "error",
                    data: "Status code was not 200",
                });
            }
        } catch (e) {
            resolve({
                status: "error",
                data: e,
            });
        }
    });
};

export const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + " s";
};
