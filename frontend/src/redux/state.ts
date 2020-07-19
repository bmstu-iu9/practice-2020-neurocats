let store = {
    _state: {
        user: {
            name: 'Rachel',
            photoUrl: "https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg"
        }
    },
    getState() {
        return this._state;
    }
}

export default store;