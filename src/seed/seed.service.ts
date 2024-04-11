import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonModule } from '../pokemon/pokemon.module';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}

  
  
  async executeSeed(){

    await this.pokemonModel.deleteMany({}) // Esto borra todos los pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    //const insertPromiseArray = []
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({name,url})=>{

      const segments = url.split('/');
      const no = +segments[segments.length-2];

      //const pokemon = await this.pokemonModel.create({name,no})
      //Otra con array
      //insertPromiseArray.push(
        //this.pokemonModel.create({name,no})      
      //)
      pokemonToInsert.push({name,no})
    });

    //await Promise.all(insertPromiseArray);

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Executed';
  }
}
