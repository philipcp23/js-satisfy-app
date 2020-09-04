export const _like = like => {
    const markup = `
        <li>
        <a class="likes__link" href="${like.id}">
            <figure class="likes__fig">
                <img src="img/test-1.jpg" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">Pasta with Tomato ...</h4>
                <p class="likes__author">The Pioneer Woman</p>
            </div>
        </a>
    </li>
    `;

    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if(item) item.parentElement.removeChild(item);
};







