
// Storing data
const storeData = (key, value) => {
    try {

        localStorage.setItem(key, value);
    } catch (error) {
        // Handle the error
    }
};

// Retrieving data
const retrieveData = (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        return null;
    } catch (error) {
        return null;
    }
};

// Removing data
const removeData = (key) => {
    try {
        localStorage.clear();
    } catch (error) {
        //err
    }
};

export { storeData, retrieveData, removeData };