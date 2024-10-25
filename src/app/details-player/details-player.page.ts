import { Component, OnInit } from '@angular/core';
import { GetDataServiceService } from '../services/get-data-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-player',
  templateUrl: './details-player.page.html',
  styleUrls: ['./details-player.page.scss'],
})
export class DetailsPlayerPage implements OnInit {
  selectedPlayer={};
  isDone=false;
  constructor(private dataSer: GetDataServiceService, private route: ActivatedRoute) { }

  statistiques = ['ballon_or', 'best_player', 'champion_europe', 'champion_league']
  ngOnInit() {

    this.dataSer.getPlayerById( this.route.snapshot.paramMap.get('id') ).subscribe({
      next: (response) =>
      {
        console.log(response);
        this.selectedPlayer = response
        this.isDone = true
      },
      error: (err) =>
      {
        console.log(err);
        
      }
    });
  }

  getStatNumber(p, name)
  {
    console.log('====================================');
    console.log( p );
    console.log('====================================');
    return p.statistiques[name];
  }


  getImage(name)
  {
    return "../../assets/"+name+".png";
  }

}
