export class House {
 constructor(data = {}) {
   this.id = data.id
   this.bedrooms = data.bedrooms
   this.bathrooms = data.bathrooms
   this.levels = data.levels
   this.description = data.description
   this.price = data.price
   this.imgUrl = data.imgUrl
   this.creatorId = data.creatorId
 }
}
