const currentPage = location.pathname
const items = document.querySelectorAll('.links div a')

for (item of items) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

function createPagination(pagination) {

    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(total, page)
    const filter = pagination.dataset.filter

    let elements = ""

    for (let page of pages) {

        if (String(page).includes("...")) {

            elements += `<span>${page}</span>`

        } else {

            if (filter) {

                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`


            } else {

                elements += `<a href="?page=${page}">${page}</a>`
            }

        }
    }

    pagination.innerHTML = elements
}

function paginate(totalPages, selectedPage) {
    let page = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pageAfterSelectedPage = currentPage <= selectedPage + 2
        const pageBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                page.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                page.push(oldPage + 1)
            }
            page.push(currentPage)
            oldPage = currentPage

        }
    }
    return page
}

const pagination = document.querySelector('.pagination')

if(pagination) createPagination(pagination)