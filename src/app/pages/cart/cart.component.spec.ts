import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

const listCartBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7,
    }
];

describe('Cart component',()=>{

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent> // Para extrar cosas del componente, un servicio por ejemplo

    // Eventos que se ejecutan antes de los test a ejecutar
    beforeEach(()=>{
        // Configuramos los tests
        TestBed.configureTestingModule({
            // Para cuando se invocan servicios http, en el componente o en los servicios que lo invocan, para no hacer peticiones reales se usa el HttpClientTestingModule
            imports:[
                HttpClientTestingModule
            ],
            // Componentes que usamos en nuetros tests
            declarations:[
                CartComponent
            ],
            // Servicios que utiliza el componente
            providers:[
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(()=>{
        // Instanciamos el componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Hace lo que el ngOnInit
    })

    it('should create',()=>{
        expect(component).toBeTruthy();
        //expect(component).not.toBeTruthy();
    })

    it('getTotalPrice returns an amount',()=>{
        // Simulando la llamada al mètodo
        const totalPrice = component.getTotalPrice(listCartBook);
        // que sea positivo
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();

    });

    /**
     * public getTotalPrice(listCartBook: Book[]): number {
    let totalPrice = 0;
    listCartBook.forEach((book: Book) => {
      totalPrice += book.amount * book.price;
    });
    return totalPrice;
  }
     */

})