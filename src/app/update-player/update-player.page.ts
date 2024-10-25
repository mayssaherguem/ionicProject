import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataServiceService } from '../services/get-data-service.service';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.page.html',
  styleUrls: ['./update-player.page.scss'],
})
export class UpdatePlayerPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private dataSer: GetDataServiceService) { }

  nom;
  position ;
  image;
  id;
  stat = {"ballon_or": 5, "best_player": 3, "champion_europe": 1, "champion_league" :5}

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log(data);
      this.id = data["id"];
      this.nom = data["nom"];
      this.position = data["position"];
      this.image = data["image"];
      this.stat = this.stat
    })
  }

  onUpdate(v)
  {
    console.log(v);
    this.dataSer.updatePlayer(this.id, this.nom, this.position, this.selectedImage, this.stat).subscribe({
      next: (response) => {
        console.log(response);
        console.log(this.stat);
        
        this.router.navigate(["/home"], {queryParams: { url: "update", id: this.id, nom: response["nom"], position: response["position"], image: response["image"], statistiques: this.stat}})
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  selectedImage;
  onFileSelected(event): void {

    console.log(event);
    
    //const fileInput = event.target as HTMLInputElement;
    const file = event.target.files?.[0];
    console.log('==============filllllleeeee======================');
    console.log(file);
    console.log('====================================');
    if (file) {

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
        console.log("this.selectedImage");
        console.log(this.selectedImage);
        
      };
      reader.readAsDataURL(file);
    }


  }
}
