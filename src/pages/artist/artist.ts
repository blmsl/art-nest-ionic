import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { ModalOrderPage } from '../modal-order/modal-order';
import { APIService } from '../../service/webAPI';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';
import { ArtworkPage } from '../artwork/artwork';
import { ArtworkDetailPage } from '../artwork-detail/artwork-detail';

/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage implements OnInit {

  artist = [];
  artist_id:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private modalCtrl: ModalController, private api: APIService, public loadingCtrl: LoadingController,
    public storage: Storage) {
  }

  ngOnInit() {

    //Loading anim to wait for data
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.artist_id = this.api.loggedInUser;
    //Get single data from artist
    this.api.getAPI(this.api.ARTIST_DATA_SINGLE + this.artist_id)
      .map(response =>{
        this.artist = response.result;
        //console.log(this.artist);
        //Data is now loaded; dismiss load anim
        this.loading.dismiss();
      }).subscribe();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistPage');
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  createCommission() {
    this.navCtrl.push(ModalOrderPage);
  }

  addArtwork(){
    this.navCtrl.push(ArtworkPage);
  }

  openSearch(){
    let modal = this.modalCtrl.create(
      SearchPage,
      {showBackdrop: false, enableBackdropDismiss:true}
    );
    
    modal.present();
  }

  detailArtwork(ID:any){
    console.log(ID);
    this.navCtrl.push(ArtworkDetailPage, {IDArtwork : ID});
  }

}
