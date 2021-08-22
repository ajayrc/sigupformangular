import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId!: string;

  constructor( private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

}
