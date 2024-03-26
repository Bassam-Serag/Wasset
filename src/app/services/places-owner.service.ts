import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesOwnerService {
  private readonly DB_URL = "http://localhost:3000/placesOwner";

  constructor(private readonly myClient:HttpClient) { }
  getAllPlaces(){
    return this.myClient.get(this.DB_URL);
  }
  getPlacesByID(id:any){
    return this.myClient.get(this.DB_URL+"/"+id);
  }
  AddNewPlaces(Places:any){
    return this.myClient.post(this.DB_URL,Places);
  }
  updatePlaces(id:any,Places:any){
    return this.myClient.put(this.DB_URL+"/"+id,Places);
  }
  deletePlaces(id:any){
    return this.myClient.delete(this.DB_URL+"/"+id);
  }
}
