import { Component, OnInit } from '@angular/core';
import { GetDataServiceService } from '../services/get-data-service.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  constructor(private dataSer : GetDataServiceService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  selectedImage;

  onFileSelected(event): void {

    console.log(event);
    
    //const fileInput = event.target as HTMLInputElement;
    const file = event.target.files?.[0];

    if (file) {

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }


  }

  async onSubmit(v)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    console.log('====================================');
    console.log(this.selectedImage);
    console.log('====================================');
    let newPlayer = v;
    newPlayer["image"]=this.selectedImage;
    newPlayer["statistiques"]={"ballon_or": 5, "best_player": 3, "champion_europe": 1, "champion_league" :5}
    this.dataSer.addPlayer(newPlayer).subscribe({
      next: async (response) => {
        console.log('====================================');
        console.log(response)
        console.log(newPlayer)
        await loading.dismiss();
        this.router.navigate(["/home"], {queryParams: {url: "add", id: response["name"], nom: newPlayer.nom, position: newPlayer.position, image: newPlayer.image, statistiques: newPlayer.statistiques}})
      },
      error: async (err) => {
        console.log(err);
        await loading.dismiss();
      }
    })
  }

}
