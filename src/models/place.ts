import { Location } from "./location";

export class Place{
    constructor(public title: string,public description:string,public location:Location,public imageUrl:string,public isApproved:boolean,public country:number,public uid:string,public image?:any){

    }
}