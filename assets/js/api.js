export function formToObject(formSelector){
    const form = document.querySelector(formSelector)
    const obj = {};

    const inputs = form.querySelectorAll('input')
    for (const input of inputs) {
        if ( input.getAttribute('name')!= null) {
            const name = input.getAttribute('name');
            const value = input.value;
            obj[name] = value
        }
    }
    const selects = form.querySelectorAll('select')
    for (const select of selects){
        const name = select.getAttribute('name');
        const value = select.value;
        console.log("name: " +name+", value: "+value)

        obj[name] = value
    }

    const textareas = form.querySelectorAll('textarea')
    for (const textarea of textareas){
        const name = textarea.getAttribute('name');
        const value = textarea.value;

        obj[name] = value

    }

    return obj;
}


export function get(path, params = {}){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    const paramUrl = new URLSearchParams(params)
    return fetch(`${path}?${paramUrl}`,{
        method: 'GET',
        header: myHeaders,
    }).then(response => response.json())
}

export function post(path, body) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fetch(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: myHeaders,
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export function put(path,body){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    return fetch(path,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers: myHeaders,
    }).then(response => response.json())
}

export function deleteMapping(path){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    return fetch(path,{
        method: 'DELETE',
        headers: myHeaders,
    })
}


const _$=$
export function showPagination({
                    totalItems,
                    limit,
                    currentPage,
                    onPageClick,
                    }){
    $('#pagi').pagination({
            items: totalItems,
            itemsOnPage: limit,
            currentPage: currentPage,
            onPageClick: onPageClick,
            prevText: "&laquo;",
            nextText: "&raquo;"
    })
}
export function formatDateTime(date) {
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
