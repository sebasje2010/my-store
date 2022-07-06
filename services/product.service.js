const faker = require ('faker')
const boom=require('@hapi/boom')

class ProductsService{
  constructor(){
    this.products=[]
    this.generate()
  }

  generate(){
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const {name,price,image}=data
    const newProduct={
      id: faker.datatype.uuid(),
      name,
      price,
      image
    }
    this.products.push(newProduct)
    return newProduct
  }

  find(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(this.products)
      }, 2000);
    })
  }

  async findOne(id){
    const product = this.products.find(item=>item.id===id)
    if(!product){
      throw boom.notFound('Product not found')
    }
    if(product.isBlocked){
      throw boom.conflict('Product is Blocked')
    }
    return product
  }

  async update(id, changes){
    const index=this.products.findIndex(item=>item.id===id)
    if (index===-1){
      throw boom.notFound('Product not found')
    }
    const product=this.products[index]
    this.products[index]={
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index=this.products.findIndex(item=>item.id===id)
    if (index===-1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1)
    return {id}
  }
}

module.exports= ProductsService
