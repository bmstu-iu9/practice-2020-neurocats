let store = {
    _state: {
        user: {
            name: 'Rachel',
            email: 'rachel@mail.ru',
            password: 'hello',
            photoUrl: "https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg",
        },
    },
    getState() {
        return this._state;
    },
    dispatch(action: any) { 
        if (action.type === 'UPDATE_NAME'){
            this._state.user.name = action.username;
        }
        if (action.type === 'UPDATE_EMAIL'){
            this._state.user.email = action.email;
        }
        if (action.type === 'UPDATE_PASSWORD'){
            this._state.user.password = action.password;
        }
    }
}

export default store;