const listItems = document.querySelectorAll('#codeBox li');
const totalItems = listItems.length;
for (let i = 0; i < totalItems; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', "https://s3-us-west-2.amazonaws.com/s.cdpn.io/27019/trashcanIcon.png")
    newImage.setAttribute('class', 'listIcon');
    listItems[i].append(newImage);
}

const codeBox = document.querySelector('#codeBox ul');
codeBox.addEventListener('click', changeProp, false);
function changeProp(e) {
    const clicked = e.target;
    const tParent = clicked.parentNode;
    if (tParent.tagName === 'LI') {
        tParent.style.display = 'none';
    }
    else {
        if (clicked.getAttribute('class') === 'selected') {
            clicked.removeAttribute('class');
            return;
        }
        clicked.setAttribute('class', 'selected');
    }
};
