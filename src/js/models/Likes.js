export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, img) {
        const like = {
            id,
            title,
            img
        };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.like.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLike() {
        return this.likes.length;
    }
};