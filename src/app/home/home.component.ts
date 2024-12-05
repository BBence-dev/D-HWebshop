import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*images = ['/assets/1.jpg', '/assets/2.jpg', '/assets/3.jpg'];
  links = ['/home','/about','/products']
  currentImage = 0;
  currentLink = 0;
  slideshowInterval: any;

  constructor() {//this.startSlideshow(); }*/

  ngOnInit(): void {}

    /*startSlideshow() {
      this.slideshowInterval = setInterval(() => {
        this.nextImage();
      }, 3000); // 3 másodperces időközönként vált képet
    }
    
    // A diavetítés megállítása
    stopSlideshow() {
      clearInterval(this.slideshowInterval);
    }
    
    // A következő kép megjelenítése
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
      this.currentLink = (this.currentLink + 1) % this.links.length;
    }
    
    // Az előző kép megjelenítése
    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
      this.currentLink = (this.currentLink - 1 + this.links.length) % this.links.length;
    }*/
}  
   
