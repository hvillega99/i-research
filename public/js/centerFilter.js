const showCenters= () => {
    const items = document.getElementsByClassName('centro');

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.style.display = '';
    }
}

const filterByType = (type) => {
    
        showCenters();

        let items = document.getElementsByClassName('centro');
        items = Object.values(items);

        if(type=='I'){
            items = items.filter(item => !item.classList.contains('Institucional'));
        }else{
            items = items.filter(item => item.classList.contains('Institucional'));
        }
    

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            item.style.display = 'none';
        }
}