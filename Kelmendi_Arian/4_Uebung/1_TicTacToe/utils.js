class locationUtil {
    static getSearchItem(item) {
        let searchParams = new URLSearchParams(location.search);
        return searchParams.get(item);
    }

    static hasSearchItem(item) {
        let searchParams = new URLSearchParams(location.search);
        return searchParams.has(item);
    }
}