import { Component } from '@angular/core';
import { GetDataServiceService } from '../services/get-data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  players=[]
  constructor(private dataSer: GetDataServiceService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) {}

  ngOnInit() {
    
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if(data["url"] == "add")
      {
        this.players.push({ id: data["id"], nom: data["nom"], position: data["position"], image: data["image"], statistiques: data["statistiques"] })
      }
      else if(data['url'] == "update")
      {
        this.players.forEach(element => {
            if(element['id'] == data["id"])
            {
              element['nom'] = data['nom'];
              element['position'] = data['position']
              element['image'] = data['image']
              element['statistiques'] = data['statistiques']
            }
          
        });
      }
    })

    this.getAllPlayer();
  }

  getAllPlayer()
  {
    this.players=[]
    this.dataSer.getPlayer().subscribe({
      next: (response) => {
        console.log(response);
        for (const key in response) {
          this.players.push({ id: key, ...response[key] })
        }
        console.log(this.players);
        
      },
      error: (err) => {
        console.log(err);
      },
    })

  }

  async presentAlert(id)
  {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Etes vous sur de vouloir supprimer ce joueur ?',
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: () => {
            this.dataSer.deletePlayer(id).subscribe({
              next: (response) => {
                this.getAllPlayer();
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  updatePlayer(id, nom, position, image, statistiques)
  {
    this.router.navigate(["/updatePlayer"], {queryParams: {id: id, nom: nom, position: position, image: image, statistiques: statistiques}})
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
