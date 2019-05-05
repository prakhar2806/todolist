const initialState = {
    username: "admin",
    password: "password",
    email: "abc@gmail.com",
    list: []
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "LOGGEDIN_USER":
            return {
                ...state,
                email: action.value.email,
                password: action.value.password
                // concat to immutate the array for adding
                // history: state.history.concat({ id: Math.random(), age: state.age + action.value })
            }
            // newState.age += action.value;
        case "SAVE_NOTE":
            return {
                ...state,
                list: state.list.concat(action.value)
            }
        case "SET_ALL_NOTES":
            return {
                ...state,
                list: action.value.obj
            }
        default: break;
    }
    return newState;
}

export default reducer;