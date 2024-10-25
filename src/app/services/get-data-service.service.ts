import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataServiceService {

  constructor(private http: HttpClient) { }

  getAdmin() 
  {
    return this.http.get("https://ionicproject-5f3d6-default-rtdb.firebaseio.com/admin.json")
  }

  getPlayer() 
  {
    return this.http.get("https://ionicproject-5f3d6-default-rtdb.firebaseio.com/joueurs.json")
  }

  getPlayerById(id)
  {
    return this.http.get(`https://ionicproject-5f3d6-default-rtdb.firebaseio.com/joueurs/${id}.json`)
    
  }

  addPlayer(newPlayer) {

    console.log('====================================');
    console.log(newPlayer);
    console.log('====================================');

    return this.http.post(
      'https://ionicproject-5f3d6-default-rtdb.firebaseio.com/joueurs.json',
      newPlayer
    );
  }

  deletePlayer(id)
  {
    return this.http.delete(`https://ionicproject-5f3d6-default-rtdb.firebaseio.com/joueurs/${id}.json`);
  }


  updatePlayer(id, newName, newPosition, newImage, newstat)
  {
    return this.http.put(`https://ionicproject-5f3d6-default-rtdb.firebaseio.com/joueurs/${id}.json`, 
      {nom: newName, position: newPosition, image: newImage, statistiques: newstat});
  }

}
