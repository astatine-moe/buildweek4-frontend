const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5OGQ4MTU0ZjRhYTAwMTUxOTMwMjgiLCJpYXQiOjE2NzEwMDc2MTcsImV4cCI6MTY3MjIxNzIxN30.cSe4CwoajKqBlSxhZ9jxQtYaay9FYkPy74H9lnKOxXI`;
export const opts = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const uri = "https://striveschool-api.herokuapp.com/api/profile/";
