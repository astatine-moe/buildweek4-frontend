const f = (url, opts) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opts);
            if (response.ok) {
                let data = await response.json();

                resolve(data);
            } else {
                reject(response);
            }
        } catch (e) {
            reject(e);
        }
    });
};
const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " m";
    }
    return Math.floor(seconds) + " s";
};

const getURL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return `http://127.0.0.1:3001`;
    } else {
        return `https://backend-w4-build-weeklinkedin-production.up.railway.app`;
    }
};

module.exports = {
    getURL,
    timeSince,
    get: (url) => {
        return new Promise((resolve, reject) => {
            f(url, {
                method: "GET",
            })
                .then(resolve)
                .catch(reject);
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            f(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            })
                .then(resolve)
                .catch(reject);
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            f(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data),
            })
                .then(resolve)
                .catch(reject);
        });
    },
    patch: (url, data) => {
        return new Promise((resolve, reject) => {
            f(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data),
            })
                .then(resolve)
                .catch(reject);
        });
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
            f(url, {
                method: "DELETE",
            })
                .then(resolve)
                .catch(reject);
        });
    },
};
