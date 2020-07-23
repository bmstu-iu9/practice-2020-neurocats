let store = {
    _state: {
        user: {
            name: 'Rachel',
            email: 'rachel@mail.ru',
            password: 'hello',
            photoUrl: "https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg"
        }
    },
    getState() {
        return this._state;
    },
    dispatch(action: any) { 
        if (action.type === 'UPDATE_NAME'){
            this._state.user.name = action.username;
        }
    }
}

export default store;