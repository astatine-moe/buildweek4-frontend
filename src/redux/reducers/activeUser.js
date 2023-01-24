export default function activeUser(state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        default:
            return state;
    }
}
