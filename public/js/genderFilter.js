const showAll = () => {
    const items = document.getElementsByClassName("i-item");
    let n = 1;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.style.display = '';
        item.children[0].textContent = n;
        n++;
    }

}

const filterByGender = (gender) => {

    showAll();

    const items = document.getElementsByClassName('i-item');
    let n = 1;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if(!item.classList.contains(gender)){
            item.style.display = 'none';
        }else{
            item.children[0].textContent = n;
            n++;
        }
    }
}
