import { Injectable } from '@angular/core';
import { product } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  productos:product[]=[
    {
      id:1,
      category:'Electronic',
      image:'https://www.stf.tech/cdn/shop/products/mouse-gamer-stf-beast-abysmal-arsenal-force-optico-gaming-para-computadora-stg-m16857-833817.jpg?v=1687897501',
      name:'Mouse gamer',
      price:500,
      state:true
    },
    {
      id:2,
      category:'Electronic',
      image:'https://m.media-amazon.com/images/I/81rs2YCE4IL.jpg',
      name:'Laptop gamer',
      price:15000,
      state:true
    },
    {
      id:3,
      category:'Electronic',
      image:'https://m.media-amazon.com/images/I/619Pj0WJwxL.jpg',
      name:'Teclado gamer',
      price:1500,
      state:false
    },
    {
      id:4,
      category:'Electronic',
      image:'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/8d007d35-9614-42fc-bda4-598bd44d8247.b0cee0793e0e7da6e126d29657cb84f2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      name:'Iphone 15 Pro Max',
      price:15000,
      state:true
    },
    {
      id:5,
      category:'Electronic',
      image:'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111851_sp880-airpods-Pro-2nd-gen.png',
      name:'AirPods Pro',
      price:4500,
      state:true
    },
    {
      id:6,
      category:'Electronic',
      image:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3D3ref_VW_34FR+watch-case-44-aluminum-midnight-cell-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ajJYOEQxYjNlejNwbWNnSU16d0NYaWhSbVIzRFJTYlp1MEk4OWNDaTcvNTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIelBRWnNWZWtLcTZCYVRER3FsWWowaTk5RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24zZmdHMUt6VFlqa3BpV2VBOUNycGdrcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCZkNDUmN0SlpnYXpQNFNTbUVsbTlnST0=',
      name:'Apple Watch',
      price:6000,
      state:false
    },
    {
      id:7,
      category:'Electronic',
      image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1617761672000',
      name:'AirTag',
      price:600,
      state:true
    },
    {
      id:8,
      category:'Electronic',
      image:'https://www.soriana.com/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw3d6675eb/images/product/0194253241676_A.jpg?sw=445&sh=445&sm=fit',
      name:'Ipad Pro',
      price:10000,
      state:false
    },
    {
      id:9,
      category:'Electronic',
      image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011_FV1_FMT_WHH?wid=940&hei=800&fmt=jpeg&qlt=90&.v=1604776024000',
      name:'AirPods Max',
      price:10000,
      state:true
    },
    {
      id:10,
      category:'Electronic',
      image:'https://resources.sears.com.mx/medios-plazavip/mkt/624e0f6a7a917_2webpjpg.jpg?scale=500&qlty=75',
      name:'Alexa Echo Dot',
      price:1500,
      state:true
    },
    {
      id:11,
      category:'Electronic',
      image:'https://resources.sears.com.mx/medios-plazavip/mkt/624e0f6a7a917_2webpjpg.jpg?scale=500&qlty=75',
      name:'Alexa Echo Dot',
      price:1500,
      state:true
    },
    {
      id:12,
      category:'Electronic',
      image:'https://resources.sears.com.mx/medios-plazavip/mkt/624e0f6a7a917_2webpjpg.jpg?scale=500&qlty=75',
      name:'Alexa Echo Dot',
      price:1500,
      state:true
    }
  ];

    getProductos(){
      return this.productos;
    }
}
