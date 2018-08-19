export default class HttpFetch {

    get(url) {
        return this.customFetch(url, null, 'GET').then(response => response.json())
    }

    post(url, data) {
        return this.customFetch(url, data, 'POST').then(response => response.json())
    }

    put(url, data) {
        return this.customFetch(url, data, 'PUT').then(response => response.json())
    }

    delete(url) {
        return this.customFetch(url, null, 'DELETE').then(response => response.json())
    }

    customFetch(url, data, verb) {
        let myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json')
        let myInit = {method: verb, headers: myHeaders, mode: 'cors', cache: 'default'}
        if (data) {
            myInit.body = JSON.stringify(data)
        }
        const myRequest = new Request(url, myInit)
        return fetch(myRequest)
                .then(response => {
                    if (!response.ok)
                        throw Error(response.statusText)
                    return response
                })
    }
}