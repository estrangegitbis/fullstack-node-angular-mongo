export class Thing {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  userId: string;
  constructor(
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    price: number,
    userId: string
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.userId = userId;
  }
}
