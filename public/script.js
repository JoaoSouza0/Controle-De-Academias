const currentPage = location.pathname
const items = document.querySelectorAll('.links div a')
    
for (item of items) {
    if (currentPage.includes(item.getAttribute('href'))) {
            item.classList.add('active')
    }
}

