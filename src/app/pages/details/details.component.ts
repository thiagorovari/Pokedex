import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../service/poke-api.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AttackDialogComponent } from '../../shared/attack-dialog/attack-dialog.component';

@Component({
  selector: 'app-details',
  standalone: false,
  
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;
  moveName: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.isLoading = true;
        if (res[0].moves.length > 0) {
          this.getMoveName(res[0].moves[0].move.url); // Chama a função para obter o nome do primeiro ataque
        }
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public getMoveName(url: string) {
    this.pokeApiService.apiGetMove(url).subscribe(
      res => {
        this.moveName = res.name;
        console.log('Move Name:', this.moveName); // Log para verificar o nome do ataque

      },
      error => {
        this.apiError = true;
      }
    );
  }
  public openDialog(): void {
    console.log('Opening Dialog with Move Name:', this.moveName);
    this.dialog.open(AttackDialogComponent, {
      data: {
        moveName: this.moveName
      }
    });
  }
  
}
