export default class Likes {
  constructor() {
    this.readDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = {
      id,
      title,
      author,
      img,
    };
    this.likes.push(like);
    // storage ruu hadgalna
    this.saveDataToLocation();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);

    this.likes.splice(index, 1);

    this.saveDataToLocation();
  }

  isLiked(id) {
    // if (this.likes.findIndex((el) => el.id === id)) return false;
    // else return true;

    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumOfLikes() {
    return this.likes.length;
  }

  saveDataToLocation() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
