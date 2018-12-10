import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { APIService } from '../../service/webAPI';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { SearchPage } from '../search/search';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  artworks =[];

  loading : any;

  constructor(public navCtrl: NavController, private api: APIService, public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController) {

  }

  ngOnInit() {
    //Loading anim to wait for data
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.api.getAPI(this.api.ARTWORK_DATA_ALL)
      .map(response =>{
        console.log(response);
        this.artworks = response.result;
        console.log(this.artworks);

        //yes, the loading anim dismisses when only one is finished. good enough.
        this.loading.dismiss();
      }).subscribe();
  }

  checkArtworks() {
    if(this.artworks.length > 0){
      return true;
    }
  }

  openSearch(){
    let modal = this.modalCtrl.create(
      SearchPage,
      {showBackdrop: false, enableBackdropDismiss:true}
    );
    
		modal.present();
  }

}
